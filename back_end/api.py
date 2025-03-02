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


# Create a Letter
def create_letter(channel_or_whisper_id, letter_type, sender_id, content):
  try:
    sql_letter = 'INSERT INTO Letter (letter_type, sender_id, content) VALUES (%s, %s, %s)'
    val_letter = (letter_type, sender_id, content)
    mycursor.execute(sql_letter, val_letter)
    mydb.commit()
    
    letter_id = mycursor.lastrowid

    if letter_type == 'channel':
      channel_id = channel_or_whisper_id
      sql_relation = 'INSERT INTO ChannelHasLetter (channel_id, letter_id) VALUES (%s, %s)'
      val_relation = (channel_id, letter_id)
      mycursor.execute(sql_relation, val_relation)
      mydb.commit()
      print('Success Creating Letter')

    elif letter_type == 'whisper':
      whisper_id = channel_or_whisper_id
      sql_relation = 'INSERT INTO WhisperHasLetter (whisper_id, letter_id) VALUES (%s, %s)'
      val_relation = (whisper_id, letter_id)
      mycursor.execute(sql_relation, val_relation)
      mydb.commit()
      print('Success Creating Letter')
    
    else:
      print('Unknown Letter Type')
  except Exception as e:
    print('Error Creating Letter: ', e)
# Test vvv
create_letter(1, 'channel', 1, 'Test Channel Letter')
create_letter(2, 'whisper', 1, 'Test Whisper Letter')