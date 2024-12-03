export const getLines = (input: string): number[][] =>
	input.split("\n").map((line) => line.split(/\s+/).map(Number));
