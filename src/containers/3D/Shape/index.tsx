import React, { useMemo } from 'react';
import useStore from 'store/index';
import { ExtrudeGeometry, Shape as TShape } from 'three';
import { shapeMaterial } from 'helpers/material';
import getCurrentPoint from 'helpers/getCurrentPoint';


export default function Shape() {
  const segments = useStore( ( state ) => state.segments );
  const autoClose = useStore( ( state ) => state.autoClose );

  const to = getCurrentPoint( 0 );
  // const from: IVector2 = useStore( ( state ) => {
  //   const index = segments.length - 1;
  //   const { type } = state.segments[ index ];
  //   switch ( type ) {
  //     case 'linear':
  //     case 'move':
  //     case 'qBezier':
  //       const to = ( state.segments[ index ] as ILinearSegment ).to;

  //       return { x: to.x, y: to.y };
  //     case 'arc':
  //       const center = ( state.segments[ index ] as IArcSegment ).center;
  //       const angleTo = ( state.segments[ index ] as IArcSegment ).angleTo;
  //       const radius = ( state.segments[ index ] as IArcSegment ).radius;
  //       v.set( center.x, center.y )
  //         .add(
  //           new Vector2( Math.cos( angleTo ), Math.sin( angleTo ) )
  //             .multiplyScalar( radius )
  //         );

  //       return { x: v.x, y: v.y };
  //     default:
  //       console.warn( `Type ${ type } is not defined` );

  //       return { x: 0, y: 0 };
  //   }
  // } );

  const shape = useMemo( () => {
    const result = new TShape();
    segments.forEach( ( s ) => {
      switch ( s.type ) {
        case 'move':
          result.moveTo( s.to.x, s.to.y );
          break;
        case 'linear':
          result.lineTo( s.to.x, s.to.y );
          break;
        case 'arc':
          result.absarc( s.center.x, s.center.y, s.radius, s.angleFrom, s.angleTo, s.clockwise );
          break;
        case 'qBezier':
          result.quadraticCurveTo( s.helperPoint1.x, s.helperPoint1.y, s.to.x, s.to.y );
          break;
        default:
          break;
      }
    } );

    if ( autoClose ) {
      result.lineTo( to.x, to.y );
    }

    return result;
  }, [
    segments,
    autoClose,
    to.x,
    to.y
  ] );

  const geometry = useMemo( () => new ExtrudeGeometry( shape, { bevelEnabled: false, depth: 0.01 } ), [shape] );

  return (
    <mesh
      position={ [
        0,
        0,
        -0.01
      ] } geometry={ geometry } material = { shapeMaterial } />
  );
}
