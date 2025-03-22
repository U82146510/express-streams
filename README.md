# Stream File Upload/Download App

This project is a Node.js/Express application that enables **uploading and downloading large files** without fully loading them into memory. Instead, it uses **streaming** to handle files efficiently, ensuring scalability and low memory usage.

## 🚀 Features

- ✅ Upload large files via stream
- ✅ Download files via stream
- ✅ Live download progress tracking in the UI
- ✅ Memory-efficient – does not buffer entire files
- ✅ Built with TypeScript

## 📦 Tech Stack

- **Backend:** Node.js, Express, TypeScript, Streams
- **Frontend:** HTML, JavaScript (with fetch and progress event handling)

## 📁 File Upload

The client can upload files via a simple UI. Files are sent to the server using a `POST` request with a stream, and saved directly to disk.

### Endpoint
POST /upload

### Example
```ts
fetch('/upload', {
  method: 'POST',
  body: fileStream, // FormData or direct stream
});

📥 File Download

The client can download files without loading them fully in the browser memory. The download progress is shown using a progress bar.
Endpoint
GET /download/:filename
Example
const res = await fetch('/download/large-video.mp4');
const reader = res.body.getReader();
// use reader.read() in a loop to show progress
⚙️ Setup

Clone the repo:
git clone https://github.com/yourusername/stream-file-transfer.git
cd stream-file-transfer
Install dependencies:
npm install
Run the server:
ts-node index.ts
Open http://localhost:3000 in your browser.
📊 Progress Display

The download page uses JavaScript's ReadableStream API to read the response body chunk by chunk and calculate progress in real-time, shown in a progress bar.
🛡️ Security Note

This project is intended for educational or internal use. For production:

    Validate file types

    Implement rate limiting and authentication

    Sanitize filenames to avoid path traversal attacks
