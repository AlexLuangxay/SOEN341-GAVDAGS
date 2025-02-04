-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Create channels table
CREATE TABLE channels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    create_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (create_by) REFERENCES users(id) ON DELETE CASCADE
);


-- Create channel_users table
CREATE TABLE channel_user (
    id SERIAL PRIMARY KEY,
    channel_id INT NOT NULL,
    user_id INT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'moderator', 'member')),
    UNIQUE(channel_id, user_id),
    FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Create channel_messages table
CREATE TABLE channel_messages (
    id SERIAL PRIMARY KEY,
    channel_id INT NOT NULL,
    sender_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Create dms table
CREATE TABLE dms (
    id SERIAL PRIMARY KEY,
    user1 INT NOT NULL,
    user2 INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user1, user2),
    FOREIGN KEY (user1) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user2) REFERENCES users(id) ON DELETE CASCADE
);


-- Create dm_messages table
CREATE TABLE dm_messages (
    id SERIAL PRIMARY KEY,
    dm_id INT NOT NULL,
    sender_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dm_id) REFERENCES dms(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);
