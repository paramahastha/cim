# Company Information Management (CIM)

A project that runs a Node server and a create-react-app app via two separate containers, using Docker Compose.

## How to run

```
docker-compose up
```

For development, the `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is up at `localhost:3000` and it proxies internally to the server using the linked name as `localhost:8080`.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.
