const { CosmosClient } = require("@azure/cosmos");
const { v4: uuidv4 } = require('uuid');

// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const testResultsService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("TestDatabase");
      this.container = this.database.container("TestResults");
    } catch (err) {
      console.log(err.message);
    }
  },
  async createBloodwork() {
    const IdTestResult = uuidv4();

    // generate some random data
    const testDate = new Date();
    testDate.setDate(testDate.getDate() - Math.floor(Math.random() * 10));

    const newItem = {
      id: IdTestResult,
      Name: "Blood test",
      TestDate: testDate,
      WhiteBloodCellCount: Math.floor(Math.random() * 1000),
      RedBloodCellCount: Math.floor(Math.random() * 1000),
      PlateletCount: Math.floor(Math.random() * 1000),
      IdTestResult: IdTestResult,
      CreatedAt: (new Date()).toISOString(),
    };
    const { resource } = await this.container.items.create(newItem);
    return resource;
  },
};

testResultsService.init();

module.exports = testResultsService;
