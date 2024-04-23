var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
const Employee = require('../services/EmployeeServices');  // Assuming this returns promises and handles data fetching.

// Metadata setup
const metadataFilePath = path.join(__dirname, '..', 'metadata', 'metadata.xml');
const metadata = fs.readFileSync(metadataFilePath, 'utf-8');

// Serve the metadata document
router.get('/$metadata', (req, res) => {
  res.type('application/xml').send(metadata);
});

// Main endpoint to get employees in OData format
router.get('/', async (req, res) => {
  try {
    const users = await Employee.getEmployees();
    const odataResponse = {
      '@odata.context': 'https://nodetestdatasphere-7c7fa012a402.herokuapp.com/users/$metadata',
      value: users.map(user => ({
        id: user.id,
        name: user.full_name,  // Assuming full_name is the correct field
        age: user.age || 30    // Defaulting age to 30 if not specified
      }))
    };
    res.json(odataResponse);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send("Error fetching employees");
  }
});

module.exports = router;
