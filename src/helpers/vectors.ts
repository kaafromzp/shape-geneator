import { Vector2 } from 'three';

export const v = new Vector2();

export const findCircleAngleNearestToGivenPoint = ( point: Vector2, center: Vector2, radius: number ) => {
  const v = point.clone().sub( center );

  return point.clone().multiplyScalar( 1 / v.length() / radius )
    .sub( center )
    .angle();

};
