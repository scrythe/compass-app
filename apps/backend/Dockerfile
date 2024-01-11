FROM node:18-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run --filter=backend build
RUN pnpm deploy --filter=backend --prod /prod

FROM base AS backend
WORKDIR /app
COPY --from=build /prod .
ENV NODE_ENV=production
CMD [ "pnpm", "start" ]
