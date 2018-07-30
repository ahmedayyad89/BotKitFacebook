
require('dotenv').load();
var DiscoveryV1 = require('watson-developer-cloud/conversation/v1');

const discovery = new DiscoveryV1({
    
    url: process.env.ASSISTANT_URL,
    // url: process.env.CONVERSATION_URL,
    api_key: process.env.ASSISTANT_IAM_APIKEY,
    workspace_id: process.env.WORKSPACE_ID,
    version: '2018-07-14',
    iam_url: 'https://iam.bluemix.net/identity/token', // optional - the default value is https://iam.bluemix.net/identity/token
  });

  console.log(discovery);