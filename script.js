var chatText = document.getElementById("enterChat");
var displayText = document.getElementById("displayChat");
var completeChat = "";
var hashOfWords = new Map();
const fiveMinuesInMilliSeconds = 300000;

const ChatClient = {
    sendMessage: function() {
      completeChat += "<br>" + "<br>" + "Top 10 Words are:" + "<br>";

      var count = 1;
      for (var [key, value] of hashOfWords) 
      {
        completeChat += (key + ' = ' + value) + ", ";
        count++;
        if(count > 10)
          {
            break;
          }
      }

      displayText.innerHTML = completeChat;
  },
  onReceiveMessage: function(event) {
  var key = event.key;
    if (key == 'Enter') {
      console.log(hashOfWords);
      var chatTextValue = String(chatText.value).trim().split(":")[1];
      completeChat += "<br>" + chatText.value;
      displayText.innerHTML = completeChat;
      document.getElementById("enterChat").value = "";
      
      var wordsFromLatestChat = chatTextValue.trim().split(/\s+/);
      // console.log(wordsFromLatestChat);
      
      updateHash(wordsFromLatestChat);
      hashOfWords = getSortedKeys();
    }
}
};

setInterval(function(){ ChatClient.sendMessage() }, fiveMinuesInMilliSeconds);
chatText.addEventListener('keydown', (event) => { ChatClient.onReceiveMessage(event);
                                                });

function updateHash(wordsFromLatestChat)
{
  for(i = 0; i < wordsFromLatestChat.length; i++)
  {
    var word = wordsFromLatestChat[i]
    console.log("Word being parsed " + word);
    
    if(hashOfWords.has(word))
      {
        var wordCount = parseInt(hashOfWords.get(word));
        hashOfWords.set(word, wordCount + 1);
        // console.log(word + " exists in hash " + "value: " + wordCount);
      }
    else
      {
        hashOfWords.set(word, 1);        
        //console.log(word + " not present in hash. " + "setting value: " + hashOfWords.get(word));
      }
  }
}

function getSortedKeys() {
    return new Map([...hashOfWords.entries()].sort((a, b) => b[1] - a[1]));
}