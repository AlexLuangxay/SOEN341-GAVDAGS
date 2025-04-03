from api import *

print("Test case 1.1: getChannelIDFromName")
print("Input: Salam Alaikum")
print("Expected Output: 52")
channelID = getChannelIDFromName("Salam Alaikum")
print("Actual Output: " + str(channelID))
if (channelID == 52):
    print("Test case 1.1 passed\n")
else:
    print("Test case 1.1 failed\n")

print("Test case 1.2: getChannelIDFromName")
print("Input: Salam Alaikum123")
print("Expected Output: None")
nullChannelID = getChannelIDFromName("Salam Alaikum123")
print("Actual Output: " + str(nullChannelID))
if (nullChannelID == None):
    print("Test case 1.2 passed\n")
else:
    print("Test case 1.2 failed\n")

print("Test case 2.1: get_client_id")
print("Input: DerekIsASigma")
print("Expected Output: 11")
clientID = get_client_id("DerekIsASigma")
print("Actual Output: " + str(clientID))
if (clientID == 11):
    print("Test case 2.1 passed\n")
else:
    print("Test case 2.1 failed\n")
    
print("Test case 2.2: get_client_id")
print("Input: DerekIsASigma123")
print("Expected Output: None")
nullClientID = get_client_id("DerekIsASigma123")
print("Actual Output: " + str(nullClientID))
if (nullClientID == None):
    print("Test case 2.2 passed\n")
else:
    print("Test case 2.2 failed\n")


print("Test case 3.1: get_client_name")
print("Input: 11")
print("Expected Output: DerekIsASigma")
clientName = get_client_name(11)
print("Actual Output: " + str(clientName))
if (clientName == "DerekIsASigma"):
    print("Test case 3.1 passed\n")
else:
    print("Test case 3.1 failed\n")


print("Test case 3.2: get_client_name")
print("Input: 123")
print("Expected Output: None")
nullClientName = get_client_name(123)
print("Actual Output: " + str(nullClientName))
if (nullClientName == None):
    print("Test case 3.2 passed\n")
else:
    print("Test case 3.2 failed\n")
