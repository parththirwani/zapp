import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple logging function with timestamp and log level
const log = (level: string, message: string, metadata?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`, metadata ? metadata : "");
};

export function buildProject(id: string) {
  log("INFO", `Starting build process for project ID: ${id}`);
  return new Promise((resolve, reject) => {
    const projectPath = path.join(__dirname, `output/${id}`);
    const command = `cd ${projectPath} && npm install && npm run build`;
    log("INFO", `Executing command: ${command}`, { projectPath });

    try {
      const child = exec(command);

      child.stdout?.on("data", function (data: string) {
        log("INFO", `Build stdout: ${data.trim()}`);
      });

      child.stderr?.on("data", function (data: string) {
        log("ERROR", `Build stderr: ${data.trim()}`);
      });

      child.on("error", (error: Error) => {
        log("ERROR", `Build process failed for project ID: ${id}`, { error: error.message });
        reject(error);
      });

      child.on("close", function (code: number) {
        if (code === 0) {
          log("INFO", `Build process completed successfully for project ID: ${id}`, { exitCode: code });
          resolve("");
        } else {
          const error = new Error(`Build process failed with exit code: ${code}`);
          log("ERROR", `Build process failed for project ID: ${id}`, { exitCode: code });
          reject(error);
        }
      });
    } catch (err) {
      const error = err as Error;
      log("ERROR", `Failed to start build process for project ID: ${id}`, { error: error.message });
      reject(error);
    }
  });
}