import { githubRepoPermissive } from './types/index';
import express from "express"
import cors from "cors";
import { generate } from './utils/idGenerator';
import simpleGit from 'simple-git';
import path from "path"
import { getAllFiles } from './utils/files';
import { uploadFile } from './utils/aws';
import { createClient } from 'redis';

const publisher = createClient();
publisher.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
    const parsed = githubRepoPermissive.safeParse(req.body.repoUrl);
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid repo URL" });
    }

    const repoUrl = parsed.data;
    const id = generate();

    await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`));

    const files = getAllFiles(path.join(__dirname,`output/${id}`))
    files.forEach(async file =>{
        await uploadFile(file.slice(__dirname.length+1), file)
    })

    publisher.lPush ("build-queue",id)

    res.json({ id, message: "repoUrl received" });

})


app.listen(3000)