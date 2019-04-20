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
		else {
			const startDate = record.numdate1 < 0 ? `${record.numdate1.substring(1)} BC` : `${record.numdate1} AD`;
			const endDate = record.numdate2 < 0 ? `${record.numdate2.substring(1)} BC` : `${record.numdate2} AD`;
			const imgUrl = `https://finds.org.uk/${record.imagedir}${record.filename}`;
			const text = 'This'
			+ ' ' + record.primaryMaterial
			+ ' ' + record.objecttype
			+ ' is from between ' + startDate
			+ ' and ' + endDate
			+ '. It was discovered in ' + record.district
			+ ' and reported to the Portable Antiquities Scheme and then ' + record.subsequentActionTerm
			+ '. This is the normal story of an object being responsibly discovered and recorded…';
			res.render('index', { story: text, imgUrl: imgUrl, error: null });
		}
	});
});

app.listen(3000, function () {
	console.log('Cursed objects app listening on port 3000');
});