-- Active: 1778991421142@@127.0.0.1@5432@vocab
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vocab(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    english TEXT NOT NULL UNIQUE,
    indonesia TEXT NOT NULL UNIQUE,
    added_at TIMESTAMP DEFAULT NOW()
)


INSERT INTO vocab (user_id, english, indonesia) VALUES
(1, 'Apple', 'Apel'),
(1, 'Book', 'Buku'),
(1, 'Chair', 'Kursi'),
(1, 'Door', 'Pintu'),
(1, 'Water', 'Air'),
(1, 'House', 'Rumah'),
(1, 'School', 'Sekolah'),
(1, 'Teacher', 'Guru'),
(1, 'Student', 'Siswa'),
(1, 'Computer', 'Komputer');

-- 10 Vocabulary for User 2 (budi)
INSERT INTO vocab (user_id, english, indonesia) VALUES
(2, 'Car', 'Mobil'),
(2, 'Road', 'Jalan'),
(2, 'Bridge', 'Jembatan'),
(2, 'River', 'Sungai'),
(2, 'Mountain', 'Gunung'),
(2, 'Forest', 'Hutan'),
(2, 'Beach', 'Pantai'),
(2, 'Island', 'Pulau'),
(2, 'Cloud', 'Awan'),
(2, 'Rain', 'Hujan');

-- 10 Vocabulary for User 3 (siti)
INSERT INTO vocab (user_id, english, indonesia) VALUES
(3, 'Cat', 'Kucing'),
(3, 'Dog', 'Anjing'),
(3, 'Bird', 'Burung'),
(3, 'Fish', 'Ikan'),
(3, 'Cow', 'Sapi'),
(3, 'Goat', 'Kambing'),
(3, 'Horse', 'Kuda'),
(3, 'Chicken', 'Ayam'),
(3, 'Duck', 'Bebek'),
(3, 'Rabbit', 'Kelinci');

-- 10 Vocabulary for User 4 (andi)
INSERT INTO vocab (user_id, english, indonesia) VALUES
(4, 'Red', 'Merah'),
(4, 'Blue', 'Biru'),
(4, 'Green', 'Hijau'),
(4, 'Yellow', 'Kuning'),
(4, 'Black', 'Hitam'),
(4, 'White', 'Putih'),
(4, 'Purple', 'Ungu'),
(4, 'Orange', 'Oranye'),
(4, 'Brown', 'Cokelat'),
(4, 'Gray', 'Abu-abu');

-- 10 Vocabulary for User 5 (rina)
INSERT INTO vocab (user_id, english, indonesia) VALUES
(5, 'Morning', 'Pagi'),
(5, 'Afternoon', 'Siang'),
(5, 'Evening', 'Sore'),
(5, 'Night', 'Malam'),
(5, 'Today', 'Hari ini'),
(5, 'Tomorrow', 'Besok'),
(5, 'Yesterday', 'Kemarin'),
(5, 'Week', 'Minggu'),
(5, 'Month', 'Bulan'),
(5, 'Year', 'Tahun');