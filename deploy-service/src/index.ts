import { createClient } from "redis";
import { downloadS3Folder } from "./utils/aws";

const subscriber = createClient();

subscriber.on("error", (err) => console.error("Redis Client Error", err));

async function main() {
    await subscriber.connect();

    while (true) {
        try {
            const response = await subscriber.brPop("build-queue", 0);
            if(response==null){
                console.log("null response")
                return
            }
            console.log("Received from queue:", response);
            const id= response.element

            await downloadS3Folder(`output/${id}`)
        } catch (err) {
            console.error("Error popping from queue:", err);
            await new Promise((res) => setTimeout(res, 1000));
        }
    }
}

main();
