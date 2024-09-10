import { materialCurveUnselected } from 'helpers/material';
import React, { useMemo } from 'react';
import { CatmullRomCurve3, Path, TubeGeometry, Vector3 } from 'three';
import { IVector2 } from 'types/index';

type IProps = {
  center: IVector2,
  radius: number,
  angleFrom: number,
  angleTo: number,
  clockwise?: boolean
}

export default function Arc( { center, radius, angleFrom, angleTo, clockwise = false }: IProps ) {
  const points = useMemo( () => (
    new Path()
      .absarc( center.x, center.y, radius, angleFrom, angleTo, clockwise )
      .getPoints()
  ), [
    clockwise,
    center.x,
    center.y,
    radius,
    angleFrom,
    angleTo
  ] );
  const curve = useMemo( () => (
    new CatmullRomCurve3( points.map( ( v2 ) => new Vector3( v2.x, v2.y, 0 ) ) )
  ), [points] );

  const geometry = useMemo( () => (
    new TubeGeometry( curve, 200, 0.01, 8 )
  ), [curve] );

  return(
    <mesh geometry={ geometry } material={ materialCurveUnselected }/>
  );
}
