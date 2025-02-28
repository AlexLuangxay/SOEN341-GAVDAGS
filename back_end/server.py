# Shell: python - m pip install mysql-connector-python flask
import mysql.connector

# How to access the database
config = {
  'user': 'admin',
  'password': 'soen341admin',
  'host': 'soen341-database.c0pwgyc4ixjm.us-east-1.rds.amazonaws.com',
  'database': 'Soen341',
  'raise_on_warnings': True
}

# Connect to the database
mydb = mysql.connector.connect(**config)

# Close the database
mydb.close()

# Test
print(mydb)
