import { input } from "./input";

const calculateCalibration = (input: string, allowConcatenation: boolean): number => {
    const lines: string[] = input.split('\n').filter(l => l.length > 0);
    const solve = (target: number, numbers: number[], currentResult: number, operator: string, index: number): boolean => {        let result = 0;
        const getResult = (operator: string, currentResult: number, number: number): number => {
            switch (operator) {
                case '+':
                    return currentResult + number;
                case '*':
                    return currentResult * number;
                case '||':
                    return currentResult * Math.pow(10, Math.floor(Math.log10(number)) + 1) + number;
                default:
                    throw new Error(`Unknown operator: ${operator}`);
            }
        };

        result = getResult(operator, currentResult, numbers[index]);

        if (index === numbers.length - 1) {
            return result === target;
        }

        if (result > target) return false;

        return solve(target, numbers, result, '+', index + 1) ||
            solve(target, numbers, result, '*', index + 1) ||
            (allowConcatenation && solve(target, numbers, result, '||', index + 1));
    };

    let totalCalibration: number = 0;

    for (const line of lines) {
        const separatorIndex: number = line.indexOf(':');
        const expected: number = Number(line.slice(0, separatorIndex));
        const numbers: number[] = line.slice(separatorIndex + 2, line.length).split(' ').map(Number);

        if (solve(expected, numbers, numbers[0], '+', 1)) { totalCalibration += expected; continue; }
        if (solve(expected, numbers, numbers[0], '*', 1)) { totalCalibration += expected; continue; }
        if (allowConcatenation && solve(expected, numbers, numbers[0], '||', 1)) { totalCalibration += expected; continue; }
    }

    return totalCalibration;
};

// PT1
console.log(calculateCalibration(input, false));

// PT2
console.log(calculateCalibration(input, true));
