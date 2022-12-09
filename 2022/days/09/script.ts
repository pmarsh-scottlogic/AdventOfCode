import { getData } from "../../utils/utils";
import Rope from "./Rope";

const movements = getData("input.txt").split("\r\n");

const rope = new Rope(9);

movements.map((line) => {
	const direction = line.split(" ")[0];
	const steps = +line.split(" ")[1];
	for (let i = 0; i < steps; i++) {
		rope.moveHead(direction);
	}
});

console.log(rope.tailVisited.size);
