import React, { useMemo } from 'react';
import useStore from 'store/index';
import { Vector2 } from 'three';
import { IArcSegment, ILinearSegment, IVector2 } from 'types/index';
import Point from 'containers/3D/Point';
import LineCurve from '../../../../containers/3D/LineCurve';
import ArcCurve from 'containers/3D/ArcCurve';
import { v } from 'helpers/vectors';

type IProps = {
  index: number
}

export default function ArcSegment( { index }: IProps ) {
  const from: IVector2 = useStore( ( state ) => {
    const { type } = state.segments[ index - 1 ];
    switch ( type ) {
      case 'linear':
      case 'move':
      case 'qBezier':
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
  const center = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).center ) );
  const angleFrom = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).angleFrom ) );
  const angleTo = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).angleTo ) );
  const radius = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).radius ) );
  const clockwise = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).clockwise ) );

  const pointFrom = useMemo( () => {
    v.set( center.x, center.y )
      .add(
        new Vector2( Math.cos( angleFrom ), Math.sin( angleFrom ) )
          .multiplyScalar( radius )
      );

    return { x: v.x, y: v.y };
  }, [
    center,
    angleFrom,
    radius
  ] );

  return (
    <>
      <Point index={ index } pointType='center'/>
      {
        ( Math.abs( from.x - pointFrom.x ) > 1e-3 || Math.abs( from.y - pointFrom.y ) > 1e-3 ) && (
          <>
            <Point index={ index } pointType= 'from' />
            <LineCurve from={ from } to={ pointFrom }/>
          </>
        )
      }
      <Point index={ index } pointType= 'to' />
      <ArcCurve
        center={ center }
        radius={ radius }
        angleFrom={ angleFrom }
        angleTo={ angleTo }
        clockwise={ clockwise }
      />
    </>
  );

}
