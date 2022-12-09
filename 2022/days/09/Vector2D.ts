export class Vector2D {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	copy() {
		return new Vector2D(this.x, this.y);
	}
}
