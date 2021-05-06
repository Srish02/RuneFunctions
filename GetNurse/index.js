const nurseService = require("../services/nurseService");

module.exports = async function (context, req) {
  let response;

  try {
    const id = req.params.id;
    const nurse = await nurseService.read(id);
    response = { body: nurse, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};
