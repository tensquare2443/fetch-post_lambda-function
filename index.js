/*
CLI push command:
aws lambda update-function-code --function-name ENTER_FUNCTION_NAME_HERE --zip-file fileb://function.zip
*/

var rp = require("request-promise");
const wpSiteLocation = process.env.wpSiteLocation;

exports.handler = async event => {
  const headers = {
    "Access-Control-Allow-Origin": "*"
  };

  const postId = event.headers["post-id"];

  return rp(`${wpSiteLocation}/wp-json/wp/v2/posts/${postId}`)
    .then(json => {
      const response = {
        statusCode: 200,
        body: json,
        headers
      };

      return response;
    })
    .catch(err => {
      const error = {
        statusCode: 500,
        body: "Server Error",
        headers
      };

      return error;
    });
};
