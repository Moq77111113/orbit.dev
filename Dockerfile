FROM node:22-alpine3.20 AS pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g corepack@latest
RUN corepack enable
RUN corepack prepare pnpm@10.2.0 --activate


FROM pnpm AS builder

WORKDIR /home

COPY --link package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --link . .

RUN pnpm build && pnpm prune --prod

FROM pnpm AS app
ENV NODE_ENV=production

ARG BUILD_DATE
ARG VERSION=1.0.0

LABEL org.opencontainers.image.title="Orbit Tech Radar" \
    org.opencontainers.image.description="Technology radar visualization tool" \
    org.opencontainers.image.version=${VERSION} \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.source="https://github.com/moq77111113/orbit.dev" \
    org.opencontainers.image.licenses="MIT" \
    maintainer="moq77111113"
WORKDIR /app

COPY --from=builder /home/build ./
COPY --from=builder /home/node_modules ./node_modules
COPY --from=builder /home/package.json ./

CMD ["node", "index.js"]