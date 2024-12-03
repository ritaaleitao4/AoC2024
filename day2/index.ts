import { input } from "./input";
import { getLines } from "../utils";

// PT1
const isStrictlyAscendingOrDescending = (
	arr: number[],
	isIncreasing: boolean
): boolean => {
	return arr.every((currentValue: number, i: number) => {
		if (i === arr.length - 1) return true;
		const nextValue = arr[i + 1];
		const distance = Math.abs(currentValue - nextValue);

		const isCorrectOrder = isIncreasing
			? currentValue < nextValue
			: currentValue > nextValue;

		const isValidDistance = distance >= 1 && distance <= 3;

		return isCorrectOrder && isValidDistance;
	});
};

const findValidArrangements = (lines: number[][]): number[][] =>
	lines.filter(
		(line) =>
			isStrictlyAscendingOrDescending(line, true) ||
			isStrictlyAscendingOrDescending(line, false)
	);

const lines = getLines(input);
const validArrangements = findValidArrangements(lines);

console.log(validArrangements.length);

// PT2
const isValidWithProblemDampener = (arr: number[]): boolean => {
	const isValid = (array: number[]) =>
		isStrictlyAscendingOrDescending(array, true) ||
		isStrictlyAscendingOrDescending(array, false);

	if (isValid(arr)) {
		return true;
	}

	return arr.some((_, i) => isValid([...arr.slice(0, i), ...arr.slice(i + 1)]));
};

const findValidArrangementsWithDampener = (lines: number[][]): number[][] =>
	lines.filter(isValidWithProblemDampener);

const linesPt2 = getLines(input);
const validArrangementsPt2 = findValidArrangementsWithDampener(linesPt2);

console.log(validArrangementsPt2.length);