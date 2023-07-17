# Fresh project

Your new Fresh project is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Building for Docker

To build your Docker image inside of a Git repository:

```
docker build --build-arg GIT_REVISION=$(git rev-parse HEAD) -t clickcount .
```

Then run your Docker container:

```
docker run -t -i -p 80:8000 clickcount
```

:)
