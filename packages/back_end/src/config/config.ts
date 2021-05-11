import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || "jumpuser";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "jump123";
const MONGO_HOST = process.env.MONGO_HOST || "localhost:28017/jump?authSource=jump";

const MONGO = {
  host: MONGO_HOST,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
