const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'analyzed-data.json');
const { lengths, chars } = JSON.parse(fs.readFileSync(dataFile));

const getRandom = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	const length = array.reduce((acc, curr) => acc + curr.count, 0);
	let randomIndex = Math.floor(Math.random() * length);

	for (let i = 0; i < array.length; i++) {
		const curr = array[i];
		if (randomIndex < curr.count) {
			return curr.data;
		} else {
			randomIndex -= curr.count;
		}
	}
};

const generate = () => {
	const length = getRandom(lengths);
	let smash = '';

	for (let i = 0; i < length; i++) {
		smash += getRandom(chars[i]);
	}
	return smash;
};


while (true) {
	console.log(generate());
}
