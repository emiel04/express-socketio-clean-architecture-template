import dotenv from "dotenv";
import {boolean} from "boolean";

dotenv.config();

const config = {
    port: Number(process.env.PORT) || 3000,
    enableConnectionStateRecovery: boolean(process.env.ENABLE_CONNECTION_STATE_RECOVERY) || false,
    connectionStateRecoveryDuration: Number(process.env.CONNECTION_STATE_RECOVERY_DURATION) || 5000,
    jwtSecret: process.env.JWT_SECRET || "defaultsecret",
};

export default config;
