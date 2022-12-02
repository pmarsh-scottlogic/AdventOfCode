import { getData, splitArray, arrayGet } from "../../utils";

const calorieList = getData("input.txt")
	.split("\r\n")
	.map((item) => (item === "" ? -1 : +item));
const calorieByElf = splitArray(calorieList, -1);

const calorieSums = calorieByElf.map(
	(cals) => cals.reduce((total, x) => total + x),
	0
);

calorieSums.sort((a, b) => a - b);
const highestCalorie = arrayGet(calorieSums, -1);

console.log("highest calorie: " + highestCalorie);

const sumTopThree =
	arrayGet(calorieSums, -1) +
	arrayGet(calorieSums, -2) +
	arrayGet(calorieSums, -3);

console.log("sum of top three calories: " + sumTopThree);
