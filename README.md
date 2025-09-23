<img width="1013" height="273" alt="image" src="https://github.com/user-attachments/assets/1645a232-36b7-4f80-a3e1-094e36508b31" />

**Zapp** is a **one-click React deployment platform** that allows developers to deploy React applications in under 30 seconds. Users simply provide a **GitHub repository URL** and optionally a **custom domain**, and the platform handles the entire deployment process automatically. It leverages a **microservices architecture**, cloud storage (AWS S3), and job queuing (Redis) to ensure **fast, scalable, and seamless deployments**.

---

### **How It Works: The Three Microservices**

### **1. Request Handler Service**

- **Role:** Entry point for all deployment requests.
- **What It Does:**
    - Accepts GitHub URLs and custom domains from users.
    - Validates and formats the data for deployment.
    - Passes the task to the deploy service for further processing.
- **Purpose:** Orchestrates incoming requests and ensures each deployment enters the pipeline correctly.

### **2. Deploy Service**

- **Role:** Prepares the project for deployment.
- **What It Does:**
    - Pulls project files from GitHub or S3.
    - Uploads files to **AWS S3** and generates a **unique project ID**.
    - Enqueues the task in **Redis** for asynchronous processing by the upload service.
- **Purpose:** Handles building, staging, and organizing deployment tasks efficiently.

### **3. Upload Service**

- **Role:** Completes the deployment process.
- **What It Does:**
    - Fetches tasks from Redis queue.
    - Downloads project files from S3.
    - Executes a local build and deploys the project live.
- **Purpose:** Ensures the application is built, deployed, and accessible with minimal delay, completing the automated pipeline.
