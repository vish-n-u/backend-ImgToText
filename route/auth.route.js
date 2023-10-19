const authController = require("../controller/auth.controller")
const authValidation = require("../validation/auth.validation");

const authRoute = (app) => {
  console.log("reached here")
  app.post("/imgToText/api/v1/register",
[authValidation.registrationValidation],
    authController.registration
  );
  app.post(
    "/imgToText/api/v1/login",
    [authValidation.validateLogin],
    authController.login
  );
  
};

module.exports = authRoute;