import { input } from "./input";
import { getLines } from "../utils";

// PT1

const lines = getLines(input);

const sortedLeftColumn = lines.map(([a, _]) => a).sort((a, b) => a - b);
const sortedRightColumn = lines.map(([_, b]) => b).sort((a, b) => a - b);

const totalDistance = sortedLeftColumn.reduce(
	(accumulator, leftValue, index) => accumulator + Math.abs(leftValue - sortedRightColumn[index]),
	0
);

console.log(totalDistance);

// PT2

const getSimilarityScore = (leftColumn: number[], rightColumn: number[]) => {
	return leftColumn
		.map((el) => {
			const occurences = rightColumn.filter((item) => item === el).length;
			return occurences * el;
		})
		.reduce((acc, el) => acc + el, 0);
};

console.log(getSimilarityScore(sortedLeftColumn, sortedRightColumn));
