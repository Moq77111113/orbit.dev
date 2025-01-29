FROM node:22-alpine3.20 AS pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM pnpm AS builder

WORKDIR /home

COPY --link package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --link . .

RUN pnpm build && pnpm prune

FROM pnpm AS app

WORKDIR /app
ENV PORT=5173

COPY --from=builder /home/build ./

CMD ["node", "index.js"]