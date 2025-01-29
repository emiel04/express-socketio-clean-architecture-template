import Server from "@infrastructure/setup/Server";

async function startServer() {
    const server = new Server();
    await server.start(3000);
}

startServer().catch((err) => {
    console.error("Failed to start the application:", err);
});

export { startServer };
