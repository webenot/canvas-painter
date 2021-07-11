import { Painter } from './painter';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('painter') as HTMLCanvasElement;
  if (canvas) {
    new Painter(canvas);
  }
});
