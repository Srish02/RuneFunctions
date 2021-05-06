const { CosmosClient } = require("@azure/cosmos");
const { v4: uuidv4 } = require('uuid');

// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const eventsService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("TestDatabase");
      this.container = this.database.container("PatientEvents");
    } catch (err) {
      console.log(err.message);
    }
  },
  async create(event) {
    const IdEvent = uuidv4();
    
    // check for invalid fields
    if ("id" in event || "IdEvent" in event) {
      throw Error("Cannot specify id or IdEvent; the id will be randomly generated for you.");
    }
    if ("CreatedAt" in event) {
      throw Error("Cannot specify CreatedAt; this field will be generated for you.")
    }

    const newItem = {
      ...event,
      id: IdEvent,
      IdEvent: IdEvent,
      CreatedAt: (new Date()).toISOString(),
    };
    const { resource } = await this.container.items.create(newItem);
    return resource;
  },
};

eventsService.init();

module.exports = eventsService;
