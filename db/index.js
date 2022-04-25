import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: 'localhost',
	database: process.env.POSTGRES_DATABASE,
	port: 5432,
});

export default pool;
