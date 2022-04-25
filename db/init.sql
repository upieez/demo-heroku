CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    email TEXT, 
    password TEXT
);

CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER REFERENCES users(id),
    image_url TEXT
);
