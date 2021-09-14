import { clamp } from '../utils/index';

const [ min, max, total ] = [ 1, 32, 32 * 32 ];

export default function parse_grid(size) {
  // 10=>10,undefined,undefined. 10,5=> 10,5,undefined
  let [x, y, z] = (size + '')
    .replace(/\s+/g, '')
    .replace(/[,，xX]+/g, 'x')
    .split('x')
    .map(n => parseInt(n));
  // 只有1行或者1列的情况，xy最大为32*32
  const max_xy = (x == 1 || y == 1) ? total : max;
  const max_z = (x == 1 && y == 1) ? total : min;

  const ret = {
    x: clamp(x || min, 1, max_xy),
    y: clamp(y || x || min, 1, max_xy),
    z: clamp(z || min, 1, max_z)
  };

  return Object.assign({}, ret, {
    count: ret.x * ret.y * ret.z,
    ratio: ret.x / ret.y
  });
}
