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

# Get guild id from username
def get_guild_id(guild_name):
  try:
    sql = 'SELECT * FROM Guild WHERE guild_name = (%s)'
    val = (guild_name,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    guild_id = obj[0]
    print(guild_id)
    return(guild_id)
  except Exception as e:
    print('Error Retrieving Guild ID: ', e)

# Get client id from username
def get_client_id(client_username):
  try:
    sql = 'SELECT client_id FROM Client WHERE client_username = (%s)'
    val = (client_username,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    client_id = obj[0]
    #print(client_id)
    return(client_id)
  except Exception as e:
    print('Error Retrieving Client ID: ', e)
# Test vvv    
# get_client_id("Anthony")
# get_client_id("Gur")
# get_client_id("Simon11123223")

#get client username from ID
def get_client_name(client_id):
  try:
    sql = 'SELECT client_username FROM Client WHERE client_id = (%s)'
    val = (client_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    #print("obj: ", obj)
    client_username = obj[0]
    #print(client_username)
    return(client_username)
  except Exception as e:
    print('Error Retrieving Client ID: ', e)

# Add Member to Guild
def addGuildMember(guild_id, client_id, admin_status):
  try:
    sql = 'INSERT INTO GuildHasMember (guild_id, client_id, admin_status) VALUES (%s, %s, %s)'
    val = (guild_id, client_id, admin_status)
    mycursor.execute(sql, val)
    mydb.commit()
    print('Success Joining Guild as Admin')
  except Exception as e:
    print('Error Joining Guild: ', e)

#addGuildMember(4, 5, 0)
#addGuildMember(5, 6, 1)
#addGuildMember(7, 8, 0)


# Get all servers a user is in
def getGuildFromMember(client_id):
  try:
    sql = 'SELECT * FROM GuildHasMember WHERE client_id = (%s)'
    val = (client_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchall()
    print(obj)
  except Exception as e:
    print('Error Retrieving Guilds: ', e)
# Test vvv
#for x in range(10):
#  getGuildFromMember(x)

# Get all channels a server has
def getChannelFromGuild(guild_id):
  try:
    sql = 'SELECT * FROM GuildHasChannel WHERE guild_id = (%s)'
    val = (guild_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchall()
    print('list ', obj)
    return obj
  except Exception as e:
    print('Error Retrieving Channels: ', e)
# Test vvv
#for x in range(10):
#  getChannelFromGuild(x)

#Get channel name from its id
def getChannelFromID(channel_id):
  try:
    sql = 'SELECT channel_name FROM Channel WHERE channel_id = (%s)'
    val = (channel_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchall()
    print(obj)
    return obj
  except Exception as e:
    print('Error Retrieving Channels: ', e)

# Get all users a server has
def getUserFromGuild (guild_id):
  try:
    sql = 'SELECT Client.client_username FROM GuildHasMember JOIN Client ON GuildHasMember.client_id = Client.client_id WHERE GuildHasMember.guild_id = (%s)'
    val = (guild_id,)
    mycursor.execute(sql,val)
    users = mycursor.fetchall()
    return users
  except Exception as e:
    print('Error Retrieving Users: ', e)

# Get all messages within a channel
def getLetterFromChannel(channel_id):
  try:
    sql = 'SELECT * FROM ChannelHasLetter WHERE channel_id = (%s)'
    val = (channel_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchall()
    print(obj)
  except Exception as e:
    print('Error Retrieving Messages: ', e)
# Test vvv
#for x in range(10):
#  getLetterFromChannel(x)

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

# Read a Client
def read_client(client_id):
  try:
    sql = 'SELECT * FROM Client WHERE client_id = (%s)'
    val = (client_id,)
    mycursor.execute(sql,val)
    client_obj = mycursor.fetchone()
    print(client_obj)
  except Exception as e:
    print('Error Reading Client: ', e)
# Test vvv
#for x in range(10):
#  read_client(x)

# Read a Client (boolean for log in / sign up)
def read_client_username(client_username):
  try:
    sql = 'SELECT * FROM Client WHERE client_username = (%s)'
    val = (client_username,)
    mycursor.execute(sql,val)
    client_obj = mycursor.fetchone()
    
    if client_obj:
      return True
    else:
      return False
    
  except Exception as e:
    print('Error Reading Client: ', e)

# Check user password 
def check_client_credentials(client_username, client_password):
    try:
      sql = 'SELECT * FROM Client WHERE client_username = (%s) AND client_password = (%s)'
      val = (client_username, client_password)
      mycursor.execute(sql,val)
      obj = mycursor.fetchone()
      if (obj != None) :
        print(obj)
        return True
      else :
        print("Wrong Credentials")
      return False
    except:
      return False
"""
check_client_credentials('Anthony', 'anthony')
check_client_credentials('Anthony', 'bob')
check_client_credentials('Gur', 'anthony')
check_client_credentials('Gur', 'gur')
check_client_credentials('Derek', 'gur')
check_client_credentials('Derek', 'derek')"
"""

# Create a Guild
def create_guild(guild_name):
  try:
    sql = 'INSERT INTO Guild (guild_name) VALUES (%s)'
    val = (guild_name, )
    mycursor.execute(sql, val)
    mydb.commit()
    print('Success Creating Guild')
    guild_id = mycursor.lastrowid
    return guild_id
  except Exception as e:
    print('Error Creating Guild: ', e)
    return False
# Test vvv
# create_guild('New Guild')

# Read a Guild
def read_guild(guild_id):
  try:
    sql = 'SELECT * FROM Guild WHERE Guild_id = (%s)'
    val = (guild_id,)
    mycursor.execute(sql,val)
    guild_obj = mycursor.fetchone()
    if (guild_obj == None):
      print("Guild does not exist")
    else:
      print(guild_obj)
  except Exception as e:
    print('Error Reading Guild: ', e)
# Test vvv
# for x in range(10):
#   read_guild(x)

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

# Read a Guild
def read_guild(guild_id):
  try:
    sql = 'SELECT * FROM Guild WHERE Guild_id = (%s)'
    val = (guild_id,)
    mycursor.execute(sql,val)
    guild_obj = mycursor.fetchone()
    print(guild_obj)
  except Exception as e:
    print('Error Reading Guild: ', e)
# Test vvv
#for x in range(7):
# read_guild(x)
#See all guilds
def read_all_guild():
  try:
    sql = 'SELECT * FROM Guild'
    mycursor.execute(sql)
    guild_obj = mycursor.fetchall()
    print('all: ', guild_obj)
  except Exception as e:
    print('Error Reading Guild: ', e)

#read_all_guild()

# Verify if guild exists 
def check_guild(guild_id):
  try:
    sql = 'SELECT * FROM Guild WHERE Guild_id = (%s)'
    val = (guild_id,)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    if (obj == None):
      print("Guild Not Found")
      return False
    else:
      print(obj)
      print("Guild ",guild_id ," Found")
    return True
  except Exception as e:
    print('Error Reading Guild: ', e)
    return False
#for x in range(20):
# check_guild(x)

# Update Guild Name
def update_guild(guild_id, guild_name):
  try:
    sql = 'UPDATE Guild SET guild_name = (%s) WHERE guild_id = (%s)'
    val = (guild_name, guild_id)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    print(obj)
  except Exception as e:
    print('Error Updating Guild Name: ', e)

# Add new messages to user DM

# Update Guild Admin Status
def update_guild(guild_id, client_id, admin_status):
  try:
    sql = 'UPDATE GuildHasMember SET admin_status = (%s) WHERE guild_id = (%s) AND client_id = (%s)'
    val = (admin_status, guild_id, client_id)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    print(obj)
  except Exception as e:
    print('Error Updating Guild Member Admin Status: ', e)

def check_admin_status(guild_id, client_id):
  try:
    sql = 'SELECT admin_status FROM GuildHasMember WHERE guild_id = (%s) AND client_id = (%s)'
    val = (guild_id, client_id)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    if (obj == 0):
      print("User is not an admin")
      return False
    if (obj == 1):
      print("User is an admin")
      return True
  except Exception as e:
    print('Error Checking Admin Status: ', e)
    return False
#for x in range(20):
# check_guild(x)

# Delete Guild Member
def delete_guild_member(guild_id, client_id):
  try:
    sql = 'DELETE FROM GuildHasMember WHERE guild_id = (%s) AND client_id = (%s)'
    val = (guild_id, client_id)
    mycursor.execute(sql,val)
    mydb.commit()
  except Exception as e:
    print('Error Updating Guild Member Admin Status: ', e)

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
create_whisper(1, 11)

# Read a Whisper
def read_whisper(client_1, client_2):
  try:
    sql = 'SELECT * FROM Whisper WHERE client_1 = (%s) AND client_2 = (%s)'
    val = (client_1, client_2)
    mycursor.execute(sql,val)
    whisper_obj = mycursor.fetchone()
    print(whisper_obj)
  except Exception as e:
    print('Error Reading Whisper: ', e)
# Test vvv
#read_whisper(1, 3)

# Get a Whisper
def get_whisper(client_1, client_2):
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

    sql = 'SELECT * FROM Whisper WHERE client_1 = (%s) AND client_2 = (%s)'
    val = (older, newer)
    mycursor.execute(sql,val)
    obj = mycursor.fetchone()
    if (obj == None):
      print("Whisper does not exist")
      return -1
    else:
      print(obj)
      return obj
  except Exception as e:
    print('Error : ', e)
#get_whisper(1,2)
#get_whisper(1,3)
#get_whisper(2,3)
#get_whisper(1,5)

# Get all messages between two users
def get_whisperhasletter(client_1, client_2):
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

    sql = 'SELECT * FROM WhisperHasLetter WHERE client_1 = (%s) AND client_2 = (%s)'
    val = (older, newer)
    mycursor.execute(sql,val)
    obj = mycursor.fetchall()
    if (obj != None):
      print(obj)
      return obj
    else:
      print("Whisper does not exist")
      return False
  except Exception as e:
    print('Error : ', e)
#get_whisperhasletter(1,2)
#get_whisperhasletter(1,3)
#get_whisperhasletter(2,3)
#get_whisperhasletter(1,5)

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

# Read a Public Letter
def read_public_letter(letter_id):
  try:
    sql = 'SELECT * FROM PublicLetter WHERE letter_id = (%s)'
    val = (letter_id,)
    mycursor.execute(sql,val)
    public_letter_obj = mycursor.fetchone()
    print(public_letter_obj)
  except Exception as e:
    print('Error Reading Public Letter: ', e)
# Test vvv
#for x in range(20):
#  read_public_letter(x)

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
#create_private_letter(1, 11, 'Random Message For Derrek')

# Read a Private Letter
def read_private_letter(letter_id):
    try:
        sql = 'SELECT * FROM PrivateLetter WHERE letter_id = (%s)'
        val = (letter_id,)
        mycursor.execute(sql, val)
        private_letter_obj = mycursor.fetchone()
        #print("Fetched Private Letter:", private_letter_obj)
        return private_letter_obj
    except Exception as e:
        print('Error Reading Private Letter:', e)
        return None
# Test vvv
#for x in range(20):
#  read_private_letter(x)

def get_all_users():
    try:
        sql = 'SELECT client_username FROM Client'
        mycursor.execute(sql)
        users = [{"name": row[0]} for row in mycursor.fetchall()]
        return users
    except Exception as e:
        print(f"Error fetching users: {e}")
        
        


  # Get guild members and their role
def get_guild_members(guild_id):
    try:
        sql = 'SELECT client_id, admin_status FROM GuildHasMember WHERE guild_id = (%s)'
        val = (guild_id,)
        mycursor.execute(sql, val)
        members = mycursor.fetchall()
        return members
    except Exception as e:
        print(f"Error fetching guild members: {e}")
        
        
        