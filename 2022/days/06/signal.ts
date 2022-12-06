import { formatDiagnosticsWithColorAndContext } from "typescript";
import { distinct, getData } from "../../utils/utils";

const input = getData("input.txt");

function findMarker(markerLength: number) {
	for (let i = 0; i < input.length - markerLength; i++) {
		if (distinct(input.substring(i, i + markerLength)))
			return i + markerLength;
	}
	return -1;
}

const answer = findMarker(4);
const answer2 = findMarker(14);
console.log(answer2);
