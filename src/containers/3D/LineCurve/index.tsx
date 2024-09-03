import { materialCurveUnselected } from 'helpers/material';
import React, { useMemo } from 'react';
import { LineCurve3, TubeGeometry, Vector3 } from 'three';
import { IVector2 } from 'types/index';

type IProps = {
  from: IVector2
  to: IVector2
}

export default function Line( { from, to }: IProps ) {
  const curve = useMemo( () => (
    new LineCurve3( new Vector3( from.x, from.y, 0 ), new Vector3( to.x, to.y, 0 ) )
  ), [
    from.x,
    from.y,
    to.x,
    to.y
  ] );

  const geometry = useMemo( () => (
    // new BufferGeometry().setFromPoints( path.getPoints() )
    new TubeGeometry( curve, 20, 0.01, 8 )
  ), [curve] );

  return(
    <mesh geometry={ geometry } material={ materialCurveUnselected }/>
  );
}
