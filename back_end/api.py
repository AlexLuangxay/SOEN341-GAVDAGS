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

# Get guild id from username
def get_guild_id(guild_name):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()

    sql = 'SELECT * FROM Guild WHERE guild_name = (%s)'
    val = (guild_name,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    guild_id = obj[0]
    #print(guild_id)
    
    mydb.close()
    return(guild_id)
  except Exception as e:
    print('Error Retrieving Guild ID: ', e)
    
    mydb.close()

# Get guild id from username
def get_guild_name(guild_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
  
    sql = 'SELECT guild_name FROM Guild WHERE guild_id = (%s)'
    val = (guild_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    #print(obj[0])
    
    mydb.close()
    return(obj[0])
  except Exception as e:
    print('Error Retrieving Guild Name: ', e)
    
    mydb.close()

# Get client id from username
def get_client_id(client_username):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()

    sql = 'SELECT client_id FROM Client WHERE client_username = (%s)'
    val = (client_username,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    client_id = obj[0]
    #print(client_id)
    
    mydb.close()
    return(client_id)
  except Exception as e:
    print('Error Retrieving Client ID: ', e)
    
    mydb.close()

#get client username from ID
def get_client_name(client_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()

    sql = 'SELECT client_username FROM Client WHERE client_id = (%s)'
    val = (client_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    #print("obj: ", obj)
    client_username = obj[0]
    #print(client_username)
    
    mydb.close()
    return(client_username)
  except Exception as e:
    print('Error Retrieving Client ID: ', e)
    
    mydb.close()

# Add Member to Guild
def addGuildMember(guild_id, client_id, admin_status):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()

    sql = 'INSERT INTO GuildHasMember (guild_id, client_id, admin_status) VALUES (%s, %s, %s)'
    val = (guild_id, client_id, admin_status)
    mycursor.execute(sql, val)
    mydb.commit()
    
    mydb.close()
    print('Success Joining Guild as Admin')
  except Exception as e:
    print('Error Joining Guild: ', e)
    
    mydb.close()

# Get all servers a user is in
def getGuildFromMember(client_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT * FROM GuildHasMember WHERE client_id = (%s)'
    val = (client_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchall()
    #print(obj)
    
    mydb.close()
    return(obj)
  except Exception as e:
    print('Error Retrieving Guilds: ', e)
    
    mydb.close()

# Get all channels a server has
def getChannelFromGuild(guild_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT * FROM GuildHasChannel WHERE guild_id = (%s)'
    val = (guild_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchall()
    print('list ', obj)
    
    mydb.close()
    return obj
  except Exception as e:
    print('Error Retrieving Channels: ', e)
    
    mydb.close()

#Get channel name from its id
def getChannelFromID(channel_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT channel_name FROM Channel WHERE channel_id = (%s)'
    val = (channel_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchall()
    print(obj)
    
    mydb.close()
    return obj
  except Exception as e:
    print('Error Retrieving Channels: ', e)
    
    mydb.close()

#Get channel name from its id
def getIDFromChannel(channel_name):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    sql = 'SELECT channel_id FROM Channel WHERE channel_name = (%s)'
    val = (channel_name,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    mydb.close()
    return obj
  except Exception as e:
    print('Error Retrieving Channels: ', e)
    
    mydb.close()

# Get all users a server has
def getUserFromGuild (guild_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT Client.client_username FROM GuildHasMember JOIN Client ON GuildHasMember.client_id = Client.client_id WHERE GuildHasMember.guild_id = (%s)'
    val = (guild_id,)
    mycursor.execute(sql,val)
    users = mycursor.fetchall()
    
    mydb.close()
    return users
  except Exception as e:
    print('Error Retrieving Users: ', e)
    
    mydb.close()

# Get all messages within a channel
def getLetterFromChannel(channel_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT * FROM ChannelHasLetter WHERE channel_id = (%s)'
    val = (channel_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchall()
    mydb.close()
    return(obj)
  except Exception as e:
    print('Error Retrieving Messages: ', e)
    mydb.close()

def getMessageFromLetter(letter_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    sql = 'SELECT content FROM PublicLetter WHERE letter_id = (%s)'
    val = (letter_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    mydb.close()
    return(obj[0])
  except Exception as e:
    print('Error Retrieving Messages: ', e)
    mydb.close()

def getSenderFromLetter(letter_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    sql = 'SELECT sender_id FROM PublicLetter WHERE letter_id = (%s)'
    val = (letter_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    mydb.close()
    return(obj[0])
  except Exception as e:
    print('Error Retrieving Messages: ', e)
    mydb.close()

def getTimeStampFromLetter(letter_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    sql = 'SELECT created_at FROM PublicLetter WHERE letter_id = (%s)'
    val = (letter_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    mydb.close()
    return(obj[0])
  except Exception as e:
    print('Error Retrieving Messages: ', e)
    
    mydb.close()

# Create a Client
def create_client(client_username, client_password):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'INSERT INTO Client (client_username, client_password) VALUES (%s, %s)'
    val = (client_username, client_password)
    mycursor.execute(sql, val)
    mydb.commit()
    
    mydb.close()
    print('Success Creating Client')
  except Exception as e:
    print('Error Creating Client: ', e)
    
    mydb.close()

# Read a Client
def read_client(client_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT * FROM Client WHERE client_id = (%s)'
    val = (client_id,)
    mycursor.execute(sql,val)
    client_obj = mycursor.fetchone()
    
    mydb.close()
    print(client_obj)
  except Exception as e:
    print('Error Reading Client: ', e)
    
    mydb.close()

# Read a Client (boolean for log in / sign up)
def read_client_username(client_username):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT * FROM Client WHERE client_username = (%s)'
    val = (client_username,)
    mycursor.execute(sql,val)
    client_obj = mycursor.fetchone()
    
    
    mydb.close()
    if client_obj:
      return True
    else:
      return False
    
  except Exception as e:
    print('Error Reading Client: ', e)
    
    mydb.close()

# Check user password 
def check_client_credentials(client_username, client_password):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT * FROM Client WHERE client_username = (%s) AND client_password = (%s)'
    val = (client_username, client_password)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    
    mydb.close()
    if (obj != None) :
      print(obj)
      return True
    else :
      print("Wrong Credentials")
    return False
  except:
    
    mydb.close()
    return False

# Create a Guild
def create_guild(guild_name):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'INSERT INTO Guild (guild_name) VALUES (%s)'
    val = (guild_name, )
    mycursor.execute(sql, val)
    mydb.commit()
    print('Success Creating Guild')
    guild_id = mycursor.lastrowid
    
    mydb.close()
    return guild_id
  except Exception as e:
    print('Error Creating Guild: ', e)
    
    mydb.close()
    return False

# Create a Channel
def create_channel(guild_id, channel_name):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql_channel = 'INSERT INTO Channel (channel_name) VALUES (%s)'
    val_channel = (channel_name, )
    mycursor.execute(sql_channel, val_channel)
    mydb.commit()
    
    channel_id = mycursor.lastrowid

    sql_relation = 'INSERT INTO GuildHasChannel (guild_id, channel_id) VALUES (%s, %s)'
    val_relation = (guild_id, channel_id)
    mycursor.execute(sql_relation, val_relation)
    mydb.commit()
    
    mydb.close()
    print('Success Creating Channel')
  except Exception as e:
    print('Error Creating Channel: ', e)
    
    mydb.close()

# Verify if guild exists 
def check_guild(guild_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT * FROM Guild WHERE Guild_id = (%s)'
    val = (guild_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    
    mydb.close()
    if (obj == None):
      print("Guild Not Found")
      return False
    else:
      print(obj)
      print("Guild ",guild_id ," Found")
    return True
  except Exception as e:
    print('Error Reading Guild: ', e)
    
    mydb.close()
    return False

def delete_message2(content, created_at_str):
    from datetime import datetime, timedelta
    try:
        created_at = datetime.strptime(created_at_str, "%Y-%m-%d %H:%M")
        start_time = created_at
        end_time = created_at + timedelta(minutes=1)

        mydb = mysql.connector.connect(**config)
        mycursor = mydb.cursor()

        sql = 'DELETE FROM PublicLetter WHERE content = %s AND created_at >= %s AND created_at < %s'
        val = (content, start_time, end_time)
        print('DELETE MESSAGE', val)
        mycursor.execute(sql, val)
        mydb.commit()
        mydb.close()
        return True
    
    except Exception as e:
        print('Error Deleting Message: ', e)
        mydb.close()
        return False

def check_admin_status(guild_id, client_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT admin_status FROM GuildHasMember WHERE guild_id = (%s) AND client_id = (%s)'
    val = (guild_id, client_id)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    
    mydb.close()
    if (obj[0] == 0):
      print("User is not an admin")
      return False
    if (obj[0] == 1):
      print("User is an admin")
      return True
  except Exception as e:
    print('Error Checking Admin Status: ', e)
    
    mydb.close()
    return False

# Create a Whisper
def create_whisper(client_1, client_2):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
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
    
    mydb.close()
    print('Success Creating Whisper')
  except Exception as e:
    print('Error Creating Whisper: ', e)
    
    mydb.close()

# Get a Whisper
def get_whisper(client_1, client_2):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    # To address duplicate whispers of 1 on 1 conversions
    # I will force the oldest client to always be client_1
    # to avoid client_1 + client_2 and client_2 + client_1 creating duplicate whispers
    if client_1 < client_2:
      older = client_1
      newer = client_2
    else :
      older = client_2
      newer = client_1

    sql = 'SELECT * FROM Whisper WHERE client_1 = (%s) AND client_2 = (%s)'
    val = (older, newer)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    
    mydb.close()
    if (obj == None):
      print("Whisper does not exist")
      return -1
    else:
      print(obj)
      return obj
  except Exception as e:
    print('Error : ', e)
    
    mydb.close()

# Get all messages between two users
def get_whisperhasletter(client_1, client_2):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    # To address duplicate whispers of 1 on 1 conversions
    # I will force the oldest client to always be client_1
    # to avoid client_1 + client_2 and client_2 + client_1 creating duplicate whispers
    if client_1 < client_2:
      older = client_1
      newer = client_2
    else :
      older = client_2
      newer = client_1

    sql = 'SELECT * FROM WhisperHasLetter WHERE client_1 = (%s) AND client_2 = (%s)'
    val = (older, newer)
    mycursor.execute(sql,val)
    obj = mycursor.fetchall()
    
    mydb.close()
    if (obj != None):
      print(obj)
      return obj
    else:
      print("Whisper does not exist")
      return False
  except Exception as e:
    print('Error : ', e)
    
    mydb.close()

# Create a Public Letter
def create_public_letter(channel_id, sender_id, content):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql_letter = 'INSERT INTO PublicLetter (sender_id, content) VALUES (%s, %s)'
    val_letter = (sender_id, content)
    mycursor.execute(sql_letter, val_letter)
    mydb.commit()
    
    letter_id = mycursor.lastrowid
    
    sql_relation = 'INSERT INTO ChannelHasLetter (channel_id, letter_id) VALUES (%s, %s)'
    val_relation = (channel_id[0], letter_id)
    print(val_relation)
    mycursor.execute(sql_relation, val_relation)
    mydb.commit()
    mydb.close()
    print('Success Creating Public Letter')
  except Exception as e:
    print('Error Creating Public Letter: ', e)
    
    mydb.close()

# Create a Private Letter
# In case of Error Creating Private Letter:  1452 (23000): Cannot add or update a child row:
# a foreign key constraint fails (`Soen341`.`WhisperHasLetter`, CONSTRAINT `WhisperHasLetter_ibfk_1` FOREIGN KEY (`client_1`, `client_2`)
# REFERENCES `Whisper` (`client_1`, `client_2`) ON DELETE CASCADE)
# ^^^ MAKE SURE TO CREATE THE WHISPER (DM INSTANCE BEFOREHAND)
def create_private_letter(sender_id, receiver_id, content):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
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
    
    mydb.close()
    print('Success Creating Private Letter')
  except Exception as e:
    print('Error Creating Private Letter: ', e)
    
    mydb.close()

#Get ID from channel name
def getChannelIDFromName(channel_name):
    try:
        mydb = mysql.connector.connect(**config)
        mycursor = mydb.cursor()
        sql = 'SELECT channel_id FROM Channel WHERE channel_name = (%s)'
        val = (channel_name,)
        mycursor.execute(sql, val)
        obj = mycursor.fetchone()  # Use fetchone() since channel names should be unique
        mydb.close()
        if obj:
            return obj[0]  # Return the ID
        else:
            return None  # Return None if no matching channel found
    except Exception as e:
        print('Error Retrieving Channel ID: ', e)
        mydb.close()
        return None

# Read a Private Letter
def read_private_letter(letter_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT * FROM PrivateLetter WHERE letter_id = (%s)'
    val = (letter_id,)
    mycursor.execute(sql, val)
    private_letter_obj = mycursor.fetchone()
    
    mydb.close()
    #print("Fetched Private Letter:", private_letter_obj)
    return private_letter_obj
  except Exception as e:
    print('Error Reading Private Letter:', e)
    
    mydb.close()
    return None

# Get all users
def get_all_users():
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT client_username FROM Client'
    mycursor.execute(sql)
    users = [{"name": row[0]} for row in mycursor.fetchall()]
    
    mydb.close()
    return users
  except Exception as e:
    print(f"Error fetching users: {e}")
    
    mydb.close()

# Update user status 
def update_user_status(client_id, status):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'UPDATE Client SET client_status = (%s) WHERE client_id = (%s)'
    val = (status, client_id)
    mycursor.execute(sql, val)
    mydb.commit()
    
    mydb.close()
    print("Status updated successfully")
  except Exception as e:
    print(f"Error updating user status: {e}")
    
    mydb.close()

def fetch_user_status(client_id):
  try:
    mydb = mysql.connector.connect(**config)
    mycursor = mydb.cursor()
    
    sql = 'SELECT client_status FROM Client WHERE client_id = (%s)'
    val = (client_id,)
    mycursor.execute(sql, val)
    status = mycursor.fetchone()
    
    mydb.close()
    return status[0]
  except Exception as e:
    print(f"Error fetching user status: {e}") 
    
    mydb.close()