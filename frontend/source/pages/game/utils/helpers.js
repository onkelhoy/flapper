import Rectangle from "./rectangle";

export const loadImage = (url) => {
  const image = new Image();
  image.src = "/content/"+url;

  return new Promise((res, rej) => {
    image.onload = () => {
      res(image);
    }

    image.onerror = rej;
  });
}

export class Intersections {
  static AABB (a, b, color = 'black') {
    // rectangle-ractangle intersection

    if (a.L < b.R &&
        a.R > b.L &&
        a.T < b.B &&
        a.B > b.T)
    {
      const x = Math.max(a.L, b.L);
      const y = Math.max(a.T, b.T);

      // return the intersection area from the perspective of a
      return new Rectangle( // the intersection area
        x,
        y,
        Math.min(a.R-x, b.R-x),
        Math.min(a.B-y, b.B-y),
        color
      );
    }

    return false;
  }
}