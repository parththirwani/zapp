import fs from "fs";
import path from "path";

// Simple logging function with timestamp and log level
const log = (level: string, message: string, metadata?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`, metadata ? metadata : "");
};

export const getAllFiles = (folderPath: string): string[] => {
  log("INFO", `Reading files from folder: ${folderPath}`);
  let response: string[] = [];

  try {
    const allFilesAndFolders = fs.readdirSync(folderPath);
    log("INFO", `Found ${allFilesAndFolders.length} items in folder: ${folderPath}`, {
      items: allFilesAndFolders,
    });

    allFilesAndFolders.forEach((file) => {
      const fullFilePath = path.join(folderPath, file);
      try {
        if (fs.statSync(fullFilePath).isDirectory()) {
          log("INFO", `Recursively reading directory: ${fullFilePath}`);
          response = response.concat(getAllFiles(fullFilePath));
        } else {
          const normalizedPath = fullFilePath.replace(/\\/g, "/");
          log("INFO", `Found file: ${normalizedPath}`);
          response.push(normalizedPath);
        }
      } catch (err) {
        const error = err as Error;
        log("ERROR", `Failed to process item: ${fullFilePath}`, { error: error.message });
        throw error; // Rethrow to propagate error
      }
    });

    log("INFO", `Completed reading folder: ${folderPath}`, { fileCount: response.length });
    return response;
  } catch (err) {
    const error = err as Error;
    log("ERROR", `Failed to read folder: ${folderPath}`, { error: error.message });
    throw error;
  }
};