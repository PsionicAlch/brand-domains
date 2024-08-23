FROM oven/bun:latest AS build

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:latest AS runtime

WORKDIR /app

COPY --from=build /app/build /app

EXPOSE 3000

RUN bun install

CMD ["bun", "run", "start"]
