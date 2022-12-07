import { Directory } from "./types";

export default class Simulator {
	outer: Directory;
	current: Directory;
	urls: Map<string, Directory>;
	url: string;

	constructor(outer: Directory) {
		this.outer = outer;
		this.current = outer;
		this.urls = new Map();
		this.urls.set("*", outer);
		this.url = "*";
	}

	handleLine(line: string) {
		if (line[0] === "$") {
			this.handleCommand(line);
		} else this.handleList(line);
	}

	handleList(line: string) {
		const split = line.split(" ");
		if (split[0] === "dir") {
			this.tryAddDirectory(split[1]);
		} else {
			// console.log("FILE: " + split[1]);
			this.current.files.push(+split[0]);
		}
	}

	handleCommand(line: string) {
		const split = line.split(" ");
		const command = split[1];
		if (command === "cd") {
			const dir = split[2];
			switch (dir) {
				case "/":
					this.current = this.outer;
					this.url = "*";
					break;
				case "..":
					this.url = Simulator.prevURL(this.url);
					this.current = <Directory>this.urls.get(this.url);
					break;
				default:
					const dirName = split[2];
					const dir = this.tryAddDirectory(dirName);
					this.url = this.url + "/" + dirName;
					this.urls.set(this.url, dir);
					this.current = dir;
					break;
			}
		}
	}

	private static prevURL(url: string) {
		if (url === "/") return "/";
		const parts = url.split("/");
		parts.splice(parts.length - 1, 1);
		return parts.reduce((newUrl, part) => newUrl + "/" + part);
	}

	tryAddDirectory(name: string): Directory {
		const found = this.findDirectory(name);
		if (!found) {
			const newDir = <Directory>{
				name: name,
				subDirectories: [],
				files: [],
				size: 0,
			};
			this.current.subDirectories.push(newDir);
			return newDir;
		}
		return found;
	}

	findDirectory(name: string) {
		for (let dir of this.current.subDirectories) {
			if (dir.name === name) return dir;
		}
		return null;
	}
}
