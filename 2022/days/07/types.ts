export type Directory = {
	name: string;
	subDirectories: Array<Directory>;
	files: Array<number>;
	size: number;
};
