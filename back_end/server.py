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

# Cursor to run queries on the database
mycursor = mydb.cursor()

### Test

# Drop a table
mycursor.execute(
  '''
  DROP TABLE customers
  '''
)



# Add new table
mycursor.execute(
  '''
  CREATE TABLE customers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25),
    address VARCHAR(255)
  )
  '''
)


"""
# Show Tables
mycursor.execute("SHOW TABLES")

for x in mycursor:
  print(x)
"""

# Insert into a table
sql = 'INSERT INTO customers (name, address) VALUES (%s, %s)'
val = ('John', 'Highway 21')
mycursor.execute(sql, val)

# VERY IMPORTANT, I HAVE TO COMMIT TO MAKE THE CHANGES TO THE TABLE
mydb.commit()

print(mycursor.rowcount, "record inserted.")


# Close the database
mydb.close()

# Test
print(mydb)
