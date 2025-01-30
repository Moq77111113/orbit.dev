type Props = {
	viewWidth: number;
	viewHeight: number;
	maxWidth: number;
	aspectRatio: number;
	minZoom: number;
	maxZoom: number;
	zoomStep: number;
	initialWidth: number;
};

const defaultProps = {
	viewHeight: 800,
	viewWidth: 1000,
	aspectRatio: 0.7,
	maxWidth: 1000,
	maxZoom: 3,
	minZoom: 1,
	zoomStep: 0.1,
	initialWidth: 1000,
};
export class ZoomController {
	#scale = $state(1);
	#offset = $state({ x: 0, y: 0 });

	#dragging = $state(false);
	#dragStart = $state({ x: 0, y: 0 });
	#startOffset = $state({ x: 0, y: 0 });
	#width = $state(0);
	#height = $state(0);
	#aspectRatio = $state(0);

	#viewBox = $state(`0 0 ${this.width} ${this.height}`);

	constructor(protected readonly props: Props = defaultProps) {
		this.#width = this.props.initialWidth;
		this.#aspectRatio = this.props.aspectRatio;
		this.#height = this.#width * this.#aspectRatio;
		this.updateViewBox();
	}
	get aspectRatio() {
		return this.#aspectRatio;
	}

	get viewBox() {
		return this.#viewBox;
	}

	get minZoom() {
		return this.props.minZoom;
	}

	get maxZoom() {
		return this.props.maxZoom;
	}

	get zoomStep() {
		return this.props.zoomStep;
	}

	get scale() {
		return this.#scale;
	}

	get offset() {
		return this.#offset;
	}

	get width() {
		return this.#width;
	}

	get height() {
		return this.#height;
	}

	get maxWidth() {
		return this.props.maxWidth;
	}

	public updateViewBox() {
		const scaledWidth = this.props.viewWidth / this.#scale;
		const scaledHeight = this.props.viewHeight / this.#scale;

		const maxOffset = {
			x: this.props.viewWidth * (1 - 1 / this.#scale),
			y: this.props.viewHeight * (1 - 1 / this.#scale),
		};

		this.#offset = {
			x: Math.max(-maxOffset.x, Math.min(maxOffset.x, this.#offset.x)),
			y: Math.max(-maxOffset.y, Math.min(maxOffset.y, this.#offset.y)),
		};

		this.#viewBox = `${-this.#offset.x} ${-this.#offset.y} ${scaledWidth} ${scaledHeight}`;
	}

	public handleZoom(delta: number, { x, y }: { x: number; y: number }) {
		const updatedZoom = Math.max(
			this.props.minZoom,
			Math.min(this.props.maxZoom, this.#scale + delta),
		);

		if (updatedZoom === this.#scale) return;

		const centerX = this.props.viewWidth / 2 + this.#offset.x;
		const centerY = this.props.viewWidth / 2 + this.#offset.y;
		const scaleRatio = updatedZoom / this.#scale;

		this.#offset = {
			x: centerX - (centerX - this.#offset.x) * scaleRatio,
			y: centerY - (centerY - this.#offset.y) * scaleRatio,
		};
		this.#scale = updatedZoom;
		this.updateViewBox();
	}

	public resize(width: number) {
		this.#width = width;
		this.#height = this.#width * this.#aspectRatio;
	}

	public reset() {
		this.#scale = 1;
		this.#offset = { x: 0, y: 0 };
		this.updateViewBox();
	}
	public handleMouseDown(x: number, y: number) {
		this.#dragging = true;
		this.#dragStart = { x, y };
		this.#startOffset = { ...this.#offset };
	}

	public handleMouseUp() {
		this.#dragging = false;
	}

	public handleMouseMove(x: number, y: number) {
		if (!this.#dragging) return;

		const dx = (x - this.#dragStart.x) / this.#scale;
		const dy = (y - this.#dragStart.y) / this.#scale;
		this.#offset = {
			x: this.#startOffset.x + dx,
			y: this.#startOffset.y + dy,
		};
		this.updateViewBox();
	}
}
