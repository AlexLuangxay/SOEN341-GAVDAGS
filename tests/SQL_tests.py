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
        # Setup mock responses
        mock_create_guild.return_value = 123  # Assume 123 is the guild ID
        mock_read_guild.return_value = ("123", "TestGuild")
        
        # Call the function
        guild_name = "TestGuild"
        created_guild_id = create_guild(guild_name)
        fetched_guild = read_guild(created_guild_id)
        
        # Assert
        self.assertIsNotNone(fetched_guild, "Guild should exist in the database")
        self.assertEqual(fetched_guild[1], guild_name, "The guild names should match")

    @patch('api.create_client')
    @patch('api.read_client_username')
    def test_client_operations(self, mock_read_client_username, mock_create_client):
        # Setup mock
        mock_create_client.return_value = True
        mock_read_client_username.return_value = True
        
        # Test variables
        username = "testuser"
        password = "testpass"
        
        # Simulate creating and verifying a client
        create_client(username, password)
        result = read_client_username(username)

        # Verify
        self.assertTrue(result, "User should be found after creation")

if __name__ == '__main__':
    unittest.main()
