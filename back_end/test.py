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

### Test

"""
# Drop a table
mycursor.execute(
  '''
  DROP TABLE customers
  '''
)
"""

"""
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
val = [
  ('Peter', 'Lowstreet 4'),
  ('Amy', 'Apple st 652'),
  ('Hannah', 'Mountain 21'),
  ('Michael', 'Valley 345'),
  ('Sandy', 'Ocean blvd 2'),
  ('Betty', 'Green Grass 1'),
  ('Richard', 'Sky st 331'),
  ('Susan', 'One way 98'),
  ('Vicky', 'Yellow Garden 2'),
  ('Ben', 'Park Lane 38'),
  ('William', 'Central st 954'),
  ('Chuck', 'Main Road 989'),
  ('Viola', 'Sideway 1633')
]

mycursor.executemany(sql, val)
mydb.commit()
"""

"""
# Insert into a table
sql = 'INSERT INTO customers (name, address) VALUES (%s, %s)'
val = ('Smurf', 'Village')
mycursor.execute(sql,val)
mydb.commit()
print('ID of last record inserted: ', mycursor.lastrowid) # lastrowid returns the value generated for an AUTO_INCREMENT column

# Close the database
mydb.close()

# Test
print(mydb)
"""