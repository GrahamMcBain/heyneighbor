FROM directus/directus:latest

# Create uploads directory and copy setup script
USER root
RUN mkdir -p /directus/uploads && chown -R node:node /directus/uploads

# Copy our setup script
COPY setup.js /directus/setup.js
RUN chown node:node /directus/setup.js

USER node

# Set environment variables
ENV KEY="heyneighbor-cms-production-key-32chars"
ENV SECRET="heyneighbor-cms-production-secret-64chars-change-in-production"
ENV DB_CLIENT="pg"
ENV PORT="8055"
ENV ADMIN_EMAIL="grahammcbain@gmail.com"
ENV ADMIN_PASSWORD="DirectusAdmin123!"
ENV CORS_ENABLED="true"
ENV STORAGE_LOCATIONS="local"
ENV STORAGE_LOCAL_DRIVER="local"
ENV STORAGE_LOCAL_ROOT="./uploads"
ENV RATE_LIMITER_ENABLED="true"
ENV RATE_LIMITER_STORE="memory"
ENV RATE_LIMITER_POINTS="100"
ENV RATE_LIMITER_DURATION="60"

# Expose port
EXPOSE 8055

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8055/server/health || exit 1

# Start Directus
CMD ["npx", "directus", "start"]
