import { createClient } from "redis";
import { downloadS3Folder } from "./aws";
import { buildProject } from "./build";

const subscriber = createClient();
subscriber.on("error", (err) => console.error("Redis Client Error", err));

async function main() {
    await subscriber.connect();
    console.log("Connected to Redis, waiting for build jobs...");
    
    while (true) {
        try {
            const response = await subscriber.brPop("build-queue", 0);
            if (!response) {
                console.log("Null response from queue");
                continue;
            }
            
            const id = response.element;
            console.log(`\n=== Processing build job: ${id} ===`);
            
            // Download files from S3
            console.log("Step 1: Downloading files from S3...");
            await downloadS3Folder(`output/${id}`);
            
            // Build Docker image
            console.log("Step 2: Building project...");
            await buildProject(id);
            
            console.log(`Build job completed successfully: ${id}\n`);
            
        } catch (err) {
            console.error("Error processing build job:", err);
            
            // Wait before retrying to avoid rapid failure loops
            console.log("Waiting 5 seconds before processing next job...");
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
}

main().catch((error) => {
    console.error("Fatal error in main:", error);
    process.exit(1);
});