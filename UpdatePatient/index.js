const patientsService = require("../services/patientsService");

module.exports = async function (context, req) {
  let response;
  console.log(context);
  console.log(req);
  try {
    const patients = await patientsService.update(req.body);
    response = { body: patients, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};
