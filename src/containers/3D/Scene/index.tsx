import React, { useEffect, useRef } from 'react';
import useStore from 'store/index';
import Segment from '../Segment';
import { circleGeometry } from 'helpers/geometry';
import { materialOrigin } from 'helpers/material';
import Plane from '../Plane';
import R3FStoreProvider from 'components/UI/R3FStoreProvider';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, Object3DNode, useThree } from '@react-three/fiber';

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
  const camera = useThree( ( state ) => state.camera );
  const domElement = useThree( ( state ) => state.gl.domElement );
  const set = useThree( ( state ) => state.set );
  // @ts-ignore
  window.camera = camera;
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
        <mesh geometry={ circleGeometry } material={ materialOrigin }/>
        {segments.map( ( s, i ) => ( <Segment key={ i } index={ i }/> ) )}
      </group>
    </>
  );
}
