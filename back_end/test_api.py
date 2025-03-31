from api import *

channelID = getChannelIDFromName("Salam Alaikum")

if (channelID == 52):
    
    print("function \"getChannelIDFromName\" is working")

clientID = get_client_id("DerekIsASigma")

if (clientID == 11):
    
    print("function \"get_client_id\" is working")

clientName = get_client_name(11)

if (clientName == "DerekIsASigma"):
    
    print("function \"get_client_name\" is working")