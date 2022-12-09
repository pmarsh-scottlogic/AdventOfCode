import { Vector2D } from "./Vector2d";

export default class RopeSegment {
	pos: Vector2D;
	constructor(x: number, y: number) {
		this.pos = new Vector2D(x, y);
	}

	follow(target: Vector2D) {
		while (!this.touching(target)) {
			this.step(target);
		}
	}

	touching(target: Vector2D) {
		const dx = target.x - this.pos.x;
		const dy = target.y - this.pos.y;

		return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
	}

	step(target: Vector2D) {
		const dx = target.x - this.pos.x;
		const dy = target.y - this.pos.y;

		const sx = dx ? dx / Math.abs(dx) : 0;
		const sy = dy ? dy / Math.abs(dy) : 0;

		this.pos.x += sx;
		this.pos.y += sy;
	}
}
