
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/\\$metadata', (req, res) => {
    const metadataFilePath = path.join(__dirname, '..', 'metadata', 'metadata.xml');
    fs.readFile(metadataFilePath, 'utf-8', (err, metadata) => {
        if (err) {
            console.error("Failed to read metadata file:", err);
            return res.status(500).send('Failed to load metadata');
        }
        res.type('application/xml').send(metadata);
    });
});

module.exports = router;
