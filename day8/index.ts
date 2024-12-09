import { input } from "./input";

type Coords = { x: number; y: number };

//P1
const inRange = (value: number, start: number, end: number): boolean => {
    return start <= value && value < end;
};

const addToMap = (map: Record<string, Coords[]>, cell: string, x: number, y: number) => {
    if (cell === '.') return;
    if (!map[cell]) map[cell] = [];
    map[cell].push({ x, y });
};

const getMap = (grid: string[][]): Record<string, Coords[]> => {
    const map: Record<string, Coords[]> = {};
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            addToMap(map, cell, rowIndex, colIndex);
        });
    });
    return map;
};

const getAntinodes = (coords: Coords[], grid: string[][]): Coords[] => {
    const antinodes: Coords[] = [];
    coords.forEach((coord1, i) => {
        coords.forEach((coord2, j) => {
            if (i === j) return;
            const x = 2 * coord2.x - coord1.x;
            const y = 2 * coord2.y - coord1.y;
            if (inRange(x, 0, grid.length) && inRange(y, 0, grid[0].length)) {
                antinodes.push({ x, y });
            }
        });
    });
    return antinodes;
};

const getUniqueAntinodes = (antinodes: Coords[]): Coords[] => {
    const uniqueSet = new Set(antinodes.map(({ x, y }) => `${x}:${y}`));
    return Array.from(uniqueSet).map((key) => {
        const [x, y] = key.split(":").map(Number);
        return { x, y };
    });
};

const calculateUniqueAntinodes = (): number => {
    const inputs = input.split("\n").filter(Boolean).map(line => line.split(""));
    const map = getMap(inputs);
    const allAntinodes = Object.values(map).flatMap(coords => getAntinodes(coords, inputs));
    const uniqueAntinodes = getUniqueAntinodes(allAntinodes);
    return uniqueAntinodes.length;
};


//P2
const calculateLineEquation = (x1: number, y1: number, x2: number, y2: number) => (x: number, y: number) =>
    (y1 - y2) * x + (x2 - x1) * y + (x1 * y2 - x2 * y1);

const processAntinodeLines = (coords: Coords[], grid: string[][], antinode: boolean[][]): boolean[][] => {
    const newAntinodeMap = antinode.map(row => [...row]);
    coords.forEach((coord1, i) => {
        coords.forEach((coord2, j) => {
            if (i === j) return;
            const { x: x1, y: y1 } = coord1;
            const { x: x2, y: y2 } = coord2;
            const lineEquation = calculateLineEquation(x1, y1, x2, y2);
            grid.forEach((row, x) => {
                row.forEach((_, y) => {
                    if (!newAntinodeMap[x][y] && lineEquation(x, y) === 0) {
                        newAntinodeMap[x][y] = true;
                    }
                });
            });
        });
    });
    return newAntinodeMap;
};

const calculateResonantHarmonics = (): number => {
    const inputs = input.split("\n").filter(Boolean).map(line => line.split(""));
    const antinodeMap = inputs.map(line => line.map(() => false));
    const antennaMap = getMap(inputs);
    let updatedAntinodeMap = antinodeMap;
    Object.values(antennaMap).forEach(coords => {
        updatedAntinodeMap = processAntinodeLines(coords, inputs, updatedAntinodeMap);
    });
    return updatedAntinodeMap.flat().filter(Boolean).length;
};

console.log(calculateUniqueAntinodes());
console.log(calculateResonantHarmonics());