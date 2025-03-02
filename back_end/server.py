# Shell: python - m pip install mysql-connector-python flask
import mysql.connector

# How to access the database
config = {
  'user': '',
  'password': '',
  'host': '',
  'database': '',
  'raise_on_warnings': True
}

# Connect to the database
mydb = mysql.connector.connect(**config)

# Cursor to run queries on the database
mycursor = mydb.cursor()

# CREATE, READ, UPDATE, DELETE