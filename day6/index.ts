import { input } from "./input";

const parsedInput: string[] = input.split('\n');
const map: boolean[][] = parsedInput.map((line) => line.split("").map((char) => char === "#"));
const [startY, startX] = [
    parsedInput.findIndex((line) => line.includes("^")),
    parsedInput.find((line) => line.includes("^"))!.indexOf("^")
];
const isPointInBounds = <T>(arr: T[][]) => (point: [number, number]) =>
    point[0] >= 0 && point[1] >= 0 && point[0] < arr.length && point[1] < arr[0].length;
const isInBounds = isPointInBounds(map);

const walkPath = (): number[][] | null => {
    const visited = map.map((line) => line.map(() => 0));
    let position: [number, number] = [startY, startX];
    let directionIndex = 0;
    const directions: [number, number][] = [
        [-1, 0], // Up
        [0, 1],  // Right
        [1, 0],  // Down
        [0, -1]  // Left
    ];

    while (true) {
        visited[position[0]][position[1]]++;
        if (visited[position[0]][position[1]] > 4) {
            return null;
        }
        const nextPosition: [number, number] = [
            position[0] + directions[directionIndex][0],
            position[1] + directions[directionIndex][1]
        ];

        if (!isInBounds(nextPosition)) {
            break;
        }

        if (map[nextPosition[0]][nextPosition[1]]) {
            directionIndex = (directionIndex + 1) % directions.length;
            continue;
        }
        position = nextPosition;
    }

    return visited;
};

const baseMapVisited: number[][] | null = walkPath();

if (baseMapVisited === null) {
    throw new Error("Invalid path");
}


//PT1
const visitedCount: number = baseMapVisited.flatMap((line) =>
    line.filter((cell) => cell !== 0)
).length;

console.log(visitedCount);


//PT2
let obstructionCount: number = 0;

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] || baseMapVisited[y][x] === 0) {
            continue;
        }
        map[y][x] = true;
        if (walkPath() === null) {
            obstructionCount++;
        }
        map[y][x] = false;
    }
}

console.log(obstructionCount);
