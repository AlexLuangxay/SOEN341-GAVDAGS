



import unittest
from unittest.mock import patch, MagicMock
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'back_end')))
from api import (create_client, read_client_username, create_guild, read_guild,
                 get_guild_id, get_client_id, addGuildMember)

class TestDatabaseOperations(unittest.TestCase):
    @patch('api.mysql.connector.connect')
    def setUp(self, mock_connect):
        """Setup mock database connection."""
        self.mock_db = MagicMock()
        mock_connect.return_value = self.mock_db
        self.mock_cursor = MagicMock()
        self.mock_db.cursor.return_value = self.mock_cursor

    def test_create_client(self):
        """Test client creation."""
        self.mock_cursor.lastrowid = 1
        self.mock_cursor.fetchone.return_value = (1, 'testuser')
        client_id = create_client('testuser', 'password')
        self.mock_cursor.execute.assert_called()
        self.assertEqual(client_id, 1, "Should return the client ID")

    def test_read_client_username(self):
        """Test reading client username."""
        self.mock_cursor.fetchone.return_value = (1, 'testuser')
        result = read_client_username('testuser')
        self.assertTrue(result, "Should return True if client exists")

    def test_create_guild(self):
        """Test guild creation."""
        self.mock_cursor.lastrowid = 123
        self.mock_cursor.fetchone.return_value = None  # simulate no existing guild
        guild_id = create_guild('NewGuild')
        self.assertEqual(guild_id, 123, "Should return the new guild ID")

    def test_get_guild_id(self):
        """Test fetching guild ID by name."""
        self.mock_cursor.fetchone.return_value = (123,)
        guild_id = get_guild_id('TestGuild')
        self.assertEqual(guild_id, 123, "Should return the correct guild ID")

    def test_add_guild_member(self):
        """Test adding a member to a guild."""
        addGuildMember(123, 1, 0)
        self.mock_cursor.execute.assert_called_with(
            'INSERT INTO GuildHasMember (guild_id, client_id, admin_status) VALUES (%s, %s, %s)',
            (123, 1, 0)
        )
        self.mock_db.commit.assert_called_once()

if __name__ == '__main__':
    unittest.main()

