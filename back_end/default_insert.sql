/* Default users */
INSERT INTO Users (user_name, user_password, user_bio)
VALUES
    ('Anthony', 'anthony', '(≧▽≦)'),
    ('Gur','gur', 'HIM'),
    ('Derek', 'derek', 'Gur''s bestie <3');

/* Default groups */
INSERT INTO Groups (group_name)
VALUES
    ('Spearhead Squadron');
    ('Kessoku Band');

/* Default channels */
INSERT INTO Channels (channel_name)
VALUES
    ('Shin'),
    ('Raiden'),
    ('Hitori'),
    ('Nijika');

INSERT INTO Directs (user_1, user_2)
VALUES
    (1, 2),
    (1, 3),
    (2, 3);

INSERT INTO Messages (sender_id, content, created_at)
VALUES
    (1, 'Test Shin', '2025-02-26 14:00:00'),
    (2, 'Test Shin', '2025-02-26 14:05:00'),
    (3, 'Test Raiden', '2025-02-26 14:10:00'),
    (1, 'Test Hitori', '2025-02-26 14:15:00');
    (1, 'Test Nijika', '2025-02-26 14:16:00');
    (1, 'Test DM Anthony to Gur', '2025-02-26 14:20:00');

INSERT INTO Members (group_id, user_id, admin_status)
VALUES
    (1, 1, 0),
    (1, 2, 1),
    (1, 3, 0);
    (2, 1, 1),
    (2, 2, 1),
    (2, 3, 1);

INSERT INTO GroupHasChannel (group_id, channel_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4);

INSERT INTO ChannelHasMessages (channel_id, message_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5);

INSERT INTO DirectHasMessages (direct_id, message_id)
VALUES
    (1, 6);