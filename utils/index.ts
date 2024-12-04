import { readFileSync } from "fs";

export const getLines = (input: string): number[][] =>
	input.split("\n").map((line) => line.split(/\s+/).map(Number));

export const readTextFileSync = (file: string) => {
	try {
		return readFileSync(file, "utf-8");
	} catch (error) {
		console.error("Error reading file:", error);
	}
};