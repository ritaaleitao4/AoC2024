import { input } from "./input";

const parsedInput = input.split("\n");

type Coord = [x: number, y: number];

const Grid = {
    width: 0,
    height: 0,
    cells: [] as string[][],

    at(coord: Coord): string | null {
        try {
            return this.cells[coord[1]][coord[0]];
        } catch (_error) {
            return null;
        }
    },

    scanForXMAS(start: Coord): number {
        return (
            [
                [1, 0],
                [-1, 0],
                [0, -1],
                [0, 1],
                [1, 1],
                [-1, 1],
                [-1, -1],
                [1, -1],
            ] as Coord[]
        )
            .map((step: Coord): number => this.searchForXMAS(start, step))
            .reduce((sum: number, val: number): number => sum + val, 0);
    },

    searchForXMAS(pos: Coord, step: Coord): number {
        let found: string = "";
        let curpos: Coord = pos;

        while (found.length < 4) {
            const nchar: string | null = this.at(curpos);

            if (nchar === null) {
                return 0;
            }

            found += nchar;
            curpos = [curpos[0] + step[0], curpos[1] + step[1]];
        }

        return ["XMAS", "SAMX"].includes(found) ? 1 : 0;
    },

    scanForCrossMAS(start: Coord): number {
        const [topLeft, topRight, bottomRight, bottomLeft] = [
            this.at([start[0] - 1, start[1] - 1]), // Top Left
            this.at([start[0] + 1, start[1] - 1]), // Top Right
            this.at([start[0] + 1, start[1] + 1]), // Bottom Right
            this.at([start[0] - 1, start[1] + 1]), // Bottom Left
        ];

        if ([topLeft, topRight, bottomRight, bottomLeft].includes(null)) return 0;

        const oneCross: boolean = (topLeft === "M" && bottomRight === "S") || (topLeft === "S" && bottomRight === "M");
        const twoCross: boolean = (topRight === "M" && bottomLeft === "S") || (topRight === "S" && bottomLeft === "M");

        return oneCross && twoCross ? 1 : 0;
    }
};

const initializeGrid = (input: string[]): void => {
    Grid.width = input[0].length;
    Grid.height = input.length;
    Grid.cells = input.map((line) => line.split(""));
};

const findCoordinates = (input: string[], indexChar: string): Coord[] => {
    const coordinates: Coord[] = [];
    input.forEach((line: string, y: number) => {
        findAllIndices(line.split(''), indexChar)
            .map((x: number) => [x, y] as Coord)
            .forEach((coordinate: Coord) => coordinates.push(coordinate));
    });
    return coordinates;
};

const findAllIndices = (chars: string[], search: string): number[] => {
    const indices: number[] = [];
    chars.forEach((char: string, index: number) => {
        if (char === search) indices.push(index);
    });
    return indices;
};


const solve = (
    input: string[],
    indexChar: string,
    scannerFn: "scanForXMAS" | "scanForCrossMAS"
): number => {
    initializeGrid(input);
    const coordinates: Coord[] = findCoordinates(input, indexChar);
    return coordinates
        .map((coordinate: Coord) => Grid[scannerFn](coordinate))
        .reduce((sum: number, val: number): number => sum + val, 0);
};


const resolveP1 = (input: string[]): number => solve(input, "X", "scanForXMAS");
const resolveP2 = (input: string[]): number => solve(input, "A", "scanForCrossMAS");

console.log(resolveP1(parsedInput));
console.log(resolveP2(parsedInput));
