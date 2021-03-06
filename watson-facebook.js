//------------------------------------------------------------------------------
// Copyright IBM Corp. 2017
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------

var Botkit = require('botkit');
// require('dotenv').load();
var sharedCode = require('./handleWatsonResponse.js')();

var AssistantV1 = require('watson-developer-cloud/assistant/v1');
// console.log('process.env.ASSISTANT_IAM_APIKEY:'+process.env.ASSISTANT_IAM_APIKEY);
var assistant = new AssistantV1({
    url: process.env.ASSISTANT_URL,
    iam_apikey: process.env.ASSISTANT_IAM_APIKEY,
  version: '2018-02-16'
});

var controller = Botkit.facebookbot({
    debug: true,
    log: true,
    // hostname: process.env.ORANGE_PIZZA_SERVICE_HOST,
    access_token: process.env.FACEBOOK_PAGE_TOKEN,
    verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
    app_secret: process.env.FACEBOOK_APP_SECRET,
    validate_requests: true
});

var bot = controller.spawn({
});

controller.setupWebserver(process.env.OPENSHIFT_NODEJS_PORT || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
    });
});

controller.api.messenger_profile.greeting('Hello');
controller.api.messenger_profile.get_started('Hello');
var conversations = [];
controller.on('message_received', function (bot, message) {
    console.log(message);
if(conversations[message.user]){
      assistant.message(
        {
          input: { text: message.text },
          workspace_id: process.env.WORKSPACE_ID,
          context:  conversations[message.user]
        },
        function(err, response) {
          if (err) {
            console.error(err);
            bot.reply(message, "I'm sorry, but for technical reasons I can't respond to your message");
          } else {
            conversations[message.user] = response.context;
            sharedCode.handleWatsonResponse(bot, message, response);
          }
        }
      );
    }else{
      assistant.message(
        {
          input: { text: message.text },
          workspace_id: process.env.WORKSPACE_ID
        },
        function(err, response) {
          if (err) {
            console.error(err);
            bot.reply(message, "I'm sorry, but for technical reasons I can't respond to your message");
          } else {
           conversations[message.user] = response.context;
            sharedCode.handleWatsonResponse(bot, message, response);
          }
        }
      );
    }
    
   
});