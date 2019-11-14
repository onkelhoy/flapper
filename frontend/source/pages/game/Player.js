import Vector from "./utils/vector";
import Rectangle from "./utils/rectangle";

export default class Player {
  constructor (airplane) {
    this.image = new Image();
    this.image.src = `/content/airplane(${airplane}).svg`

    this.position = new Vector(100, 100);
    this.velocity = new Vector(3, 0);
    this.width = 0;
    this.height = 0;
    this.points = 0;

    this.rec = new Rectangle(this.position.x, this.position.y, 0, 0)
  }

  load () {
    return new Promise((resolve, reject) => {
      this.image.onload = () => {
        this.width = this.image.width;
        this.height = this.image.height;

        this.rec.width = this.width * 0.3;
        this.rec.height = this.height * 0.3;

        resolve();
      }
      this.image.onerror = reject;
    });
  }

  jump () {
    if (this.velocity.y > -15) this.velocity.y = -10;
  }

  update (dimmension) {
    if (this.position.x >= dimmension.width) {
      this.position.x = dimmension.width;
      // goal reached !! 
    }
    else {
      if (this.velocity.y < 15)  this.velocity.y += 0.5;
      this.position.add(this.velocity);
  
      if (this.position.y > dimmension.height + 500) this.position.y = dimmension.height + 500;
  
      this.rec.x = this.position.x + this.width - this.rec.width/2;
      this.rec.y = this.position.y + 500 - this.rec.height/2;
  
      this.points += 1 + ~~(this.position.y/1000);
    }
  }

  render (ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.position.x+this.width, this.position.y + 500);
    ctx.rotate(Math.atan2(this.velocity.y, this.velocity.x));
    ctx.scale(-0.3, 0.3);
    ctx.drawImage(this.image, -this.width/2, -this.height/2)
    ctx.restore();

    // this.rec.render(ctx);
    ctx.closePath();
  }
}