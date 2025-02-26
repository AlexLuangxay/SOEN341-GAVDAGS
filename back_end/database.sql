/* Table for users */
CREATE TABLE User (
    user_id SERIAL,
    user_name VARCHAR(25) DEFAULT 'Anon',
    user_bio TEXT,
    user_icon INT,
    PRIMARY KEY (user_id)
)

/* Table for guild */
CREATE TABLE Guild (
    guild_id SERIAL,
    guild_name VARCHAR(25) DEFAULT 'Guild',
    PRIMARY KEY(guild_id)
);

/* Table for channels */
CREATE TABLE Channel (
    channel_id SERIAL,
    channel_name VARCHAR(25) DEFAULT 'Channel',
    PRIMARY KEY (channel_id)
)

/* Table for direct messages */
CREATE TABLE Direct (
    direct_id SERIAL,
    PRIMARY KEY (direct_id)
)

/* Table for messages */
CREATE TABLE Message (
    message_id SERIAL,
    sender_id INT NOT NULL,
    content TEXT NOT NULL,
    date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id)
)

/* Table for members */
CREATE TABLE Member (
    guild_id INT,
    user_id INT,
    admin_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (guild_id) REFERENCES Guild(guild_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    PRIMARY KEY (guild_id, user_id)
);

/* Table for group has channels */
CREATE TABLE GuildHasChannel (
    guild_id INT,
    channel_id INT,
    FOREIGN KEY (guild_id) REFERENCES Guild(guild_id),
    FOREIGN KEY (channel_id) REFERENCES Channel(channel_id),
    PRIMARY KEY (guild_id, channel_id)
);

/* Table for channel has messages */
CREATE TABLE ChannelHasMessages (
    channel_id INT,
    message_id INT,
    FOREIGN KEY (channel_id) REFERENCES Channel(channel_id),
    FOREIGN KEY (message_id) REFERENCES Message(message_id),
    PRIMARY KEY (channel_id, message_id)
);

/* Table for channel has messages */
CREATE TABLE DirectHasMessages (
    direct_id INT,
    message_id INT,
    FOREIGN KEY (direct_id) REFERENCES Direct(direct_id),
    FOREIGN KEY (message_id) REFERENCES Message(message_id),
    PRIMARY KEY (direct_id, message_id)
);