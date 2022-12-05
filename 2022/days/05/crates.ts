import { parse } from "path";
import Stack from "../../utils/Stack";
import { getData, splitArray } from "../../utils/utils";

const input = getData("input.txt")
	.split("\r\n")
	.map((item) => (item === "" ? "*" : item));
const [crates, instructions] = splitArray(input, "*");
crates.splice(crates.length - 1, 1); // remove numbering

function makeStacks(): Array<Stack<string | undefined>> {
	// initialise stacks
	const stackCount = (crates[0].length + 1) / 4;
	const stacks: Array<Stack<string | undefined>> = [];
	for (let i = 0; i < stackCount; i++) {
		stacks.push(new Stack<string>());
	}

	// populate stacks
	crates.reverse().map((row) => {
		for (let i = 0; i < stackCount; i++) {
			const charIndex = 4 * i + 1;
			const char = row.charAt(charIndex);
			if (char !== " ") stacks[i].push(char);
		}
	});
	return stacks;
}

// Parse Instructions
interface Instruction {
	quantity: number;
	from: number;
	to: number;
}

const parsed = instructions.map((instruction) => {
	const split = instruction.split(" ");
	const instructionObject: Instruction = {
		quantity: +split[1],
		from: +split[3],
		to: +split[5],
	};
	return instructionObject;
});

let stacks: Array<Stack<string | undefined>>;

// Part 1 =========================================================================

stacks = makeStacks();

// carry out instructions
function executeInstruction(instruction: Instruction) {
	for (let i = 0; i < instruction.quantity; i++) {
		stacks[instruction.to - 1].push(stacks[instruction.from - 1].pop());
	}
}
parsed.map((instruction) => {
	executeInstruction(instruction);
});

let ans = "";
stacks.map((stack) => {
	ans += stack.pop()?.toString();
});
console.log(ans);

// Part 2 =========================================================================

stacks = makeStacks();

// carry out instructions
function executeInstruction2(instruction: Instruction) {
	const hold = new Stack<string | undefined>();
	for (let i = 0; i < instruction.quantity; i++) {
		hold.push(stacks[instruction.from - 1].pop());
	}
	for (let i = 0; i < instruction.quantity; i++) {
		stacks[instruction.to - 1].push(hold.pop());
	}
}
parsed.map((instruction) => {
	executeInstruction2(instruction);
});

let ans2 = "";
stacks.map((stack) => {
	ans2 += stack.pop()?.toString();
});
console.log(ans2);
