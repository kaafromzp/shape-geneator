import React, { useMemo } from 'react';
import useStore from 'store/index';
import { BufferGeometry, Path, Vector2 } from 'three';
import { IArcSegment, ILinearSegment, IVector2 } from 'types/index';
import { materialCurveUnselected } from 'helpers/material';
import { v } from '..';
import Point from 'containers/3D/Point';

type IProps = {
  index: number
}

export default function LinearSegment( { index }: IProps ) {
  const from: IVector2 = useStore( ( state ) => {
    const { type } = state.segments[ index - 1 ];
    switch ( type ) {
      case 'linear':
      case 'move':
        const to = ( state.segments[ index - 1 ] as ILinearSegment ).to;

        return { x: to.x, y: to.y };
      case 'arc':
        const center = ( state.segments[ index - 1 ] as IArcSegment ).center;
        const angleTo = ( state.segments[ index - 1 ] as IArcSegment ).angleTo;
        const radius = ( state.segments[ index - 1 ] as IArcSegment ).radius;
        v.set( center.x, center.y )
          .add(
            new Vector2( Math.cos( angleTo ), Math.sin( angleTo ) )
              .multiplyScalar( radius )
          );

        return { x: v.x, y: v.y };
      default:
        console.warn( `Type ${ type } is not defined` );

        return { x: 0, y: 0 };
    }
  } );
  const to = useStore( ( state ) => ( ( state.segments[ index ] as ILinearSegment ).to ) );

  const path = useMemo( () => (
    new Path()
      .moveTo( from.x, from.y )
      .lineTo( to.x, to.y )
  ), [
    from.x,
    from.y,
    to.x,
    to.y
  ] );

  const geometry = useMemo( () => (
    new BufferGeometry().setFromPoints( path.getPoints() )
  ), [path] );

  return (
    <>
      <Point index={ index } pointType='to'/>
      <lineSegments
        name='curve'
        geometry={ geometry }
        material={ materialCurveUnselected }
      />
    </>
  );
}
