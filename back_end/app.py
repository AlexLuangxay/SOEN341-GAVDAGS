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









if __name__ == '__main__':
    app.run(debug=True)
