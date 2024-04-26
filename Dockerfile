# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app

RUN echo "#!/bin/sh" > /usr/local/bin/start && \
    echo "cd /app" >> /usr/local/bin/start && \
    echo "npm install" >> /usr/local/bin/start && \
    echo "npm run buildfront" >> /usr/local/bin/start && \
    echo "npm run production" >> /usr/local/bin/start && \
    chmod +x /usr/local/bin/start

CMD ["start"]
EXPOSE 3001 3002
