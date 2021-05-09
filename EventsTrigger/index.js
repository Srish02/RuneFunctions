const axios = require('axios');
const patientsService = require("../services/patientsService");

module.exports = async function (context, documents) {
    console.log(context);
    console.log(documents);

    const errors = [];

    for (const document of documents) {
        if (document.EventType === "BloodworkAdded") {
            // notify a patient that they have new test results
            const IdPatient = document.IdPatient;
            if (!IdPatient) {
                errors.push("BloodworkAdded event is missing the IdPatient field.")
                continue;
            }

            const patientData = await patientsService.read(IdPatient);
            const patient = JSON.parse(patientData);
            if (!patient.ExpoNotificationToken) {
                errors.push(`ExpoNotificationToken field is missing from patient id: ${patient.id}`);
                continue;
            }
            await axios.post('https://exp.host/--/api/v2/push/send', {
                "to": patient.ExpoNotificationToken,
                "title": "Rune Health Notification",
                "body": "You have new test results waiting for you."
            }).then(function (response) {
                console.log(response)
            }).catch(function (error) {
                console.log(error)
            });
        }
    }

    if (errors.length > 0) {
        throw new Error(errors.join('\n'));
    }
}
