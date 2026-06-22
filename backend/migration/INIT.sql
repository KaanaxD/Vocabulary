-- Active: 1778991421142@@127.0.0.1@5432@vocab
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vocab(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    english TEXT NOT NULL,
    indonesia TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT NOW()
)