const request = require('request');

exports.getArtefact = function (itemId, callback) {
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
};
