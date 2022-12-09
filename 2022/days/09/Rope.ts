import RopeSegment from "./RopeSegment";
import { Vector2D } from "./Vector2d";

export default class Rope {
	headPos: Vector2D;
	segments: Array<RopeSegment>;
	tailVisited: Set<string>;
	constructor(numKnots: number) {
		this.headPos = new Vector2D(0, 0);
		this.segments = [];
		this.initialiseKnots(numKnots);
		this.tailVisited = new Set();
	}

	initialiseKnots(numKnots: number) {
		for (let i = 0; i < numKnots; i++) {
			this.segments.push(new RopeSegment(this.headPos.x, this.headPos.y));
		}
	}

	public moveHead(direction: string) {
		switch (direction) {
			case "U":
				this.headPos.y++;
				break;
			case "D":
				this.headPos.y--;
				break;
			case "L":
				this.headPos.x--;
				break;
			case "R":
				this.headPos.x++;
				break;
		}

		this.segments.map((segment, i) => {
			if (i == 0) segment.follow(this.headPos);
			else segment.follow(this.segments[i - 1].pos);
		});

		this.tailVisited.add(
			this.segments[this.segments.length - 1].pos.x.toString() +
				"," +
				this.segments[this.segments.length - 1].pos.y.toString()
		);
	}
}
