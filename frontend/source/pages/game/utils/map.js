import { loadImage, Intersections } from "./helpers";
import Rectangle from "./rectangle";

export default class Map {
  constructor (dimension) {
    this.background = null;
    this.trees = [];
    this.dimension = dimension;

    this.interval = 0;
    this.next = Math.random() * 100 + 30;
    this.index = ~~(Math.random() * 2);
    this.count = ~~(Math.random() * 8 + 5);
    this.counter = 0;
    this.currentTrees = [];

    this.treeDims = [302, 256, 273];
  }

  async load () {
    try {
      this.background = await loadImage('background.svg');
      this.trees[0] = await loadImage('tree1.svg');
      this.trees[1] = await loadImage('tree2.svg');
      this.trees[2] = await loadImage('tree3.svg');

      this.trees[3] = await loadImage('tree1inverse.svg');
      this.trees[4] = await loadImage('tree2inverse.svg');
      this.trees[5] = await loadImage('tree3inverse.svg');
    }
    catch (error) {
      throw new Error(error);
    }
  }

  generateTree (index, scale, x, y, w, h) {
    if (this.host) {
      // notify the other !! 
    }
    
    this.currentTrees.push({
      index, scale, rec: new Rectangle(x, y, w, h),
    });
  }

  render (ctx, rec) {
    ctx.drawImage(this.background, (rec.x-200)/1.1, 0, 2000, 1800);

    for (let tree of this.currentTrees) {

      let index = tree.index
      if (Intersections.AABB(rec, tree.rec))
      {
        index += 3;

        const thrunk = new Rectangle(
          tree.rec.x + tree.rec.width/2 - 7*tree.scale, 
          tree.rec.y + tree.rec.height - this.treeDims[tree.index]*tree.scale,
          14*tree.scale,
          this.treeDims[tree.index]*tree.scale,
        );

        if (Intersections.AABB(rec, thrunk))
        {
          // loose
          console.log('PLAYER LOOSE')
          // notify the other 
        }
      }
      
      // tree.rec.render(ctx);
      ctx.drawImage(this.trees[index], tree.rec.x, tree.rec.y, tree.rec.width, tree.rec.height);
    }

    if (this.interval > this.next) {
      this.interval = 0;
      this.next = Math.random() * 200 + 90;

      const scale = Math.random() + 1
      const h = this.trees[this.index].height * scale;

      this.generateTree(this.index, scale, rec.x + GAME.width, 1800 - h, this.trees[this.index].width * scale, h);

      this.counter++;
      if (this.counter > this.count) {
        this.index = ~~(Math.random() * 2) + 1;
        this.count = ~~(Math.random() * 8 + 5);
        this.counter = 0;
      }
    }

    this.interval++;
  }
}