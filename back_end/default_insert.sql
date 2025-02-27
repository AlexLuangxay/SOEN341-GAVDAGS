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

/* Default channels */
INSERT INTO Channels (channel_name)
VALUES
    ('Shin'),
    ('Raiden'),
    ('Anju');

INSERT INTO Directs (user_1, user_2)
VALUES
    (1, 2),
    (1, 3),
    (2, 3);

INSERT INTO Messages (sender_id, content, created_at)
VALUES
    (1, 'Yahallo!', '2025-02-26 14:00:00'),
    (2, 'Hello', '2025-02-26 14:05:00'),
    (3, 'Hi', '2025-02-26 14:10:00'),
    (2, 'Bye', '2025-02-26 14:15:00');

INSERT INTO Members (group_id, user_id, admin_status)
VALUES
    (1, 1, 0),
    (1, 2, 1),
    (1, 3, 0);