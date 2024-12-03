export const calculateDistance = (a: number, b: number) => Math.abs(a - b);

export const getLines = (input: string): number[][] =>
	input.split("\n").map((line) => line.split(/\s+/).map(Number));
