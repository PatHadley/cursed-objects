/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const utils = require('./utils.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index', { story: null, error: null });
});

app.post('/', function(req, res) {
	let itemid = req.body.artefactIdentifier;
	utils.getArtefact(itemid, function (err, record) {
		if (err) {
			res.render('index', { story: null, error: 'Error: ' + error });
		}
		
		if (!record) {
			res.render('index', { story: null, error: 'Something went wrong... no record defined for that ID.'  });
		}
		if (!record.primaryMaterial || !record.objecttype || !record.numdate1 || !record.numdate2 || !record.district || !record.subsequentActionTerm || !record.imagedir || !record.filename) {
			res.render('index', { story: null, error: 'This record is incomplete and cannot generate a curse' });
		}
		else {
			const text = 'This'
			+ ' ' + record.primaryMaterial
			+ ' ' + record.objecttype
			+ ' is from between ' + record.numdate1
			+ ' and ' + record.numdate2
			+ '. It was discovered in ' + record.district 
			+ ' and reported to the Portable Antiquities Scheme and then ' + record.subsequentActionTerm
			+ '. This is the normal story of an object being responsibly discovered and recorded…';
			const imageUrl = 'https://finds.org.uk/'
			+ record.imagedir
			+ record.filename;
			res.render('index', { story: text, image: imageUrl, error: null });
		}
	});
});

app.listen(3000, function () {
	console.log('Cursed objects app listening on port 3000');
});