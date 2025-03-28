import unittest
from mysql.connector import connect, Error

import sys
import os

# Adjust the path to include the directory where 'database_operations.py' is located
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'back_end')))

# Now import your custom database functions
from api import create_client, read_client_username, create_guild, read_guild

class TestDatabaseOperations(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Set up database connection before running tests."""
        config = {
          'user': 'admin',
          'password': 'soen341admin',
          'host': 'soen341.c0pwgyc4ixjm.us-east-1.rds.amazonaws.com',
          'database': 'Soen341',
          'raise_on_warnings': True
        }
        try:
            cls.connection = connect(**config)
            cls.cursor = cls.connection.cursor()
            print("Setup: Database connected")
        except Error as e:
            print(f"Error connecting to database: {e}")

    @classmethod
    def tearDownClass(cls):
        """Close database connection after tests."""
        cls.cursor.close()
        cls.connection.close()
        print("Teardown: Database connection closed")

    def test_guild_operations(self):
        """Test guild creation and retrieval."""
        guild_name = "TestGuild"
        created_guild_id = create_guild(guild_name)
        fetched_guild = read_guild(created_guild_id)
        
        self.assertIsNotNone(fetched_guild, "Guild should exist in the database")
        self.assertEqual(fetched_guild[1], guild_name, "The guild names should match")

    def test_client_operations(self):
        """Test client creation and retrieval."""
        username = "testuser"
        password = "testpass"
        create_client(username, password)
        is_user_created = read_client_username(username)

        self.assertTrue(is_user_created, "User should be found after creation")

if __name__ == '__main__':
    unittest.main()
