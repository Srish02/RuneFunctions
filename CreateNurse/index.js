const nurseService = require("../services/nurseService");

module.exports = async function (context, req) {
  let response;
  console.log(context);
  console.log(req);

  try {
    const nurse = await nurseService.create(req.body);
    response = { body: nurse, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};
