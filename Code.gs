/**
 * Description: Head Deployment
   Deployment ID: "....................."
   


 * Responds to a MESSAGE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */

var DEFAULT_IMAGE_URL = 'https://goo.gl/bMqzYS';
var HEADER = {
  header: {
    title : 'AutoBot',
    subtitle : 'Please enter only number',
    imageUrl : DEFAULT_IMAGE_URL
  }
};

/**
 * Creates a card-formatted response.
 * @param {object} widgets the UI components to send
 * @return {object} JSON-formatted response
 */
function createCardResponse(widgets) {
  return {
    cards: [HEADER, {
      sections: [{
        widgets: widgets
      }]
    }]
  };
}

/**
 * Responds to a MESSAGE event triggered
 * in Hangouts Chat.
 *
 * @param event the event object from Hangouts Chat
 * @return JSON-formatted response
 */
function onMessage(event) {
  var name = event.user.displayName;
  var userMessage = event.message.text;
  var loweruserMessage = userMessage.toLowerCase();
  switch (loweruserMessage)  {
        case "1":
             var widgets = [{
                 "textParagraph": {
                 "text": "1. Option1<br>To confirm, type 'Confirm 1'><br>Else, type 'Quit'"
                 }
                }];
            break;
        case "2":
             var widgets = [{
                 "textParagraph": {
                 "text": "2. Option2<br>To confirm, type 'Confirm 2'><br>Else, type 'Quit'"
                 }
                }];
            break;
        case "3":
             var widgets = [{
                 "textParagraph": {
                 "text": "3. Option3<br>To confirm, type 'Confirm 3'><br>Else, type 'Quit'"
                 }
                }];
            break;
        case "confirm 1":
             var widgets = [{
                 "textParagraph": {
                 "text": "Your request for 'Option 1' has been successfully processed.<br><br>Thank you for talking to me!"
                 }
                }];
            break;
        case "confirm 2":
             var widgets = [{
                 "textParagraph": {
                 "text": "Your request for 'Option 2' has been successfully processed.<br><br>Thank you for talking to me!"
                 }
                }];
            break;
        case "confirm 3":
             var widgets = [{
                 "textParagraph": {
                 "text": "Your request for 'Option 3' has been successfully processed.<br><br>Thank you for talking to me!"
                 }
                }];
            break;
           default:
              var widgets = [{
                 "textParagraph": {
                 "text": "1. Option1<br>2. Option2<br>3. Option3<br>Hi " + name
                 }
                }];
            break;
    }
  
  writeToSheet(name, userMessage);
  return createCardResponse(widgets);
}

function writeToSheet(name, userMessage){
   var sheet = SpreadsheetApp.openById("enter_spreadsheet_ID").getSheetByName("enter_sheet_name");
   var date = Utilities.formatDate(new Date(), "GMT+5:30", "MM-dd-yyyy HH:mm:ss");
   sheet.appendRow([date, name, userMessage]);
  }

/*
function onMessage(event) {
  var name = "";

  if (event.space.type == "DM") {
    name = "You";
  } else {
    name = event.user.displayName;
  }
  var message = name + " said \"" + event.message.text + "\"";

  return { "text": message };
}

*/

/**
 * Responds to an ADDED_TO_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onAddToSpace(event) {
  var message = "";

  if (event.space.type == "DM") {
    message = "Thank you for adding me to a DM, " + event.user.displayName + "!";
  } else {
    message = "Thank you for adding me to " + event.space.displayName;
  }

  if (event.message) {
    // Bot added through @mention.
    message = message + " and you said: \"" + event.message.text + "\"";
  }

  return { "text": message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onRemoveFromSpace(event) {
  console.info("Bot removed from ", event.space.name);
}



var PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\.............\n-----END PRIVATE KEY-----\n";
var CLIENT_EMAIL = '.....................';
/**
 * Configures the Chatbot service.
 */
function getChatbotService() {
 return OAuth2.createService("Autobot")
 // Set the endpoint URL.
 .setTokenUrl("https://accounts.google.com/o/oauth2/token")
// Set the private key and issuer.
 .setPrivateKey(PRIVATE_KEY)
 .setIssuer(CLIENT_EMAIL)
// Set the property store where authorized tokens should be persisted.
 .setPropertyStore(PropertiesService.getScriptProperties())
// Set the scope.
 .setScope("https://www.googleapis.com/auth/chat.bot");
}

/**
 * Test for getting access token
 */
function getAccessTokenTest() {
  var service = getChatbotService();
  if (service.hasAccess()) {
    Logger.log(service.getAccessToken());
  } else {
    Logger.log(service.getLastError());
  }
}






/**
 * Authorizes and makes a request to the Hangouts Chat API for :
 * - Getting all spaces the bot is installed
 * - Sending message when space is a Direct Message space
 * - Run this function from apps script project to send messages to whoever installed the bot
 */
function sendPushMessage() {
  var service = getChatbotService();
  if (service.hasAccess()) {
    //WE retrieve all the spaces bot has been added
    var url = 'https://chat.googleapis.com/v1/spaces';
    var response = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: 'Bearer ' + service.getAccessToken()
      }
    });
    var rep = JSON.parse(response.getContentText());
    if(rep.spaces && rep.spaces.length > 0){
      for(var i = 0; i < rep.spaces.length; i++) {
        var space = rep.spaces[i];
        if(space.type == "DM"){
          //We send message only to Direct Message room.
          var url = 'https://chat.googleapis.com/v1/'+space.name+'/messages';
          //Logger.log(space.name);
          var options = {
            method : 'POST',
            contentType: 'application/json',
            headers: {
              Authorization: 'Bearer ' + service.getAccessToken()
            },
            payload : JSON.stringify({ text: "Hello Sourabh ! There has been a new process update." })//Customizable message that the users receieve
          }
          
          //We send message to the DM room
          UrlFetchApp.fetch(url, options);
        }else{
          //If Type is 'ROOM' or 'TYPE_UNSPECIFIED' we don't send notification.
        }
      }
    }else{
      Logger.log('Bot is not added to any spaces');
    }
  } else {
    Logger.log(service.getLastError());
  }
}

