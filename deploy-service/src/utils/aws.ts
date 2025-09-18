import { S3 } from "aws-sdk";
import path, { dirname } from "path"
import fs from "fs"

    const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    })

export async function downloadS3Folder(prefix: string) {
    console.log(prefix)

    const allFiles = await s3.listObjectsV2({
        Bucket : "zapp-code-store",
        Prefix : prefix
    }).promise();

    const allPromises = allFiles.Contents?.map(async({Key})=>{
        return new Promise (async (resolve)=>{
            if (!Key){
                resolve ("")
                return;
            }

            const finalOutputPath = path.join(__dirname, Key)
            const outputFile = fs.createWriteStream(finalOutputPath)
            const dirName = path.dirname(finalOutputPath)

            if(!fs.existsSync(dirName)){
                fs.mkdirSync(dirName, {recursive: true})
            }
            s3.getObject({
                Bucket: "zapp-code-store",
                Key
            }).createReadStream().pipe(outputFile)
            .on("end",()=>{
                resolve("")
            })

        }) 
    }) || []
    await Promise.all(allPromises?.filter(x => x! === undefined))
}