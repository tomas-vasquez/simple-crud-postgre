const { Pool } = require("pg")
// Coloca aquí tus credenciales
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "proyHorario1",
  password: "1234",
  port: 5432,
});
module.exports = pool;
