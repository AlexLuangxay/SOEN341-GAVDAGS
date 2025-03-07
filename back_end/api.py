# Shell: python - m pip install mysql-connector-python flask
import mysql.connector

# How to access the database
config = {
  'user': 'admin',
  'password': 'soen341admin',
  'host': 'soen341.c0pwgyc4ixjm.us-east-1.rds.amazonaws.com',
  'database': 'Soen341',
  'raise_on_warnings': True
}

# Connect to the database
mydb = mysql.connector.connect(**config)
mycursor = mydb.cursor()
mydb.commit()

### CREATE READ UPDATE DELETE

# Create a Client
def create_client(client_username, client_password):
  try:
    sql = 'INSERT INTO Client (client_username, client_password) VALUES (%s, %s)'
    val = (client_username, client_password)
    mycursor.execute(sql, val)
    mydb.commit()
    print('Success Creating Client')
  except Exception as e:
    print('Error Creating Client: ', e)
# Test vvv
# create_client('Bob', 'password')


# Create a Guild
def create_guild(guild_name):
  try:
    sql = 'INSERT INTO Guild (guild_name) VALUES (%s)'
    val = (guild_name, )
    mycursor.execute(sql, val)
    mydb.commit()
    print('Success Creating Guild')
  except Exception as e:
    print('Error Creating Guild: ', e)
# Test vvv
# create_guild('Classroom of the Elite')


# Create a Channel
def create_channel(guild_id, channel_name):
  try:
    sql_channel = 'INSERT INTO Channel (channel_name) VALUES (%s)'
    val_channel = (channel_name, )
    mycursor.execute(sql_channel, val_channel)
    mydb.commit()
    
    channel_id = mycursor.lastrowid

    sql_relation = 'INSERT INTO GuildHasChannel (guild_id, channel_id) VALUES (%s, %s)'
    val_relation = (guild_id, channel_id)
    mycursor.execute(sql_relation, val_relation)
    mydb.commit()
    print('Success Creating Channel')
  except Exception as e:
    print('Error Creating Channel: ', e)
# Test vvv
# create_channel(1, 'Anju')
# create_channel(3, 'XYZ')


# Create a Whisper
def create_whisper(client_1, client_2):
  try:
    # To address duplicate whispers of 1 on 1 conversions
    # I will force the oldest client to always be client_1
    # to avoid client_1 + client_2 and client_2 + client_1 creating duplicate whispers
    if client_1 < client_2:
      older = client_1
      newer = client_2
    else :
      older = client_2
      newer = client_1

    sql = 'INSERT INTO Whisper (client_1, client_2) VALUES (%s, %s)'
    val = (older, newer)
    mycursor.execute(sql, val)
    mydb.commit()
    print('Success Creating Whisper')
  except Exception as e:
    print('Error Creating Whisper: ', e)
# Test vvv
# create_whisper(1, 5)
# create_whisper(5, 1)


# Create a Public Letter
def create_public_letter(channel_id, sender_id, content):
  try:
    sql_letter = 'INSERT INTO PublicLetter (sender_id, content) VALUES (%s, %s)'
    val_letter = (sender_id, content)
    mycursor.execute(sql_letter, val_letter)
    mydb.commit()
    
    letter_id = mycursor.lastrowid
    
    sql_relation = 'INSERT INTO ChannelHasLetter (channel_id, letter_id) VALUES (%s, %s)'
    val_relation = (channel_id, letter_id)
    print('Success Creating Public Letter')
  except Exception as e:
    print('Error Creating Public Letter: ', e)
# Test vvv
# create_public_letter(1, 2, 'Test Channel Letter 3')


# Create a Private Letter
# In case of Error Creating Private Letter:  1452 (23000): Cannot add or update a child row:
# a foreign key constraint fails (`Soen341`.`WhisperHasLetter`, CONSTRAINT `WhisperHasLetter_ibfk_1` FOREIGN KEY (`client_1`, `client_2`)
# REFERENCES `Whisper` (`client_1`, `client_2`) ON DELETE CASCADE)
# ^^^ MAKE SURE TO CREATE THE WHISPER (DM INSTANSE BEFOREHAND)
def create_private_letter(sender_id, receiver_id, content):
  try:
    sql_letter = 'INSERT INTO PrivateLetter (sender_id, receiver_id, content) VALUES (%s, %s, %s)'
    val_letter = (sender_id, receiver_id, content)
    mycursor.execute(sql_letter, val_letter)
    mydb.commit()
    
    letter_id = mycursor.lastrowid

    # To address duplicate whispers of 1 on 1 conversions
    if sender_id < receiver_id:
      older = sender_id
      newer = receiver_id
    else :
      older = receiver_id
      newer = sender_id

    sql = 'INSERT INTO WhisperHasLetter (client_1, client_2, letter_id) VALUES (%s, %s, %s)'
    val = (older, newer, letter_id)
    mycursor.execute(sql, val)
    mydb.commit()
    print('Success Creating Private Letter')
  except Exception as e:
    print('Error Creating Private Letter: ', e)
# Test vvv
create_private_letter(3, 1, 'Yahallo')