import express, { type Request, type Response } from "express";
import cors from "cors";
import { simpleGit } from "simple-git";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "redis";
import { generate } from "./idGenerator";
import { getAllFiles } from "./files";
import { uploadFile } from "./aws";

// Simple logging function with timestamp and log level
const log = (level: string, message: string, metadata?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`, metadata ? metadata : "");
};

const publisher = createClient();
const subscriber = createClient();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeRedisClients() {
  log("INFO", "Initializing Redis clients");
  try {
    await publisher.connect();
    log("INFO", "Publisher connected to Redis");
    await subscriber.connect();
    log("INFO", "Subscriber connected to Redis");
  } catch (err) {
    const error = err as Error;
    log("ERROR", "Failed to connect to Redis", { error: error.message });
    throw error;
  }
}

app.post("/deploy", async (req: Request, res: Response) => {
  const repoUrl = req.body.repoUrl as string | undefined;
  if (!repoUrl) {
    log("ERROR", "Missing repoUrl in deploy request");
    return res.status(400).json({ error: "repoUrl is required" });
  }

  log("INFO", `Received deploy request`, { repoUrl });
  const id = generate();
  log("INFO", `Generated ID for deploy: ${id}`);

  try {
    const outputPath = path.join(__dirname, `output/${id}`);
    log("INFO", `Cloning repository to: ${outputPath}`);
    await simpleGit().clone(repoUrl, outputPath);
    log("INFO", `Successfully cloned repository for ID: ${id}`);

    const files = getAllFiles(outputPath);
    log("INFO", `Found ${files.length} files to upload`, { id, fileCount: files.length });

    try {
      await Promise.all(
        files.map(async (file) => {
          const relativePath = file.slice(__dirname.length + 1);
          log("INFO", `Uploading file: ${relativePath}`);
          await uploadFile(relativePath, file);
          log("INFO", `Uploaded file: ${relativePath}`);
        })
      );
      log("INFO", `Completed uploading files for ID: ${id}`);
    } catch (err) {
      const error = err as Error;
      log("ERROR", `Failed to upload files for ID: ${id}`, { error: error.message });
      throw error;
    }

    try {
      await publisher.lPush("build-queue", id);
      log("INFO", `Pushed ID to build-queue: ${id}`);
      await publisher.hSet("status", id, "uploaded");
      log("INFO", `Set status to 'uploaded' for ID: ${id}`);
    } catch (err) {
      const error = err as Error;
      log("ERROR", `Failed to update Redis for ID: ${id}`, { error: error.message });
      throw error;
    }

    res.json({ id });
    log("INFO", `Deploy request completed successfully for ID: ${id}`);
  } catch (err) {
    const error = err as Error;
    log("ERROR", `Deploy failed for ID: ${id}`, { error: error.message });
    res.status(500).json({ error: "Deploy failed", details: error.message });
  }
});

app.get("/status", async (req: Request, res: Response) => {
  const id = req.query.id as string | undefined;
  if (!id) {
    log("ERROR", "Missing id in status request");
    return res.status(400).json({ error: "id is required" });
  }

  log("INFO", `Fetching status for ID: ${id}`);
  try {
    const status = await subscriber.hGet("status", id);
    if (status === null) {
      log("WARN", `No status found for ID: ${id}`);
      return res.status(404).json({ error: "Status not found" });
    }
    log("INFO", `Retrieved status for ID: ${id}`, { status });
    res.json({ status });
  } catch (err) {
    const error = err as Error;
    log("ERROR", `Failed to fetch status for ID: ${id}`, { error: error.message });
    res.status(500).json({ error: "Failed to fetch status", details: error.message });
  }
});

async function startServer() {
  log("INFO", "Starting Express server");
  try {
    await initializeRedisClients();
    app.listen(3001, () => {
      log("INFO", "Server started on port 3000");
    });
  } catch (err) {
    const error = err as Error;
    log("ERROR", "Failed to start server", { error: error.message });
    process.exit(1);
  }
}

startServer();