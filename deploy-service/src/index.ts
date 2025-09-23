import { createClient } from "redis";
import { copyFinalDist, downloadS3Folder } from "./aws";
import { buildProject } from "./build";

// Simple logging function with timestamp and log level
const log = (level: string, message: string, metadata?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`, metadata ? metadata : "");
};

const subscriber = createClient();
const publisher = createClient();

async function initializeClients() {
  log("INFO", "Initializing Redis clients");
  try {
    await subscriber.connect();
    log("INFO", "Subscriber connected to Redis");
    await publisher.connect();
    log("INFO", "Publisher connected to Redis");
  } catch (err) {
    const error = err as Error;
    log("ERROR", "Failed to connect to Redis", { error: error.message });
    throw error;
  }
}

async function main() {
  log("INFO", "Starting queue processor");
  try {
    await initializeClients();
    while (true) {
      log("INFO", "Waiting for message in build-queue");
      try {
        const response = await subscriber.brPop("build-queue", 0);
        if (!response || !response.element) {
          log("WARN", "Received empty or invalid response from build-queue");
          continue;
        }

        const id = response.element;
        log("INFO", `Processing build for ID: ${id}`);

        try {
          log("INFO", `Downloading S3 folder for ID: ${id}`);
          await downloadS3Folder(`output/${id}`);
          log("INFO", `Completed downloading S3 folder for ID: ${id}`);

          log("INFO", `Building project for ID: ${id}`);
          await buildProject(id);
          log("INFO", `Completed building project for ID: ${id}`);

          log("INFO", `Copying distribution files for ID: ${id}`);
          await copyFinalDist(id);
          log("INFO", `Completed copying distribution files for ID: ${id}`);

          await publisher.hSet("status", id, "deployed");
          log("INFO", `Updated status to 'deployed' for ID: ${id}`);
        } catch (err) {
          const error = err as Error;
          log("ERROR", `Failed to process build for ID: ${id}`, { error: error.message });
          await publisher.hSet("status", id, "failed");
          log("INFO", `Updated status to 'failed' for ID: ${id}`);
        }
      } catch (err) {
        const error = err as Error;
        log("ERROR", "Error popping from build-queue", { error: error.message });
      }
    }
  } catch (err) {
    const error = err as Error;
    log("ERROR", "Queue processor failed", { error: error.message });
    throw error;
  }
}

main().catch((err: Error) => {
  log("ERROR", "Fatal error in queue processor", { error: err.message });
  process.exit(1);
});