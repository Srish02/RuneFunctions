const patientsService = require("../services/patientsService");

module.exports = async function (context, req) {
  let response;

  try {
    const patients = await patientsService.readAll();
    response = { body: patients, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};
