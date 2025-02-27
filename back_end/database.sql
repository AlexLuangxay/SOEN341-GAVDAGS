/* Table for users */
CREATE TABLE Users (
    user_id SERIAL,
    user_name VARCHAR(25) DEFAULT 'Anon',
    user_password TEXT NOT NULL,
    user_bio TEXT,
    user_icon INT DEFAULT 0,
    PRIMARY KEY (user_id)
);

/* Table for group */
CREATE TABLE Groups (
    group_id SERIAL,
    group_name VARCHAR(25) DEFAULT 'Unnamed Group',
    PRIMARY KEY(group_id)
);

/* Table for channels */
CREATE TABLE Channels (
    channel_id SERIAL,
    channel_name VARCHAR(25) DEFAULT 'Unnamed Channel',
    PRIMARY KEY (channel_id)
);

/* Table for direct 1 to 1 conversations */
CREATE TABLE Directs (
    direct_id SERIAL,
    user_1 BIGINT UNSIGNED NOT NULL,
    user_2 BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_1) REFERENCES Users(user_id),
    FOREIGN KEY (user_2) REFERENCES Users(user_id),
    PRIMARY KEY (direct_id)
);

/* Table for messages */
CREATE TABLE Messages (
    message_id SERIAL,
    sender_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id)
);

/* Table for members */
CREATE TABLE Members (
    group_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    admin_status BOOLEAN DEFAULT 0, /* 0 for False, 1 for True */
    FOREIGN KEY (group_id) REFERENCES Groups(group_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    PRIMARY KEY (group_id, user_id)
);

/* Table for group has channels */
CREATE TABLE GroupHasChannel (
    group_id BIGINT UNSIGNED NOT NULL,
    channel_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (group_id) REFERENCES Groups(group_id),
    FOREIGN KEY (channel_id) REFERENCES Channels(channel_id),
    PRIMARY KEY (group_id, channel_id)
);

/* Table for channel has messages */
CREATE TABLE ChannelHasMessages (
    channel_id BIGINT UNSIGNED NOT NULL,
    message_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (channel_id) REFERENCES Channels(channel_id),
    FOREIGN KEY (message_id) REFERENCES Messages(message_id),
    PRIMARY KEY (channel_id, message_id)
);

/* Table for direct has messages */
CREATE TABLE DirectHasMessages (
    direct_id BIGINT UNSIGNED NOT NULL,
    message_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (direct_id) REFERENCES Directs(direct_id),
    FOREIGN KEY (message_id) REFERENCES Messages(message_id),
    PRIMARY KEY (direct_id, message_id)
);