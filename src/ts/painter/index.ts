import { TCanvasOptions } from './types';

export class Painter {
  private context: CanvasRenderingContext2D;
  private options: TCanvasOptions = { backgroundColor: 'black' };
  private canvas: HTMLCanvasElement;

  constructor (canvas: HTMLCanvasElement, options: TCanvasOptions = {}) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.options = Object.assign({}, this.options, options || {});
    this.canvas.style.backgroundColor = this.options.backgroundColor as string;
  }
}
