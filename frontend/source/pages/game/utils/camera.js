import Vector from './vector';

export default class Camera extends Vector {

  /**
   * 
   * @param {Rectangle} world_boundary 
   */
  constructor (world_boundary, dimensions) {
    super(0, 0);
    this.boundary = world_boundary;
    this.dimensions = dimensions;

    this.deadZone = {};
    this.lookAhead = {};

    this.settings();
  }

  follow (target) {
    this.target = target;
  }

  settings ({ lookAhead = {}, deadZone = {} } = {}) {
    this.deadZone = {...this.deadZone, ...deadZone};
    this.lookAhead = {...this.lookAhead, ...lookAhead};
  }

  preRender(ctx) {
    let x = -this.target.position.x + this.dimensions.width/2 - 0;
    let y = -this.target.position.y + this.dimensions.height/2 - this.target.height / 2;
    
    this.boundaryCheck(x, y);

    ctx.translate(-this.x, -this.y);
  }

  boundaryCheck (x, y)
  {
    if (-x < this.boundary.x)
    {
      x = -this.boundary.x;
    }
    else if (-x > this.boundary.x + this.boundary.w - this.dimensions.w)
    {
      x = -(this.boundary.x + this.boundary.w - this.dimensions.w);
    }

    if (-y < this.boundary.y)
    {
      y = -this.boundary.y;
    }
    else if (-y > this.boundary.y + this.boundary.h - this.dimensions.h)
    {
      y = -(this.boundary.y + this.boundary.h - this.dimensions.h);
    }

    this.x = -x;
    this.y = -y;
  }

  postRender(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}