/* eslint-disable no-console */
const tracery = require('tracery-grammar');
const request = require('request');

let itemId = getRandomInt(999999);

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const getItem = function(itemId, callback) {
	let url = `https://finds.org.uk/database/artefacts/record/id/${itemId}/format/json`;
	request(url, function (err, response, body) {
		if (err) {
			return callback(err);
		} 
		// console.log(body);
		let metadata = JSON.parse(body);
		let record = metadata.record[0];
		callback(null, record);
	});
}

getItem(itemId, function (err, record) {
	if (err) {
		console.log(err)
	}
	// Para 1 - PAS content only
	let para1 = 'This'
		+ ' ' + record.primaryMaterial
		+ ' ' + record.objecttype
		+ ' is from between ' + record.numdate1
		+ ' and ' + record.numdate2
		+ '. It was discovered in ' + record.district
		+ ' and reported to the Portable Antiquities Scheme and then ' + record.subsequentActionTerm
		+ '. This is the normal story of an object being responsibly discovered and recorded…';
		console.log(para1);
	
	// let grammar = tracery.createGrammar({
	// 	'animal': ['panda', 'fox', 'capybara', 'iguana'],
	// 	'emotion': ['sad', 'happy', 'angry', 'jealous'],
	// 	'origin': ['I am #emotion.a# #animal#.'],
	// });

	// grammar.addModifiers(tracery.baseEngModifiers);

	// console.log(grammar.flatten('#origin#'));
})