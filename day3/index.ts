import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, 'input.txt');
if (!fs.existsSync(filePath)) {
	console.error('File not found:', filePath);
	process.exit(1);
}
const input = fs.readFileSync(filePath, 'utf-8');

// PT1
const sumValidMultiplications = (): number => {
	return input.matchAll(/mul\((\d+),(\d+)\)/g)
		.map(item => Number(item[1]) * Number(item[2]))
		.reduce((acc: number, product: number) => acc + product, 0);
};

console.log(sumValidMultiplications());

// PT2
const sumValidMultiplicationsP2 = (): number => {
	const matches: RegExpStringIterator<RegExpExecArray> = input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);
	let sum: number = 0;
	let enabled: boolean = true;

	for (const match of matches) {
		if (match[0] === `don't()`) enabled = false;
		else if (match[0] === 'do()') enabled = true;
		else if (enabled) sum += Number(match[1]) * Number(match[2]);
	}

	return sum;
};

console.log(sumValidMultiplicationsP2());