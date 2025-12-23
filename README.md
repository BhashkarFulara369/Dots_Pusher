# Dots Pusher  | High-Performance Real-Time Gaming Backend

![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Dots Pusher is a **real-time multiplayer gaming backend** designed to handle high-velocity data. It leverages **Redis** as a primary data structure store to solve complex distributed system problems like real-time leaderboards, ephemeral chat, and API rate limiting.

##  Why Redis? (Architecture Decisions)

This project moves beyond simple caching to utilize Redis as a core infrastructure component.

| Feature | The Problem | The Redis Solution | Data Structure Used |
| :--- | :--- | :--- | :--- |
| **Real-Time Leaderboard** | Sorting millions of users by score in SQL (`ORDER BY score DESC`) is slow (O(N log N)) and kills database CPU. | Redis keeps data sorted in memory at all times. Fetching the "Top 10" is instant. | **Sorted Sets (ZSET)** |
| **Global Chat** | In a distributed server cluster, User A connected to Server 1 cannot talk to User B on Server 2. | Redis acts as a message broker. Server 1 publishes a message, and all other servers subscribe to it. | **Pub/Sub** |
| **Player Profiles** | Fetching a massive JSON object just to update one field (e.g., "status") is wasteful. | Redis Hashes allow O(1) read/write access to individual fields within a record. | **Hashes (HASH)** |
| **DDoS Protection** | Tracking API request counts in a database creates unnecessary disk I/O. | Redis counters in memory are atomic and incredibly fast. | **Strings + TTL (Time To Live)** |

---

##  Tech Stack

* **Runtime:** Node.js (Express)
* **Database & Broker:** Redis
* **Real-time Engine:** Socket.io
* **Client Library:** `ioredis` (Industry standard Redis client for Node)

---

##  Quick Start (Docker)

The easiest way to run PixelPush is with Docker Compose. This spins up both the Node API and a Redis instance instantly.

```bash
# 1. Clone the repository
git clone [https://github.com/yourusername/pixelpush.git](https://github.com/yourusername/pixelpush.git)
cd pixelpush

# 2. Run with Docker Compose
docker-compose up --build