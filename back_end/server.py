import mysql.connector

# Database Configuration
config = {
    'user': 'admin',
    'password': 'soen341admin',
    'host': 'soen341-database.c0pwgyc4ixjm.us-east-1.rds.amazonaws.com',
    'database': 'Soen341',
    'raise_on_warnings': True
}

def connect_to_database():
    try:
        mydb = mysql.connector.connect(**config)
        print("✅ Connection Successful!")
        return mydb
    except mysql.connector.Error as err:
        print(f"❌ Error: {err}")
        return None

def test_query():
    db = connect_to_database()
    if db:
        cursor = db.cursor()
        cursor.execute("SHOW TABLES;")  # Example query
        tables = cursor.fetchall()
        print("Database Tables:", tables)
        cursor.close()
        db.close()

# Run test query
test_query()
