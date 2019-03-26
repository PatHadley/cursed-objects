/* eslint-disable no-console */
const tracery = require('tracery-grammar');
const request = require('request');


// PAS GETTER

const request = require('request');

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

let itemId = getRandomInt(999999);
let url = `https://finds.org.uk/database/artefacts/record/id/${itemId}/format/json`;

// console.log(itemId);


request(url, function (err, response, body) {
	// let record = {};
	if(err){
		console.log('error', error);
	} else {
		let metadata = JSON.parse(body);
		let record = metadata.record[0];
		// let imgUrl = `https://finds.org.uk/${item.imagedir}${item.filename}`;
		return record;
	}
	console.log('are you there?');
	console.log(record);

});

request();

// Para 1 - PAS content only

let para1 = 'This ' + record.primarymaterial + ' ' + record.objecttype + ' is from between ' + record.numdate1 + ' and ' + record.numdate2 + '. It was discovered in ' + record.district + ' and reported to the Portable Antiquities Scheme and then ' + record.subsequentActionTerm + '. This is the normal story of an object being responsibly discovered and recorded…';

console.log(para1);


let grammar = tracery.createGrammar({
	'animal': ['panda','fox','capybara','iguana'],
	'emotion': ['sad','happy','angry','jealous'],
	'origin':['I am #emotion.a# #animal#.'],
});



grammar.addModifiers(tracery.baseEngModifiers); 

// console.log(grammar.flatten('#origin#'));