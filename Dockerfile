FROM node:20-bookworm-slim

ENV NODE_ENV=production \
    PORT=3000

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        python3 \
        make \
        g++ \
        pkg-config \
        libcairo2-dev \
        libpango1.0-dev \
        libjpeg-dev \
        libgif-dev \
        librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/soniverse-backend

COPY soniverse-backend/package.json soniverse-backend/package-lock.json ./
RUN npm ci --omit=dev

COPY soniverse-backend/ ./
COPY soniverse-frontend/public/ /app/soniverse-frontend/public/

RUN mkdir -p uploads sessions \
    && chown -R node:node /app/soniverse-backend

USER node

EXPOSE 3000

CMD ["node", "server.js"]