import { input } from "./input";

const [rulesInput, pagesInput] = input.split('\n\n');
const rules = rulesInput.split('\n').map(r => r.split('|').map(Number));
const pageList = pagesInput.split('\n').map(p => p.split(',').map(Number));

// PT1
const isValidPageSequence = (pages: number[]): boolean => {
    for (const [index, page] of pages.entries()) {
        const relevantRules = rules.filter(([left, right]) => right === page && pages.includes(left));

        for (const [left] of relevantRules) {
            if (!pages.slice(0, index).includes(left)) {
                return false;
            }
        }
    }
    return true;
};

const getMiddlePage = (pages: number[]): number => pages[Math.floor(pages.length / 2)];

const calculateResult = (filterFunc: (pages: number[]) => boolean): number =>
    pageList.filter(filterFunc).map(getMiddlePage).reduce((sum, page) => sum + page, 0);

console.log(calculateResult(isValidPageSequence));

// PT2
const fixPageSequence = (pages: number[]): boolean => {
    let needsFixing = false;

    for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        const page = pages[pageIndex];
        const relevantRules = rules.filter(([left, right]) => left === page && pages.includes(right));

        for (const [_, right] of relevantRules) {
            const after = pages.slice(pageIndex);
            if (!after.includes(right)) {
                const before = pages.slice(0, pageIndex);
                const badIndex = before.findIndex(p => p === right);

                [pages[pageIndex], pages[badIndex]] = [pages[badIndex], pages[pageIndex]];

                pageIndex = 0;
                needsFixing = true;
                break;
            }
        }
    }
    return needsFixing;
};

console.log(calculateResult(fixPageSequence));