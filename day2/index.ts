import { input } from "./input";
import { getLines } from "../utils";

const lines = getLines(input);
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

// PT1
const validArrangements = (): number =>
	lines.filter(
		(line) =>
			isStrictlyAscendingOrDescending(line, true) ||
			isStrictlyAscendingOrDescending(line, false)
	).length;


console.log(validArrangements());

// PT2
const isValidWithProblemDampener = (arr: number[]): boolean => {
	const isValid = (array: number[]): boolean =>
		isStrictlyAscendingOrDescending(array, true) ||
		isStrictlyAscendingOrDescending(array, false);

	if (isValid(arr)) {
		return true;
	}

	return arr.some((_, i) => isValid([...arr.slice(0, i), ...arr.slice(i + 1)]));
};

const validArrangements2 = (): number => lines.filter(isValidWithProblemDampener).length;

console.log(validArrangements2());