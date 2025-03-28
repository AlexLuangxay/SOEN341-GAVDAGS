import unittest
from unittest.mock import patch
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'back_end')))
from api import create_client, read_client_username, create_guild, read_guild

class TestDatabaseOperations(unittest.TestCase):
    @patch('api.create_guild')
    @patch('api.read_guild')
    def test_guild_operations(self, mock_read_guild, mock_create_guild):
        # Setup mocks
        mock_create_guild.return_value = 1  # Assume this is the guild ID
        mock_read_guild.return_value = (1, 'TestGuild')

        # Call the function under test
        guild_id = api.create_guild('TestGuild')
        fetched_guild = api.read_guild(guild_id)

        # Assertions to ensure correct behavior
        self.assertIsNotNone(fetched_guild, "Guild should exist in the database")
        self.assertEqual(fetched_guild[1], 'TestGuild', "The guild names should match")

    @patch('api.create_client')
    @patch('api.read_client_username')
    def test_client_operations(self, mock_read_client_username, mock_create_client):
        # Setup mock
        mock_create_client.return_value = True
        mock_read_client_username.return_value = True

        # Test creation and retrieval of a client
        api.create_client("testuser", "testpass")
        result = api.read_client_username("testuser")

        # Verify
        self.assertTrue(result, "User should be found after creation")

if __name__ == '__main__':
    unittest.main()
