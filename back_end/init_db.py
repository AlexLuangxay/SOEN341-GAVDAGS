import mysql.connector

# Database Configuration
config = {
    'user': 'admin',
    'password': 'soen341admin',
    'host': 'soen341-database.c0pwgyc4ixjm.us-east-1.rds.amazonaws.com',
    'database': 'Soen341'
}

def execute_sql_file(filename):
    """Reads and executes an SQL file."""
    with open(filename, 'r') as file:
        sql_script = file.read()
    try:
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        for statement in sql_script.split(';'):
            if statement.strip():
                cursor.execute(statement)
        conn.commit()
        cursor.close()
        conn.close()
        print(f"✅ {filename} executed successfully!")
    except mysql.connector.Error as err:
        print(f"❌ Error executing {filename}: {err}")

# Run both SQL scripts
execute_sql_file("database.sql")
execute_sql_file("default_insert.sql")
