import fs from "fs";

export function getData(filepath: string) {
	return fs.readFileSync(filepath, "utf8");
}

export function splitArray<T>(arr: Array<T>, delimiter: T) {
	const result = [];
	let current: Array<T> = [];
	for (let item of arr) {
		if (item === delimiter) {
			result.push(current);
			current = [];
		} else {
			current.push(item);
		}
	}
	if (current.length > 0) result.push(current);
	return result;
}

export function arrayGet<T>(arr: Array<T>, index: number): T {
	while (index < 0) {
		index += arr.length;
	}
	while (index >= arr.length) {
		index -= arr.length;
	}
	return arr[index];
}
