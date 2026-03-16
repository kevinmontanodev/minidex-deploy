# MiniDex Deployment

This repository contains the **deployment configuration for the MiniDex project**, including the frontend, backend, reverse proxy, and container orchestration.

The system is containerized and orchestrated using **Docker Compose**, allowing the entire application stack to run with a single command.

Technologies used in this repository:

- Docker
- Docker Compose
- Nginx

## Architecture Overview

The deployment architecture consists of three main services:

```text
User
 │
 ▼
Nginx (Reverse Proxy)
 │
 ├── /api/v1 → Backend API
 │
 ├── /api → Frontend BFF (Astro Server)
 │
 └── / → Frontend SSR
```

Services:

| Service | Description |
|:-------- | --------:|
| API |	Backend REST API |
| Frontend | SSR frontend with BFF endpoints |
| Nginx	| Reverse proxy routing requests |

The reverse proxy handles all incoming traffic and routes requests to the appropriate internal service.

## Repository Structure
```text
api/        -> Backend service container
frontend/   -> Frontend SSR container
nginx/      -> Reverse proxy configuration
docker-compose.yml
.env.example
```

This repository focuses only on **deployment and infrastructure**, while the application code lives in separate repositories.

## Related Repositories

Application logic and detailed documentation can be found in the following repositories:

Frontend Repository
https://github.com/kevinmontanodev/MiniDexFrontEnd

Backend Repository
https://github.com/kevinmontanodev/MiniDexBackend

Those repositories contain detailed documentation about:

- Backend architecture
- Frontend architecture
- Game mechanics
- API design
- State management

## Services
### Backend API

The backend service exposes the main REST API for the system.

The service is built from the `api/` directory and runs internally on:
```text
api:8080
```

The API is not directly exposed to the public internet. Instead, requests are routed through the reverse proxy.

## Frontend SSR

The frontend is an SSR application built with:

- Astro
- React

The frontend runs on:
```text
frontend:4321
```

This service provides:

- Server-side rendered pages
- BFF API endpoints
- UI for the game

## Reverse Proxy

The reverse proxy is implemented using **Nginx**.

Its responsibilities include:

- Routing HTTP traffic
- Exposing a single public port
- Connecting the frontend and backend services
- Avoiding direct exposure of internal containers

Traffic routing rules:

| Route	| Destination |
|:-------- | --------:|
| `/api/v1/*` |	Backend API |
| `/api/*` | Frontend BFF endpoints |
| `/` |	Frontend SSR |

Example configuration snippet:
```text
location /api/v1/ {
    proxy_pass http://api_server/api/v1/;
}
```

This ensures that **backend API routes are separated from the frontend BFF endpoints**.


## Environment Configuration

The application uses environment variables to configure both the backend and frontend services.

These variables are loaded through a `.env` file defined in the `docker-compose.yml`.

Example:
```text
# Backend
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/minidex
ADMIN_API_KEY=example_admin_key
FRONTEND_URL=http://localhost
DB=minidex
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=86400000

# Frontend
PUBLIC_BACKEND_BASE_URL=/api/v1
```

Environment variables allow the system to be configured **without modifying source code**.

## Environment Variables Reference
### Backend Variables

| Variable | Description |
|:-------- | --------:|
| `MONGO_URI` | Connection string for the MongoDB database |
| `DB` |	Name of the database used by the application |
| `JWT_SECRET` | Secret key used to sign authentication tokens |
| `JWT_EXPIRATION` | Token expiration time in milliseconds |
| `ADMIN_API_KEY` | API key required to access admin-only endpoints |
| `FRONTEND_URL` | URL used for CORS configuration |

### Frontend Variables
| Variable | Description |
|:-------- | --------:|
| `BACKEND_BASE_URL` | Base path used by the frontend to access backend API routes |

In production environments, requests are routed through the reverse proxy, so the frontend only needs the base path.

Example:
```text
/api/v1
```

The reverse proxy will route the request to the backend container.

Important:

Sensitive credentials **should never be committed to the repository**.

## Internal Service URLs

Inside the Docker network, containers communicate using **service names as hostnames**.

For example, the backend container is accessible from the frontend using:
```text
http://api:8080
```

This configuration is defined in the frontend client:
```text
const BASE_URL = import.meta.env.BACKEND_BASE_URL || 'http://api:8080/api/v1';
```

This approach allows the application to run correctly inside Docker without exposing the backend service to the public internet.

If the backend service name changes, this is the only configuration that needs to be updated.

## Secrets Management

Sensitive information such as:

- database credentials
- JWT secrets
- admin API keys

must **never be committed to the repository**.

Instead:

keep the real `.env` file locally

provide an `.env.example` file in the repository

Example:
```text
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
ADMIN_API_KEY=your_admin_key
```

This allows other developers to configure their environment safely.

## Best Practices

When deploying the system:

- keep secrets outside the source code
- use strong values for JWT secrets
- avoid exposing internal service ports
- restrict admin endpoints using the `ADMIN_API_KEY`

This setup ensures that sensitive operations such as cache initialization remain protected.

## Database Requirements

The application requires a running **MongoDB database**.

MiniDex uses:

- MongoDB

The database connection is configured through environment variables.

Example:
```text
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/minidex
DB=minidex
```

The database is required before starting the application.

## Initial Data Setup (Cache Preload)

Before the system can fully operate, the **Pokémon cache must be populated**.

MiniDex uses a cache collection that stores Pokémon data used to generate packs (envelopes). This prevents repeated calls to the external API and improves performance.

During the preload process, the backend fetches Pokémon data from:

- PokéAPI

The following information is cached:

- Pokémon ID
- Name
- Default image
- Shiny image
- Rarity classification

The preload currently inserts the **first 250 Pokémon**.

This cache is stored in the collection used by:
```text
PackPokemonCache
```

## Admin Cache Endpoint

The cache preload process is triggered through an **admin-only endpoint** exposed by the backend.

Endpoint:
```text
POST /api/v1/admin/cache/preload
```

This endpoint is protected by an **Admin API Key**.

The request must include the header:
```text
X-ADMIN-KEY: your_admin_key
```

Example request using curl:
```text
curl -X POST http://localhost/api/v1/admin/cache/preload \
  -H "X-ADMIN-KEY: your_admin_key"
```

When executed, the backend will start loading Pokémon data into the cache.

## Admin API Security

Admin endpoints are protected by a filter that validates the `X-ADMIN-KEY` header.

Characteristics of this protection:

- Only POST requests are allowed
- Requests without a valid admin key are rejected
- Only routes containing /admin/ are filtered

Configuration example:
```text
ADMIN_API_KEY=example_key
```

This key must match the value used in the request header.

## Cache Loading Behavior

During the preload process:

- Pokémon are fetched sequentially
- The system checks if a Pokémon already exists in the cache
- Existing entries are skipped
- A small delay is added between requests to avoid external API rate limits

Pseudo-flow:
```text
for pokemon_id in 1..250
    if pokemon already cached
        skip
    else
        fetch pokemon from PokéAPI
        compute rarity
        save in cache
```

This ensures that the cache can be safely re-run without duplicating entries.

## Why This Cache Exists

The cache preload process was designed to avoid excessive calls to external APIs and ensure stable pack generation during gameplay.

The cache is required for the **pack generation system** used in the game.

Without the cache:

- the application would repeatedly call the external API
- the system would be slower
- the application could hit external API rate limits

By caching the Pokémon data locally, pack generation becomes **fast and reliable**.


## Recommended Initialization Process

When deploying the application for the first time:

1. Start the containers
```cmd
docker compose up --build
```

This command will:

- Build the frontend container
- Build the backend container
- Start the reverse proxy
- Connect all services through a shared network

2. Verify the backend is running.

3. Run the cache preload command.

```cmd
curl -X POST http://localhost/api/v1/admin/cache/preload \
  -H "X-ADMIN-KEY: your_admin_key"
```

4. Wait until the process finishes.

Once the cache is populated, the application is ready to generate Pokémon packs.

The application will then be available at:
```text
http://localhost
```

## Network Flow
```text
Browser
   │
   ▼
Nginx (port 80)
   │
   ├── /api/v1 → Backend API
   │
   ├── /api → Astro BFF
   │
   └── / → Astro SSR
```

This setup provides:

- clean URL routing
- separation between frontend and backend
- centralized entry point

## Security Notes

- The backend service is not publicly exposed
- Only the reverse proxy exposes a port to the host
- Sensitive configuration values are stored in .env

This reduces the attack surface of the application.

## Purpose of This Repository

This repository exists to:

- provide a reproducible deployment environment
- simplify local development
- document the infrastructure architecture
- orchestrate the application stack