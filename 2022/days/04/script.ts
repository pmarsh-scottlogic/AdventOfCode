import { getData } from "../../utils";

const assignmentPairs = getData("input.txt")
	.split("\r\n")
	.map((assignment) => {
		const split = assignment.split(",");
		const assignment1 = split[0].split("-");
		const assignment2 = split[1].split("-");
		return <AssignmentPair>{
			aLower: +assignment1[0],
			aUpper: +assignment1[1],
			bLower: +assignment2[0],
			bUpper: +assignment2[1],
		};
	});

interface AssignmentPair {
	aLower: number;
	aUpper: number;
	bLower: number;
	bUpper: number;
}

function checkContainment(pair: AssignmentPair) {
	return (
		(pair.aLower <= pair.bLower && pair.aUpper >= pair.bUpper) ||
		(pair.bLower <= pair.aLower && pair.bUpper >= pair.aUpper)
	);
}

function checkOverlap(pair: AssignmentPair) {
	for (let i = pair.aLower; i <= pair.aUpper; i++) {
		if (pair.bLower <= i && i <= pair.bUpper) return true;
	}
	return false;
}

const answer1 = assignmentPairs.reduce((total, pair) => {
	return total + (checkContainment(pair) ? 1 : 0);
}, 0);

const answer2 = assignmentPairs.reduce((total, pair) => {
	return total + (checkOverlap(pair) ? 1 : 0);
}, 0);

console.log(answer2);
