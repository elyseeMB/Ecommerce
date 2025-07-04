FROM node:lts-bookworm-slim AS base
WORKDIR /app
RUN apt update
RUN apt install -y curl wget fontconfig
RUN rm -rf /var/lib/apt/lists/*

# Base installer
FROM base AS installer
RUN corepack enable
COPY . .

# All deps stage
FROM installer AS deps
RUN pnpm workspaces focus @ecommerce/site

# Production only deps stage
FROM installer AS production-deps
RUN pnpm workspaces focus @ecommerce/site --production

# Build stage
FROM installer AS build
COPY --from=deps /app/node_modules /app/node_modules
WORKDIR /app/apps/api
RUN node ace build --ignore-ts-errors

# Production stage
FROM base
ENV NODE_ENV=production
ENV FONTCONFIG_PATH=/etc/fonts
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/apps/api/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
