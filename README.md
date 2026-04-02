# Minecraft Server Dashboard

A glassmorphism-styled dashboard for managing a Minecraft server on AWS EC2. It handles instance control and real-time game status without the typical browser CORS issues.

## Features

- **EC2 Control**: Start and stop the server instance directly from the UI.
- **Machine Status**: Real-time instance state (Offline/Starting/Online) pulled via a server-side AWS Lambda proxy.
- **Live Game Stats**: Uses `craftping` to fetch player counts and player lists from the Java server.
- **Modern UI**: Built with Next.js, featuring a particle WebGL background and glass-themed cards.

## How it works

The dashboard uses two main API routes to keep things responsive and bypass browser restrictions:

1. `/api/ec2`: Proxies commands to an AWS Lambda function. This avoids CORS preflight failures that come with calling AWS directly from a browser.
2. `/api/mc-status`: Queries the Minecraft server using the Query (UDP) and Ping (TCP) protocols. It stays isolated from the machine status so the UI doesn't flicker when the game is still booting.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the dev server:
   ```bash
   npm run dev
   ```

3. Configure your Lambda URL and Instance ID in `hooks/use-server-controller.ts` and the Lambda code respectively.

