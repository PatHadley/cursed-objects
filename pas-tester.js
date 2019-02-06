/* eslint-disable no-console */
const request = require('request');

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

let itemId = getRandomInt(999999);
let url = `https://finds.org.uk/database/artefacts/record/id/${itemId}/format/json`;

console.log(itemId);

request(url, function (err, response, body) {
	if(err){
		console.log('error', error);
	} else {
		let metadata = JSON.parse(body);
		let item = metadata.record[0];
		let imgUrl = `https://finds.org.uk/${item.imagedir}${item.filename}`;
		console.log(item.description);
		console.log(imgUrl);
	}
});