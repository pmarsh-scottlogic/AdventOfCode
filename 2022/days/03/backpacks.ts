import { getData, arrayGroup } from "../../utils/utils";

const rucksacks = getData("input.txt").split("\r\n");

function findItem(rucksack: string) {
	// split into halves
	const h1 = rucksack.substring(0, rucksack.length / 2);
	const h2 = rucksack.substring(rucksack.length / 2);

	return findMatch(h1, h2);
}

function findMatch(h1: string, h2: string) {
	for (let c1 of h1) {
		if (h2.includes(c1)) {
			return c1;
		}
	}
	return undefined;
}

function getPriority(char: string | undefined) {
	if (char === undefined) return -1;
	const code = char.charCodeAt(0);
	if (97 <= code && code <= 122) return code - 96;
	else return code - 65 + 27;
}

const answer1 = rucksacks.reduce(
	(total, rucksack) => total + getPriority(findItem(rucksack)),
	0
);
console.log(answer1);

// ============================ Part 2

const threes = arrayGroup(rucksacks, 3);

const first = threes[1];

function findMatch2(three: Array<string>) {
	const commonInTwo = [];
	for (let c of three[0]) {
		if (three[1].includes(c)) {
			commonInTwo.push(c);
		}
	}

	for (let c of commonInTwo) {
		if (three[2].includes(c)) {
			return c;
		}
	}
}

const answer2 = threes.reduce(
	(total, three) => total + getPriority(findMatch2(three)),
	0
);
console.log(answer2);
