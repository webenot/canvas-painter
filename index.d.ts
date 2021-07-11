import { TCanvasOptions } from './ts/painter/types';
import { TPointOptions } from './ts/painter/classes/point/types';

declare class Painter {
  constructor (canvas: HTMLCanvasElement, options: TCanvasOptions);
  context: CanvasRenderingContext2D;
  options: TCanvasOptions;
  canvas: HTMLCanvasElement;
}

declare class Point {
  constructor(ctx: CanvasRenderingContext2D, options: TPointOptions);
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
}

export * from './ts/painter/types';
export * from './ts/painter/classes/point/types';
