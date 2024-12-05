import { readFileSync } from "fs";

export const getLines = (input: string): number[][] =>
	input.split('\n').map((line) => line.split(/\s+/).map(Number));

export const readTextFileSync = (day: number): string =>
	readFileSync(`./day${day}/input.txt`, "utf-8");
