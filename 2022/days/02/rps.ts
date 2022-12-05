import { getData } from "../../utils/utils";

const strategy = getData("input.txt")
	.split("\r\n")
	.map((gameString) => {
		return gameString.charAt(0) + gameString.charAt(2);
	});

function roundScore(round: string): number {
	switch (round) {
		case "AX":
			return 3 + 1;
		case "AY":
			return 6 + 2;
		case "AZ":
			return 0 + 3;
		case "BX":
			return 0 + 1;
		case "BY":
			return 3 + 2;
		case "BZ":
			return 6 + 3;
		case "CX":
			return 6 + 1;
		case "CY":
			return 0 + 2;
		case "CZ":
			return 3 + 3;
		default:
			return -1;
	}
}

function roundScore2(round: string): number {
	switch (round) {
		case "AX":
			return 0 + 3;
		case "AY":
			return 3 + 1;
		case "AZ":
			return 6 + 2;
		case "BX":
			return 0 + 1;
		case "BY":
			return 3 + 2;
		case "BZ":
			return 6 + 3;
		case "CX":
			return 0 + 2;
		case "CY":
			return 3 + 3;
		case "CZ":
			return 6 + 1;
		default:
			return -1;
	}
}

const score = strategy.reduce((total, round) => total + roundScore(round), 0);
const score2 = strategy.reduce((total, round) => total + roundScore2(round), 0);
console.log(score);
console.log(score2);
