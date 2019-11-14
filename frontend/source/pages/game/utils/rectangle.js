import Vector from "./vector";

export default class Rectangle extends Vector {
  constructor (x, y, width, height, color = 'black') {
    super(x, y);

    this.width = width;
    this.height = height;
    this.color = color;

    this.middle = new Vector(width/2 + x, height/2 + y);
  }

  // vertical
  get T () { return this.y; };
  get B () { return this.y + this.h; };

  // horizontal
  get R () { return this.x + this.w; };
  get L () { return this.x; };

  get w () { return this.width; }
  get h () { return this.height; }


  update (pos) {
    this.x = pos.x;
    this.y = pos.y;

    this.middle.x = pos.x + this.width/2;
    this.middle.y = pos.y + this.height/2;
  }

  render (ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}