import { getData } from "../../utils/utils";

const treeGrid = getData("input.txt").split("\r\n");

const rows = treeGrid.length;
const cols = treeGrid[0].length;

function treeVisible(r: number, c: number) {
	const h = +treeGrid[r][c];

	if (r >= rows || c >= cols) throw console.error("bad index");
	if (r === 0 || c === 0 || r === rows - 1 || c === cols - 1) return true;

	const checkLeft = () => {
		for (let i = c - 1; i >= 0; i--) {
			if (+treeGrid[r][i] >= h) return false;
		}
		return true;
	};

	const checkRight = () => {
		for (let i = c + 1; i < cols; i++) {
			if (+treeGrid[r][i] >= h) return false;
		}
		return true;
	};

	const checkUp = () => {
		for (let i = r - 1; i >= 0; i--) {
			if (+treeGrid[i][c] >= h) return false;
		}
		return true;
	};

	const checkDown = () => {
		for (let i = r + 1; i < rows; i++) {
			if (+treeGrid[i][c] >= h) return false;
		}
		return true;
	};

	return checkLeft() || checkRight() || checkUp() || checkDown();
}

let visibleCount = 0;

for (let i = 0; i < rows; i++) {
	for (let j = 0; j < cols; j++) {
		visibleCount += treeVisible(i, j) ? 1 : 0;
	}
}

console.log(visibleCount);

// part 2 =======================================

function scenicScore(r: number, c: number) {
	const h = +treeGrid[r][c];

	if (r >= rows || c >= cols) throw console.error("bad index");

	const countLeft = () => {
		let count = 0;
		for (let i = c - 1; i >= 0; i--) {
			count++;
			if (+treeGrid[r][i] >= h) return count;
		}
		return count;
	};

	const countRight = () => {
		let count = 0;
		for (let i = c + 1; i < cols; i++) {
			count++;
			if (+treeGrid[r][i] >= h) return count;
		}
		return count;
	};

	const countUp = () => {
		let count = 0;
		for (let i = r - 1; i >= 0; i--) {
			count++;
			if (+treeGrid[i][c] >= h) return count;
		}
		return count;
	};

	const countDown = () => {
		let count = 0;
		for (let i = r + 1; i < rows; i++) {
			count++;
			if (+treeGrid[i][c] >= h) return count;
		}
		return count;
	};

	return countLeft() * countRight() * countUp() * countDown();
}

let bestScore = 0;

for (let i = 0; i < rows; i++) {
	for (let j = 0; j < cols; j++) {
		bestScore = Math.max(bestScore, scenicScore(i, j));
	}
}

console.log(bestScore);
