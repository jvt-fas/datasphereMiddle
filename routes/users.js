var express = require('express');
var router = express.Router();
const Employee = require('../services/EmployeeServices')

const fs = require('fs');
const path = require('path');
/* GET users listing. */

const metadataFilePath = path.join(__dirname, '..', 'metadata', 'metadata.xml');
const metadata = fs.readFileSync(metadataFilePath, 'utf-8');

// Endpoint to serve the metadata document
router.get('/metadata', (req, res) => {
  res.type('application/xml').send(metadata);
});

router.get('/', async function(req, res, next) {
  try {
    const user = await Employee.getEmployees();
    const odataResponse = {
      '@odata.context': 'https://nodetestdatasphere-7c7fa012a402.herokuapp.com:3000/users/metadata',
      value: user.map(entity => ({
        id: entity.id,
        name: entity.full_name,
        age: 30
      }))
    };
     res.json(odataResponse);
  } catch (error) {
    // Handle error appropriately, e.g., send error response
    console.error(error);
    res.status(500).send("Error fetching employees");
  }
});

module.exports = router;
