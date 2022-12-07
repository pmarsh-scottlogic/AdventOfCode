import { Dir } from "fs";
import { mainModule } from "process";
import { getData } from "../../utils/utils";
import Simulator from "./simulator";
import { Directory } from "./types";

const consoleOut = getData("input.txt").split("\r\n");

const outer: Directory = {
	name: "/",
	subDirectories: [],
	files: [],
	size: 0,
};

let sim = new Simulator(outer);

consoleOut.map((line) => {
	sim.handleLine(line);
});

let totalOfSmalls = 0;
const sizes: Array<number> = [];

function getSize(directory: Directory): number {
	const fileTotal = directory.files.reduce(
		(total, current) => total + current,
		0
	);
	const subDirectoryTotal = directory.subDirectories.reduce(
		(total, current) => total + getSize(current),
		0
	);
	const total = fileTotal + subDirectoryTotal;
	directory.size = total;

	if (directory.name !== "/") {
		if (total <= 100000) {
			totalOfSmalls += total;
		}
	}

	sizes.push(total);

	return total;
}

getSize(outer);

console.log(totalOfSmalls);

// Part 2 ================================================

const availableSpace = 70000000;
const requiredSpace = 30000000;
const usedSpace = outer.size;
const unusedSpace = availableSpace - usedSpace;
const extraSpaceNeeded = requiredSpace - unusedSpace;
const eligible = sizes.filter((size) => size > extraSpaceNeeded);
const smallestEligible = eligible.reduce(
	(smallest, current) => Math.min(smallest, current),
	eligible[0]
);
console.log(smallestEligible);
