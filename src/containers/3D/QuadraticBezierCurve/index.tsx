import { materialCurveUnselected } from 'helpers/material';
import React, { useMemo } from 'react';
import { QuadraticBezierCurve3, TubeGeometry, Vector3 } from 'three';
import { IVector2 } from 'types/index';

type IProps = {
  from: IVector2
  helperPoint1: IVector2
  to: IVector2
}

export default function QuadraticBezierCurve( { from, helperPoint1, to }: IProps ) {
  const curve = useMemo( () => (
    new QuadraticBezierCurve3(
      new Vector3( from.x, from.y, 0 ),
      new Vector3( helperPoint1.x, helperPoint1.y, 0 ),
      new Vector3( to.x, to.y, 0 )
    )
  ), [
    from.x,
    from.y,
    helperPoint1.x,
    helperPoint1.y,
    to.x,
    to.y
  ] );

  const geometry = useMemo( () => (
    new TubeGeometry( curve, 200, 0.01, 8 )
  ), [curve] );

  return(
    <mesh geometry={ geometry } material={ materialCurveUnselected }/>
  );
}
