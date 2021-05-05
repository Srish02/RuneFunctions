const patientsService = require("../services/patientsService");

module.exports = async function (context, req) {
  let response;
  // console.log(context);
  console.log(req);
  try {
    const id = req.params.id;

    const patient = await patientsService.update(id, req.body);
    response = { body: patient, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};
