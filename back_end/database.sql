/* CREATE AND USE THE DATABASE */
CREATE DATABASE Soen341;
USE Soen341;

/* Table for users AKA client as user is a restricted client */
CREATE TABLE Client (
    client_id INT AUTO_INCREMENT,
    client_username VARCHAR(25) UNIQUE,
    client_password TEXT NOT NULL,
    client_bio TEXT,
    client_icon INT DEFAULT 0,
    PRIMARY KEY (client_id)
);

/* Table for group AKA a guild as group and groups are restricted keywords */
CREATE TABLE Guild (
    guild_id INT AUTO_INCREMENT,
    guild_name VARCHAR(25) UNIQUE,
    PRIMARY KEY(guild_id)
);

/* Table for channels */
CREATE TABLE Channel (
    channel_id INT AUTO_INCREMENT,
    channel_name VARCHAR(25) DEFAULT 'Unnamed Channel',
    PRIMARY KEY (channel_id)
);

/* Table for direct 1 to 1 conversations AKA a whisper */
CREATE TABLE Whisper (
    client_1 INT NOT NULL,
    client_2 INT NOT NULL,
    FOREIGN KEY (client_1) REFERENCES Client(client_id) ON DELETE CASCADE,
    FOREIGN KEY (client_2) REFERENCES Client(client_id) ON DELETE CASCADE,
    PRIMARY KEY (client_1, client_2)
);

/* Table for guild message AKA an public letter (message can sometimes be a restricted keyword) */
CREATE TABLE PublicLetter (
    letter_id INT AUTO_INCREMENT,
    sender_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (letter_id)
);

/* Table for private message AKA a private letter (message can sometimes be a restricted keyword) */
CREATE TABLE PrivateLetter (
    letter_id INT AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (letter_id)
);

/* Table for members */
CREATE TABLE GuildHasMember (
    guild_id INT,
    client_id INT,
    admin_status BOOLEAN DEFAULT 0, /* 0 for False, 1 for True */
    FOREIGN KEY (guild_id) REFERENCES Guild(guild_id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES Client(client_id) ON DELETE CASCADE,
    PRIMARY KEY (guild_id, client_id)
);

/* Table for group has channels */
CREATE TABLE GuildHasChannel (
    guild_id INT,
    channel_id INT,
    FOREIGN KEY (guild_id) REFERENCES Guild(guild_id) ON DELETE CASCADE,
    FOREIGN KEY (channel_id) REFERENCES Channel(channel_id) ON DELETE CASCADE,
    PRIMARY KEY (guild_id, channel_id)
);

/* Table for channel has messages */
CREATE TABLE ChannelHasLetter (
    channel_id INT,
    letter_id INT,
    FOREIGN KEY (channel_id) REFERENCES Channel(channel_id) ON DELETE CASCADE,
    FOREIGN KEY (letter_id) REFERENCES PublicLetter(letter_id) ON DELETE CASCADE,
    PRIMARY KEY (channel_id, letter_id)
);

/* Table for direct has messages */
CREATE TABLE WhisperHasLetter (
    client_1 INT NOT NULL,
    client_2 INT NOT NULL,
    letter_id INT,
    FOREIGN KEY (client_1) REFERENCES Whisper(client_1) ON DELETE CASCADE,
    FOREIGN KEY (client_2) REFERENCES Whisper(client_2) ON DELETE CASCADE,
    FOREIGN KEY (letter_id) REFERENCES PrivateLetter(letter_id) ON DELETE CASCADE,
    PRIMARY KEY (client_1, client_2, letter_id)
);