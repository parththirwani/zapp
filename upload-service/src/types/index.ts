import { z } from "zod";

export const githubRepoPermissive = z.string().regex(
  /^(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?\/?$/,
  { message: "Invalid GitHub repository URL" }
);