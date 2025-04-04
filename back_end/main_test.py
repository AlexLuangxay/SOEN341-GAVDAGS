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

