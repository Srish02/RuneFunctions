const { CosmosClient } = require("@azure/cosmos");

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const patientsService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("TestDatabase");
      this.container = this.database.container("Patient");
    } catch (err) {
      console.log(err.message);
    }
  },
  async create(patient) {
    let id;
    if (patient.IdPatient === undefined) { // check if an id was included
      id = Math.floor(Math.random() * 100000);
      id = String(id).padStart(5, "0")
    } else {
      id = String(patient.IdPatient);
    }
    const newItem = {
      id: id,
      IdPatient: id,
      FirstName: patient.FirstName,
      LastName: patient.LastName,
      MRN: patient.MRN
    };
    const { resource } = await this.container.items.create(newItem);
    return resource;
  },
  async readAll() {
    const iterator = this.container.items.readAll();
    const { resources } = await iterator.fetchAll();
    return JSON.stringify(resources);
  },
  async read(id) {
    const item = this.container.item(id, id);
    const contents = await item.read();
    return contents.resource;
  },
  async update(patient) {
    const { resource } = await this.container.items.upsert(patient);
      // .replace(patient);
    return resource;
  },
  //container.items.upsert(person);
  // async update(product) {
  //   const { resource } = await this.container.item(
  //     product.id,
  //     product.brand.name,
  //   )
  //     .replace(product);
  //   return resource;
  // },
  // async delete(id, brandName) {
  //   const result = await this.container.item(id, brandName).delete();
  // },
};

patientsService.init();

module.exports = patientsService;
