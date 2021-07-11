import { TPointOptions } from 'Classes/point/types';

export class Point {

  x = 0;
  y = 0;
  color = 'black';
  ctx;

  constructor (
    ctx: CanvasRenderingContext2D,
    {
      x,
      y,
      color,
    }: TPointOptions,
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.ctx = ctx;
  }

  draw () {
    const { ctx, x, y, color } = this;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    ctx.restore();
  }
}
