FROM node:22-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Development image
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package-lock.json ./
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build static export
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Serve static output with nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
