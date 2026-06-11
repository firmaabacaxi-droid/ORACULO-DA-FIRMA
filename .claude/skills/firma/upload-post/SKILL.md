---
name: upload-post
description: "Upload content to social media platforms via Upload-Post API. Use when posting videos, photos, text, or documents to TikTok, Instagram, YouTube, LinkedIn, Facebook, X (Twitter), Threads, Pinterest, Reddit, or Bluesky. Supports scheduling, analytics, FFmpeg processing, and upload history."
---

# Upload-Post API (Auto-Posting)

Post content to multiple social media platforms with a single API call.

## Setup
1. Account at [upload-post.com](https://upload-post.com)
2. Connect accounts and create a **Profile** (e.g., "mybrand").
3. Use **API Key** in header: `Authorization: Apikey YOUR_API_KEY`.

## Endpoints
- `POST /upload_videos`: TikTok, IG Reels, YT Shorts, etc.
- `POST /upload_photos`: Carousels, single photos.
- `POST /upload_text`: X, LI, FB, Threads.
- `POST /upload_document`: LinkedIn native PDF/PPT carousels.

## Example (Video)
```bash
curl -X POST "https://api.upload-post.com/api/upload_videos" \
  -H "Authorization: Apikey YOUR_KEY" \
  -F "user=profile_name" \
  -F "platform[]=instagram" \
  -F "platform[]=tiktok" \
  -F "video=@video.mp4" \
  -F "title=My caption"
```

## Features
- **Scheduling**: Use `scheduled_date` (ISO-8601).
- **Analytics**: `GET /analytics/<profile>`.
- **FFmpeg**: `POST /ffmpeg` for server-side processing.
