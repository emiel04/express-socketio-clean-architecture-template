import Server from "@infrastructure/setup/Server";
import config from "@helper/config";

function startServer() {
    const server = new Server();
    server.start(config.port);
}

export { startServer };
