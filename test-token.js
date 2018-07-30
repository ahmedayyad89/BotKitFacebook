

require('dotenv').load();

var watson = require('watson-developer-cloud');
 
// to get an IAM Access Token
var authorization = new watson.AuthorizationV1({
    url: process.env.ASSISTANT_URL,
    iam_apikey: process.env.ASSISTANT_IAM_APIKEY,
});
 
authorization.getToken(function (err, token) {
  if (!token) {
    console.log('error:', err);
  } else {
    console.log(token);
  }
});