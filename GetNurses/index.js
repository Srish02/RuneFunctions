const nurseService = require("../services/nurseService");

module.exports = async function (context, req) {
  let response;

  try {
    const nurses = await nurseService.readAll();
    response = { body: nurses, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};
