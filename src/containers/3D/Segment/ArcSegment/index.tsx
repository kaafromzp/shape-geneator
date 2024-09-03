import React, { useMemo } from 'react';
import useStore from 'store/index';
import { BufferGeometry, Path, Vector2 } from 'three';
import { IArcSegment, ILinearSegment, IVector2 } from 'types/index';
import { v } from '..';
import { circleGeometry } from 'helpers/geometry';
import { materialCurveUnselected, materialPointUnselected } from 'helpers/material';
import Point from 'containers/3D/Point';

type IProps = {
  index: number
}

export default function ArcSegment( { index }: IProps ) {
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
  const center = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).center ) );
  const angleFrom = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).angleFrom ) );
  const angleTo = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).angleTo ) );
  const radius = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).radius ) );

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

  const pointTo = useMemo( () => {
    v.set( center.x, center.y )
      .add(
        new Vector2( Math.cos( angleTo ), Math.sin( angleTo ) )
          .multiplyScalar( radius )
      );

    return { x: v.x, y: v.y };
  }, [
    center,
    angleTo,
    radius
  ] );

  const path = useMemo( () => (
    new Path()
      .absarc( center.x, center.y, radius, angleFrom, angleTo, true )
  ), [
    center,
    radius,
    angleFrom,
    angleTo
  ] );

  const geometry = useMemo( () => (
    new BufferGeometry().setFromPoints( path.getPoints( 10 ) )
  ), [path] );

  const linePath = useMemo( () => (
    new Path()
      .moveTo( from.x, from.y )
      .lineTo( pointFrom.x, pointFrom.y )
  ), [
    from.x,
    from.y,
    pointFrom.x,
    pointFrom.y
  ] );

  const lineGeometry = useMemo( () => (
    new BufferGeometry().setFromPoints( linePath.getPoints( 10 ) )
  ), [linePath] );


  return (
    <>
      <Point index={ index } pointType='center'/>
      <lineSegments
        name='curve'
        geometry={ lineGeometry }
        material={ materialCurveUnselected }
      />
      <mesh
        position={ [
          pointFrom.x,
          pointFrom.y,
          0
        ] }
        name='from'
        geometry={ circleGeometry }
        material={ materialPointUnselected }
      />
      <mesh
        position={ [
          pointTo.x,
          pointTo.y,
          0
        ] }
        name='to'
        geometry={ circleGeometry }
        material={ materialPointUnselected }
      />
      <lineSegments
        name='curve'
        geometry={ geometry }
        material={ materialCurveUnselected }
      />
    </>

  );

}
