import knex from "knex";
import config from "./knexfile";

const db = knex(config[process.env.NODE_ENV || 'development']);
export default db;