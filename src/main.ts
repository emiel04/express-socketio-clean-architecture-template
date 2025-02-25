import Server from "@infrastructure/setup/Server";
import config from "@helper/config";
import logger from "@infrastructure/helper/Logger";
function startServer() {
    const server = new Server();
    server.start(config.port);
}

try {
    startServer();
} catch (err) {
    logger.error("Failed to start the application:", err);
}

export { startServer };
