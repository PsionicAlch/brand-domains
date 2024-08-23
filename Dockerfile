FROM oven/bun:latest AS build

WORKDIR /app

ENV NODE_ENV=production
ENV ORIGIN="https://branddomains.psionicalch.com"

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:latest AS runtime

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

RUN bun install

CMD ["bun", "run", "build/index.js"]
