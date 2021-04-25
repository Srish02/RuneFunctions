const patientsService = require("../services/patientsService");

module.exports = async function (context, req) {
  let response;

  try {
    const id = req.params.id;
    const patient = await patientsService.read(id);
    response = { body: patient, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};
