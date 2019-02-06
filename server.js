/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

app.get('/', function (req, res) {
	
	let itemId = getRandomInt(999999);
	let url = `https://finds.org.uk/database/artefacts/record/id/${itemId}/format/json`;
	
	console.log(itemId);
	
	request(url, function (err, response, body) {
		if(err){
			res.render('index', {metadata: null, error: 'Error, please try again'});
		} else {
			let metadata = JSON.parse(body);
			if (metadata[0] == undefined){
				res.render('index', {metadata: null, error: 'Error, please try again'});
			} else {
				let item = metadata.record[0];
				let imgUrl = `https://finds.org.uk/${item.imagedir}${item.filename}`;
				let description = item.description;
				console.log(imgUrl);
				res.render('index', {metadata: description, error: null})
			}
		}
	});
	res.render('index');
});

app.listen(3000, function () {
	console.log('Cursed objects app listening on port 3000');
});