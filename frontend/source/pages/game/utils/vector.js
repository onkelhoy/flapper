export default class Vector {
  constructor (x, y) {
    if (x instanceof Object)
    {
      this.x = x.x;
      this.y = x.y;
    }
    this.x = x;
    this.y = y;
  }

  // length & angle logic
  get length () {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  set length (length) {
    const angle = this.angle;
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }
  get angle () {
    return Math.atan2(this.y, this.x);
  }
  set angle (angle) {
    const length = this.length;
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  // operations that affect object
  add (v) {
    this.x += v.x;
    this.y += v.y;
  }
  subtract (v) {
    this.x -= v.x;
    this.y -= v.y;
  }
  multiply (n) {
    this.x *= n;
    this.y *= n;
  }

  // mathmatical operators
  plus (v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  minus (v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
  times (n) {
    return new Vector(this.x * n, this.y * n);
  }

  render (ctx, radius = 5, color = 'orange') {
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  /**
   * gets the distance between two Vectors
   * @param {Vector} a
   * @param {Vector} b
   */
  static Distance (a, b) {
    const diff = a.minus(b);
    return diff.length;
  }
  
  /**
   * gets the angle between two Vectors 
   * @param {Vector} a 
   * @param {Vector} b 
   */
  static AngleBetween (a, b) {
    const diff = a.minus(b);
    return diff.angle;
  }

  /**
   * creates a deep clone of the given vector objecv
   * @param {Vector} v 
   */
  static Clone (v) {
    return new Vector(v.x, v.y);
  }
}