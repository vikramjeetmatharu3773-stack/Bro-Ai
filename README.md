# Bro AI

A professional, fully functional full-stack website for AI-powered chat, file processing, and user management. The AI learns from the internet 24/7, searches for accurate answers, provides free legal download links, and generates AI images without external APIs.

## Features

- **Frontend**: Responsive React app with Tailwind CSS, Framer Motion for 3D animations, and image generation interface.
- **Backend**: Node.js + Express.js API with MongoDB, web scraping for knowledge acquisition, and local AI processing.
- **AI Learning**: Automatic 24/7 web scraping to build and update knowledge base from the entire internet.
- **Search & Answers**: Instant accurate answers by searching the web and providing free legal links for downloads.
- **Image Generation**: Generate high-quality AI images based on prompts using web-sourced data.
- **Authentication**: JWT-based auth with email verification and password reset.
- **File Upload**: Upload files to AWS S3.
- **Admin Panel**: Manage users, logs, files, analytics.
- **Realtime Chat**: WebSockets for live chat.
- **Deployment**: GitHub Actions for automated deployment to Vercel (frontend) and Railway (backend).

## How the AI Works

- **No External APIs**: All AI functionality is handled locally or through web scraping.
- **Knowledge Base**: Queries are first checked against a local database built from web scraping.
- **Web Search**: Uses Puppeteer to search DuckDuckGo and scrape content for answers.
- **Continuous Learning**: Background scraper updates knowledge base every hour with latest information.
- **File Links**: Searches for free and legal download links across the internet.
- **Image Generation**: Searches for AI-generated images matching prompts and provides links.

## Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB
- AWS S3 account
- Email service (Gmail)

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/bro-ai.git
   cd bro-ai
   ```

2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Set up environment variables:
   - Copy `.env.example` to `backend/.env`.
   - Fill in your values for MongoDB URI, JWT secret, email credentials, AWS credentials.

4. Start MongoDB locally or use a cloud service.

5. Run the backend:
   ```bash
   npm run start-backend
   ```

6. Run the frontend:
   ```bash
   npm run start-frontend
   ```

7. Open http://localhost:3000 in your browser.

### Deployment

- Set up Vercel for frontend and Railway for backend.
- Add secrets to GitHub repository for deployment.
- Push to main branch to trigger deployment.

### AI Training

- The AI starts learning immediately upon server start.
- Knowledge base grows with each query and periodic updates.
- No manual training required; fully automatic.

### Environment Variables

See `.env.example` for required variables.