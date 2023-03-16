import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.tqwpbbv.mongodb.net/kamwise`;
const NODE_PORT = process.env.NODE_PORT || '3000';

const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: NODE_PORT,
  },
};

export default config;
