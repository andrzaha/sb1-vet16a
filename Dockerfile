# Use bun base image
FROM oven/bun:1 as base
WORKDIR /app

# Install dependencies
FROM base AS deps
# Add certificates to the system
COPY mycerts.crt /usr/local/share/ca-certificates/mycerts.crt
RUN apt-get update && \
    apt-get install -y ca-certificates && \
    update-ca-certificates

COPY package.json ./
COPY bun.lockb ./
RUN bun install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
# Add certificates to the builder stage as well
COPY mycerts.crt /usr/local/share/ca-certificates/mycerts.crt
RUN apt-get update && \
    apt-get install -y ca-certificates && \
    update-ca-certificates

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects anonymous telemetry data about general usage - disable it
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Add certificates to the runner stage
COPY mycerts.crt /usr/local/share/ca-certificates/mycerts.crt
RUN apt-get update && \
    apt-get install -y ca-certificates && \
    update-ca-certificates

# Create a non-root user
RUN groupadd --system --gid 1001 bunjs && \
    useradd --system --uid 1001 --gid bunjs nextjs

# Copy built files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:bunjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bunjs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Use bun to run the server
CMD ["bun", "server.js"] 