import { input } from "./input";

type Block = {
    index: number;
    id: number;
    length: number;
};

const parseDiskMap = (diskMap: string): Block[] => {
    const inputNumbers: string[] = diskMap.trim().split('');
    const blocks: Block[] = [];
    let id: number = 0;
    for (let i = 0; i < inputNumbers.length; i++) {
        if (i % 2 === 0) {
            blocks.push({ id, length: Number(inputNumbers[i]), index: i });
            id++;
        } else {
            blocks.push({ id: -1, length: Number(inputNumbers[i]), index: i });
        }
    }
    return blocks;
};

const calculateFilesystemChecksum = (blocks: Block[]): number => {
    let checksum: number = 0;
    let currentIndex: number = 0;
    for (const block of blocks) {
        if (block.id !== -1) {
            for (let s = 0; s < block.length; s++) {
                checksum += (currentIndex + s) * block.id;
            }
        }
        currentIndex += block.length;
    }
    return checksum;
};

const compactFilesByBlocks = (blocks: Block[]): Block[] => {
    for (let i = blocks.length - 1; i >= 0; i--) {
        if (blocks[i].id === -1) continue;

        const firstFreeBlockIndex: number = blocks.slice(0, i).findIndex(b => b.id === -1);
        if (firstFreeBlockIndex === -1) break;

        const firstFreeBlock: Block = blocks[firstFreeBlockIndex];
        if (firstFreeBlock.length === blocks[i].length) {
            firstFreeBlock.id = blocks[i].id;
            blocks[i].id = -1;
        } else if (firstFreeBlock.length > blocks[i].length) {
            firstFreeBlock.id = blocks[i].id;
            const remainingFree = firstFreeBlock.length - blocks[i].length;
            firstFreeBlock.length = blocks[i].length;
            blocks[i].id = -1;
            blocks.splice(firstFreeBlockIndex + 1, 0, { id: -1, length: remainingFree, index: firstFreeBlock.index });
        } else {
            firstFreeBlock.id = blocks[i].id;
            blocks[i].length = blocks[i].length - firstFreeBlock.length;
            blocks.splice(i + 1, 0, { id: -1, length: firstFreeBlock.length, index: blocks[i].index });
            i++;
        }
    }
    return blocks;
};


const compactFilesByWholeFiles = (blocks: Block[]): Block[] => {
    let currentId: number = Math.max(...blocks.map(b => b.id));
    while (currentId >= 0) {
        const block = blocks.find(b => b.id === currentId);
        currentId--;
        if (!block) continue;

        const firstFreeBlockIndex: number = blocks.findIndex(b => b.id === -1 && b.index < block.index && b.length >= block.length);
        if (firstFreeBlockIndex === -1) continue;

        const firstFreeBlock = blocks[firstFreeBlockIndex];
        if (firstFreeBlock.length === block.length) {
            firstFreeBlock.id = block.id;
            block.id = -1;
        } else if (firstFreeBlock.length > block.length) {
            firstFreeBlock.id = block.id;
            const remainingFree = firstFreeBlock.length - block.length;
            firstFreeBlock.length = block.length;
            block.id = -1;
            blocks.splice(firstFreeBlockIndex + 1, 0, { id: -1, length: remainingFree, index: firstFreeBlock.index });
        }
    }
    return blocks;
};

//P1
const blocksP1: Block[] = parseDiskMap(input);
const compactedBlocksByBlocks: Block[] = compactFilesByBlocks(blocksP1);
console.log(calculateFilesystemChecksum(compactedBlocksByBlocks));


//P2
const blocksP2: Block[] = parseDiskMap(input);
const compactedBlocksByWholeFiles: Block[] = compactFilesByWholeFiles(blocksP2);
console.log(calculateFilesystemChecksum(compactedBlocksByWholeFiles));