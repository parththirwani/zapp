import AWS from "aws-sdk";
import fs from "fs";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Simple logging function with timestamp and log level
const log = (level: string, message: string, metadata?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`, metadata ? metadata : "");
};

export const uploadFile = async (fileName: string, localFilePath: string) => {
  log("INFO", `Starting upload of file: ${fileName}`, { localPath: localFilePath });
  try {
    const fileContent = fs.readFileSync(localFilePath);
    log("INFO", `Read file content from: ${localFilePath}`, { fileSize: fileContent.length });

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