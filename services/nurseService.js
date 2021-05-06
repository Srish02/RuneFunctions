const { CosmosClient } = require("@azure/cosmos");

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const patientsService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("TestDatabase");
      this.container = this.database.container("Nurse");
    } catch (err) {
      console.log(err.message);
    }
  },
  async create(nurse) {
    let id;
    if (nurse.IdNurse === undefined) { // check if an id was included
      id = Math.floor(Math.random() * 100000);
      id = String(id).padStart(5, "0")
    } else {
      id = String(nurse.IdNurse);
    }
    const newItem = {
      id: id,
      IdNurse: id,
      FirstName: nurse.FirstName,
      LastName: nurse.LastName,
      Token:"token"
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
    return JSON.stringify(contents.resource);
  },
  async update(id, updatedNurse) {
    // debug('Update an item in the database')
    const item = this.container.item(id, id);
    const contents = await item.read();
    //doc.completed = true
    const nurse = contents.resource
    patient.Token = updatedNurse.Token

    const { resource } = await this.container
       .item(id, id)
       .replace(nurse)
    return resource
    // const { resource } = await this.container.items.upsert(patient);
    //   // .replace(patient);
    // return JSON.stringify(resource);
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

nurseService.init();

module.exports = nurseService;
