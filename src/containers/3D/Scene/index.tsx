import React, { useEffect, useRef } from 'react';
import useStore from 'store/index';
import Segment from '../Segment';
import { circleGeometry } from 'helpers/geometry';
import { materialOrigin } from 'helpers/material';
import Plane from '../Plane';
import LineCurve from '../LineCurve';
import R3FStoreProvider from 'components/UI/R3FStoreProvider';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, Object3DNode, useThree } from '@react-three/fiber';
import getCurrentPoint from 'helpers/getCurrentPoint';
import { IArcSegment, ILinearSegment, IVector2 } from 'types/index';
import { Vector2 } from 'three';
import { v } from 'helpers/vectors';
import Shape from '../Shape';

extend( { OrbitControls } );
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'orbitControls': Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

export type sizes = {
  width: number;
  height: number;
}


export default function Scene() {
  const ref = useRef<OrbitControls>( null );
  const segments = useStore( ( state ) => state.segments );
  const autoClose = useStore( ( state ) => state.autoClose );
  const camera = useThree( ( state ) => state.camera );
  const domElement = useThree( ( state ) => state.gl.domElement );

  const to = getCurrentPoint( 0 );
  const from: IVector2 = useStore( ( state ) => {
    const index = segments.length - 1;
    const { type } = state.segments[ index ];
    switch ( type ) {
      case 'linear':
      case 'move':
      case 'qBezier':
        const to = ( state.segments[ index ] as ILinearSegment ).to;

        return { x: to.x, y: to.y };
      case 'arc':
        const center = ( state.segments[ index ] as IArcSegment ).center;
        const angleTo = ( state.segments[ index ] as IArcSegment ).angleTo;
        const radius = ( state.segments[ index ] as IArcSegment ).radius;
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
  const set = useThree( ( state ) => state.set );
  useEffect( () => {
    set( { controls: ref.current as OrbitControls } );
  }, [set] );

  const fitSceneToCameraFrustum = useStore( ( state ) => state.fitSceneToCameraFrustum );

  useEffect( () => {
    fitSceneToCameraFrustum();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  return (
    <>
      <R3FStoreProvider/>
      <orbitControls maxZoom={ 15 } minZoom = { 0.2 }ref={ ref } args={ [camera, domElement] } enableRotate={ false } />
      <Plane/>
      <group
        name='bBoxBase'
      >
        {( autoClose || ( Math.sqrt( Math.pow( to.x - from.x, 2 ) + Math.pow( to.y - from.y, 2 ) ) < 1e-3 ) ) &&
          <Shape/>
        }
        <mesh geometry={ circleGeometry } material={ materialOrigin }/>
        {segments.map( ( s, i ) => ( <Segment key={ i } index={ i }/> ) )}
        {autoClose && <LineCurve from={ from } to={ to }/> }

      </group>
    </>
  );
}
