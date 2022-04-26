import pg from 'pg';

const { Pool } = pg;

let pgConnectionConfigs;

if (process.env.DATABASE_URL) {
	pgConnectionConfigs = {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	};
} else {
	pgConnectionConfigs = {
		user: process.env.POSTGRES_USER,
		host: 'localhost',
		database: process.env.POSTGRES_DATABASE,
		port: 5432,
	};
}

const pool = new Pool(pgConnectionConfigs);

export default pool;
