const patientsService = require("../services/patientsService");

module.exports = async function (context, req) {
  let response;

  try {
    const id = req.query.id;
    const patient = await patientsService.create(id);
    response = { body: patient, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};
