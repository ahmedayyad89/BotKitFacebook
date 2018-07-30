


require('dotenv').load();

var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var assistant = new AssistantV1({
    url: process.env.ASSISTANT_URL,
    iam_apikey: process.env.ASSISTANT_IAM_APIKEY,

  version: '2018-02-16'
});

assistant.message(
  {
    input: { text: "Hello" },
    workspace_id: process.env.WORKSPACE_ID
  },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);