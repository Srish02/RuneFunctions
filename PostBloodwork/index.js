const eventsService = require("../services/eventsService");
const testResultsService = require("../services/testResultsService");

module.exports = async function (context, req) {
  let response;

  try {
    // obtain the patient's ID from the request URL
    const IdPatient = req.params.id;

    // put the bloodwork test results in the TestResults table -- this is random data as proof of concept
    const bloodworkData = await testResultsService.createBloodwork(req.body);
    const date = Date.parse(bloodworkData.CreatedAt);
    const month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date);
    const day = new Intl.DateTimeFormat('en-US', {day: 'numeric'}).format(date);

    // add an event referencing the bloodwork data
    const event = await eventsService.create({
      IdPatient: IdPatient,
      EventType: "BloodworkAdded",
      Description: `Bloodwork from ${month} ${day} has been posted.`,
      IdTestResult: bloodworkData.IdBloodTest,
    });

    // return the bloodwork data
    response = { body: bloodworkData, status: 200 };
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};
