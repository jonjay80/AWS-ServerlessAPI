const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const bcrypt = require("bcryptjs");
const auth = require("../utils/auth");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = "jjay-test";

const login = async (user) => {
  const username = user.username;
  const password = user.password;
  if (!user || !username || !password) {
    return util.buildResponse(401, {
      message: "Username and Password are required.",
    });
  }

  const dynamoUser = await getUser(username.toLowerCase().trim());
  if (!dynamoUser || !dynamoUser.username) {
    return util.buildResponse(403, {
      message: "User does not exist.",
    });
  }

  if (!bcrypt.compareSync(password, dynamoUser.password)) {
    return util.buildResponse(403, {
      message: "Password is incorrect.",
    });
  }

  const userInfo = {
    username: dynamoUser.username,
    name: dynamoUser.name,
  };

  const token = auth.generateToken(userInfo);
  const response = {
    user: userInfo,
    token: token,
  };

  return util.buildResponse(200, response);
};

const getUser = async (username) => {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
  };

  return await dynamodb
    .get(params)
    .promise()
    .then(
      (response) => {
        return response.Item;
      },
      (error) => {
        console.error("There is an error: ", error);
      }
    );
};

module.exports.login = login;