const fs = require('fs');
const path = require('path');

const smashesFile = path.join(__dirname, 'keyboard-smashes.json');
const analyzedFile = path.join(__dirname, 'analyzed-data.json');
const smashes = JSON.parse(fs.readFileSync(smashesFile)).keyboardSmashes;

const analyzed = {
	lengths: [],
	chars: [],
};

for (let i = 0; i < smashes.length; i++) {
	const smash = smashes[i];

	// Analyzing the length
	const existingLength = analyzed.lengths.find(
		(obj) => obj.data === smash.length
	);
	if (existingLength) {
		existingLength.count++;
	} else {
		analyzed.lengths.push({ data: smash.length, count: 1 });
	}

	// Analyzing every letter of the smash
	for (let i = 0; i < smash.length; i++) {
		const char = smash.charAt(i);

		// Create storage for current letter if it does not exist
		if (!analyzed.chars[i]) {
			analyzed.chars.push([]);
		}

		const existingChar = analyzed.chars[i].find((obj) => obj.data === char);
		if (existingChar) {
			existingChar.count++;
		} else {
			analyzed.chars[i].push({ data: char, count: 1 });
		}
	}
}

fs.writeFileSync(analyzedFile, JSON.stringify(analyzed));
