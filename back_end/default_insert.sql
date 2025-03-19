/* Default users */
INSERT INTO Client (client_username, client_password, client_bio)
VALUES
    ('Anthony', 'anthony', 'Yahallo!'),
    ('Gur','gur', 'HIM'),
    ('Derek', 'derek', 'Gur''s bestie <3');

/* Default groups */
INSERT INTO Guild (guild_name)
VALUES
    ('Spearhead Squadron'),
    ('Kessoku Band');

/* Default channels */
INSERT INTO Channel (channel_name)
VALUES
    ('Shin'),
    ('Raiden'),
    ('Hitori'),
    ('Nijika');

INSERT INTO Whisper (client_1, client_2)
VALUES
    (1, 2),
    (1, 3),
    (2, 3);

/* TO UPDATE
INSERT INTO Letter (sender_id, letter_type, content, created_at)
VALUES
    (1, 'channel', 'Test Shin', '2025-02-26 14:00:00'),
    (2, 'channel', 'Test Shin', '2025-02-26 14:05:00'),
    (3, 'channel', 'Test Raiden', '2025-02-26 14:10:00'),
    (1, 'channel', 'Test Hitori', '2025-02-26 14:15:00'),
    (1, 'channel', 'Test Nijika', '2025-02-26 14:16:00'),
    (1, 'whisper', 'Test DM Anthony to Gur', '2025-02-26 14:20:00');
*/

INSERT INTO GuildHasMember (guild_id, client_id, admin_status)
VALUES
    (1, 1, 0),
    (1, 2, 1),
    (1, 3, 0),
    (2, 1, 1),
    (2, 2, 1),
    (2, 3, 1);

INSERT INTO GuildHasChannel (guild_id, channel_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4);

INSERT INTO ChannelHasLetter (channel_id, letter_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5);


/* TO UPDATE
INSERT INTO WhisperHasLetter (whisper_id, letter_id)
VALUES
    (1, 6);
*/