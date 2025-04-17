import json
from main import app  # Assuming 'app' is defined in main.py
from api import *

print("Test case 6: /channels from main.py")
print("Input: DKUQ")
print("Expected Output: list of channels")
group = "DKUQ"

guild_id = get_guild_id(group)
print(f"Step 1 - Guild ID for group '{group}': {guild_id}")

channel_ids = getChannelFromGuild(guild_id)
print(f"Step 2 - Channel IDs from guild '{guild_id}': {channel_ids}")

# Extract channel IDs
if isinstance(channel_ids, list):
    channel_ids = [channel_id[1] for channel_id in channel_ids]
print(f"Step 3 - Extracted Channel IDs: {channel_ids}")

# Get channel names from IDs
channels = [getChannelFromID(channel_id) for channel_id in channel_ids]
print(f"Step 4 - Retrieved Channels: {channels}")

# Flatten channel names
flat_channels = []
for channel in channels:
    if isinstance(channel, list) and len(channel) > 0:
        flat_channels.append(channel[0][0])
print(f"Step 5 - Flattened Channel Names: {flat_channels}")

# Final expected output
print(f"Final Output: {flat_channels}")
print("Test case 6 passed\n")



print("Test case 7: /getchannelmessages from main.py")
print("Input: Salam Alaikum")
print("Expected Output: list of messages")
# Simulated input
channel_name = "Salam Alaikum"

# Step 1: Get channel ID
channel_id = getChannelIDFromName(channel_name)
print(f"Step 1 - Channel ID for '{channel_name}': {channel_id}")

# Step 2: Get messages from the channel
message_data = getLetterFromChannel(channel_id)
print(f"Step 2 - Messages from channel")

# Step 3: Process messages
letter_data = []
for item in message_data:
    message_id = item[1]
    message_text = getMessageFromLetter(message_id)
    user_name = get_client_name(getSenderFromLetter(message_id))
    timestamp = getTimeStampFromLetter(message_id).isoformat(timespec='minutes').replace('T', ' ')

    letter_data.append({
        'message': message_text,
        'user': user_name,
        'timestamp': timestamp
    })

print(f"Step 3 - Processed Messages")

# Final expected output
print(f"Final Output: {letter_data}")
print("Test case 7 passed\n")



print("Test case 8: /get_group_members from main.py")
print("Input: group = '325'")
print("Expected Output: list of group members from DKUQ")

# Simulated input
group_id = "325"

# Step 1: Validate input
if not group_id:
    print("Step 1 - Error: Guild ID is required")
    print("Test case 8 failed\n")
else:
    print(f"Step 1 - Guild ID received: {group_id}")

# Step 2: Actual DB call using imported function
try:
    members = getUserFromGuild(group_id)
    print(f"Step 2 - Members fetched from DB: {members}")

    # Step 3: Check and format response
    if members:
        response = members
        print("Step 3 - Members found and returned")
    else:
        response = {"message": "No members found"}
        print("Step 3 - No members found")

    print(f"Final Output: {response}")
    print("Test case 8 passed\n")

except Exception as e:
    print(f"Error during test case 8: {e}")
    print("Test case 8 failed\n")



print("Test case 9: /get_user_groups from main.py")
print("Input: session user = 'DerekIsASigma'")
print("Expected Output: list of group names")

# Simulated session
session = {"user": "DerekIsASigma"}

# Step 1: Get username from session
username = session.get("user")
print(f"Step 1 - Username from session: {username}")

# Step 2: Get client ID from username
try:
    client_id = get_client_id(username)
    print(f"Step 2 - Client ID for '{username}': {client_id}")

    # Step 3: Get groups from DB
    groups = getGuildFromMember(client_id)
    print(f"Step 3 - Group IDs from DB: {groups}")

    # Step 4: Check and process
    if not groups:
        response = []
        print("Step 4 - No groups found, returning empty list")
    else:
        group_ids = [group[0] for group in groups]
        group_names = [get_guild_name(group_id) for group_id in group_ids]
        response = group_names
        print("Step 4 - Group names resolved:", group_names)

    print(f"Final Output: {response}")
    print("Test case 9 passed\n")

except Exception as e:
    print(f"Error during test case 9: {e}")
    print("Test case 9 failed\n")



print("Test case 10: /users from main.py")
print("Input: session user = 'DerekIsASigma'")
print("Expected Output: list of users excluding 'john_doe'")

# Simulated session
session = {"user": "DerekIsASigma"}

# Step 1: Get current session user
current_user = session.get("user")
print(f"Step 1 - Logged-in user from session: {current_user}")

# Step 2: Get all users from DB
try:
    users = get_all_users()
    print(f"Step 2 - All users fetched from DB: {users}")

    # Step 3: Filter out the current user
    filtered_users = [user for user in users if user["name"] != current_user]
    print("Step 3 - Filtered users:", filtered_users)

    # Final Output
    print(f"Final Output: {filtered_users}")
    print("Test case 10 passed\n")

except Exception as e:
    print(f"Error during test case 10: {e}")
    print("Test case 10 failed\n")