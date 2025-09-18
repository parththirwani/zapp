import { S3 } from "aws-sdk"
import fs from "fs"

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export const uploadFile = async (filename: string, localFilepath: string) =>{
    console.log("Upload file called")
    const fileContent = fs.readFileSync(localFilepath)
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "zapp-code-store",
        Key: filename
    }).promise();
    console.log(response)
}