/* Table for users AKA client as user is a restricted client */
CREATE TABLE Client (
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(25) DEFAULT 'Anon',
    user_password TEXT NOT NULL,
    user_bio TEXT,
    user_icon INT DEFAULT 0,
    PRIMARY KEY (user_id)
);

/* Table for group AKA a guild as group and groups are restricted keywords */
CREATE TABLE Guild (
    group_id INT AUTO_INCREMENT,
    group_name VARCHAR(25) DEFAULT 'Unnamed Group',
    PRIMARY KEY(group_id)
);

/* Table for channels */
CREATE TABLE Channel (
    channel_id INT AUTO_INCREMENT,
    channel_name VARCHAR(25) DEFAULT 'Unnamed Channel',
    PRIMARY KEY (channel_id)
);

/* Table for direct 1 to 1 conversations AKA a whisper */
CREATE TABLE Whisper (
    direct_id INT AUTO_INCREMENT,
    user_1 INT,
    user_2 INT,
    FOREIGN KEY (user_1) REFERENCES Users(user_id),
    FOREIGN KEY (user_2) REFERENCES Users(user_id),
    PRIMARY KEY (direct_id)
);

/* Table for messages AKA a letter (message can sometimes be a restricted keyword) */
CREATE TABLE Letter (
    message_id INT AUTO_INCREMENT,
    sender_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id)
);

/* Table for members */
CREATE TABLE GuildHasMember (
    group_id INT,
    user_id INT,
    admin_status BOOLEAN DEFAULT 0, /* 0 for False, 1 for True */
    FOREIGN KEY (group_id) REFERENCES Groups(group_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    PRIMARY KEY (group_id, user_id)
);

/* Table for group has channels */
CREATE TABLE GuildHasChannel (
    group_id INT,
    channel_id INT,
    FOREIGN KEY (group_id) REFERENCES Groups(group_id),
    FOREIGN KEY (channel_id) REFERENCES Channels(channel_id),
    PRIMARY KEY (group_id, channel_id)
);

/* Table for channel has messages */
CREATE TABLE ChannelHasLetter (
    channel_id INT,
    message_id INT,
    FOREIGN KEY (channel_id) REFERENCES Channels(channel_id),
    FOREIGN KEY (message_id) REFERENCES Messages(message_id),
    PRIMARY KEY (channel_id, message_id)
);

/* Table for direct has messages */
CREATE TABLE WhisperHasLetter (
    direct_id INT,
    message_id INT,
    FOREIGN KEY (direct_id) REFERENCES Directs(direct_id),
    FOREIGN KEY (message_id) REFERENCES Messages(message_id),
    PRIMARY KEY (direct_id, message_id)
);