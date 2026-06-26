-- Active: 1778991421142@@127.0.0.1@5432@vocab
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, name)
);
CREATE TABLE vocab (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    english TEXT NOT NULL,
    indonesia TEXT NOT NULL,
    category_id INTEGER REFERENCES categories (id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, english, indonesia,category_id)
);

ALTER TABLE vocab
ADD CONSTRAINT uq_vocabulary_composite UNIQUE(user_id, english, indonesia, category_id);

SELECT * FROM categories;
SELECT * FROM vocab;
SELECT * FROM users;
SELECT * FROM vocab WHERE category_id = 11

-- CREATE TABLE vocab (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
--     english TEXT NOT NULL,
--     indonesia TEXT NOT NULL, 
--     category TEXT,
--     added_at TIMESTAMP DEFAULT NOW()
--     UNIQUE(user_id,english,indonesia)
-- )


DROP TABLE vocab;
DROP TABLE categories;
DROP TABLE users;

INSERT INTO
    vocab (user_id, english, indonesia)
VALUES (1, 'Apple', 'Apel'),
    (1, 'Book', 'Buku'),
    (1, 'Chair', 'Kursi'),
    (1, 'Door', 'Pintu'),
    (1, 'Water', 'Air'),
    (1, 'House', 'Rumah'),
    (1, 'School', 'Sekolah'),
    (1, 'Teacher', 'Guru'),
    (1, 'Student', 'Siswa'),
    (1, 'Computer', 'Komputer');

SELECT * FROM vocab WHERE id = ANY ($1);

SELECT * FROM vocab