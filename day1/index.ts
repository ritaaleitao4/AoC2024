import { input } from "./input";
import { getLines } from "../utils";

const lines = getLines(input);
const sortedLeftColumn: number[] = lines.map(([a, _]) => a).sort((a, b) => a - b);
const sortedRightColumn: number[] = lines.map(([_, b]) => b).sort((a, b) => a - b);

// PT1
const totalDistance: number = sortedLeftColumn.reduce(
	(accumulator, leftValue, index) => accumulator + Math.abs(leftValue - sortedRightColumn[index]),
	0
);

console.log(totalDistance);

// PT2
const getSimilarityScore = (leftColumn: number[], rightColumn: number[]): number => {
	return leftColumn
		.map((el: number) => {
			const occurrences: number = rightColumn.filter((item) => item === el).length;
			return occurrences * el;
		})
		.reduce((acc: number, el: number) => acc + el, 0);
};

console.log(getSimilarityScore(sortedLeftColumn, sortedRightColumn));
