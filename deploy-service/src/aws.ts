import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Simple logging function with timestamp and log level
const log = (level: string, message: string, metadata?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`, metadata ? metadata : "");
};

export async function downloadS3Folder(prefix: string) {
  log("INFO", `Starting download of S3 folder with prefix: ${prefix}`);
  try {
    const allFiles = await s3
      .listObjectsV2({
        Bucket: "zapp-code-store",
        Prefix: prefix,
      })
      .promise();

    if (!allFiles.Contents || allFiles.Contents.length === 0) {
      log("WARN", `No files found for prefix: ${prefix}`);
      return;
    }

    log("INFO", `Found ${allFiles.Contents.length} files to download`);

    const allPromises = allFiles.Contents.map(async ({ Key }) => {
      return new Promise((resolve, reject) => {
        if (!Key) {
          log("WARN", "Encountered undefined key, skipping");
          resolve("");
          return;
        }

        const finalOutputPath = path.join(__dirname, Key);
        const dirName = path.dirname(finalOutputPath);

        log("INFO", `Processing file: ${Key}`, { outputPath: finalOutputPath });

        try {
          if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, { recursive: true });
            log("INFO", `Created directory: ${dirName}`);
          }

          const outputFile = fs.createWriteStream(finalOutputPath);
          s3.getObject({
            Bucket: "zapp-code-store",
            Key,
          })
            .createReadStream()
            .on("error", (err: Error) => {
              log("ERROR", `Failed to download file: ${Key}`, { error: err.message });
              reject(err);
            })
            .pipe(outputFile)
            .on("finish", () => {
              log("INFO", `Successfully downloaded file: ${Key}`);
              resolve("");
            })
            .on("error", (err: Error) => {
              log("ERROR", `Failed to write file: ${finalOutputPath}`, { error: err.message });
              reject(err);
            });
        } catch (err) {
          const error = err as Error;
          log("ERROR", `Error processing file: ${Key}`, { error: error.message });
          reject(error);
        }
      });
    });

    log("INFO", "Awaiting completion of all downloads");
    await Promise.all(allPromises.filter((x) => x !== undefined));
    log("INFO", `Completed downloading folder with prefix: ${prefix}`);
  } catch (err) {
    const error = err as AWS.AWSError;
    log("ERROR", `Failed to download S3 folder with prefix: ${prefix}`, { error: error.message });
    throw error;
  }
}

export function copyFinalDist(id: string) {
  log("INFO", `Starting copy of distribution files for ID: ${id}`);
  const folderPath = path.join(__dirname, `output/${id}/dist`);

  try {
    if (!fs.existsSync(folderPath)) {
      log("ERROR", `Distribution folder does not exist: ${folderPath}`);
      throw new Error(`Folder ${folderPath} not found`);
    }

    const allFiles = getAllFiles(folderPath);
    log("INFO", `Found ${allFiles.length} files in distribution folder`);

    allFiles.forEach((file) => {
      const relativePath = file.slice(folderPath.length + 1);
      const uploadPath = `dist/${id}/${relativePath}`;
      log("INFO", `Initiating upload for file: ${relativePath}`, { uploadPath });
      uploadFile(uploadPath, file);
    });

    log("INFO", `Completed initiating uploads for ID: ${id}`);
  } catch (err) {
    const error = err as Error;
    log("ERROR", `Failed to copy distribution files for ID: ${id}`, { error: error.message });
    throw error;
  }
}

const getAllFiles = (folderPath: string): string[] => {
  log("INFO", `Reading files from folder: ${folderPath}`);
  let response: string[] = [];

  try {
    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach((file) => {
      const fullFilePath = path.join(folderPath, file);
      if (fs.statSync(fullFilePath).isDirectory()) {
        log("INFO", `Recursively reading directory: ${fullFilePath}`);
        response = response.concat(getAllFiles(fullFilePath));
      } else {
        const normalizedPath = fullFilePath.replace(/\\/g, "/");
        log("INFO", `Found file: ${normalizedPath}`);
        response.push(normalizedPath);
      }
    });
    return response;
  } catch (err) {
    const error = err as Error;
    log("ERROR", `Failed to read folder: ${folderPath}`, { error: error.message });
    throw error;
  }
};

const uploadFile = async (fileName: string, localFilePath: string) => {
  log("INFO", `Starting upload of file: ${fileName}`, { localPath: localFilePath });
  try {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3
      .upload({
        Body: fileContent,
        Bucket: "zapp-code-store",
        Key: fileName,
      })
      .promise();
    log("INFO", `Successfully uploaded file: ${fileName}`, { s3Response: response.Location });
    return response;
  } catch (err) {
    const error = err as AWS.AWSError;
    log("ERROR", `Failed to upload file: ${fileName}`, { error: error.message });
    throw error;
  }
};