from flask import Flask
from routes.api import api_bp
import os
import oracledb
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DSN = os.getenv("DB_DSN")
WALLET_PATH = os.getenv("WALLET_PATH")

oracledb.init_oracle_client(config_dir=WALLET_PATH)

app = Flask(__name__)

db = oracledb.connect(
    user=DB_USER,
    password=DB_PASSWORD,
    dsn=DB_DSN
)

@app.route('/user/groups/<int:user_id>', methods=['GET'])
def get_user_groups(user_id):
    cursor = db.cursor()
    
    query = """
    SELECT group_id, group_name
    
    """






if __name__ == '__main__':
    app.run(debug=True)
