FROM denoland/deno:1.35.0

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app

COPY . .
RUN deno cache main.ts

EXPOSE 8080

CMD ["run", "-A", "main.ts"]