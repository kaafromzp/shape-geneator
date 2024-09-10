import { extend, createRoot, events, RootState } from '@react-three/fiber';
import { layersAll, layersRaycast } from 'helpers/layers';
import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Register the THREE namespace as native JSX elements.
extend( THREE );

const canvas = document.createElement( 'canvas' );
canvas.style.display = 'block';

const root = createRoot( canvas );

const onCreated = ( state: RootState ) => {
  state.setEvents( {
    compute: ( event, state ) => {
      const x = event.clientX;
      const y = event.clientY;
      state.pointer.set( x / state.size.width * 2 - 1, -( y / state.size.height ) * 2 + 1 );
      state.raycaster.setFromCamera( state.pointer, state.camera );
    }
  } );

  if ( state && state.events && state.events.connect ) {
    state.events.connect( window );
  }
};
root.configure( {
  events,
  raycaster: { layers: layersRaycast },
  size: { width: window.innerWidth, height: window.innerHeight, left: 0, top: 0 },
  frameloop: 'demand',
  dpr: window.devicePixelRatio,
  orthographic: true,
  camera: {
    position: [
      0,
      0,
      1e10
    ],
    near: 1,
    far: 1e11,
    left: -5,
    right: 5,
    top: 5,
    bottom: -5,
    layers: layersAll
  },
  onCreated
} );

const onResize = ( ) => {
  root.configure( { onCreated, dpr: window.devicePixelRatio, size: { width: window.innerWidth, height: window.innerHeight, left: 0, top: 0 } } );
};

window.addEventListener( 'resize', onResize );

window.dispatchEvent( new Event( 'resize' ) );

const Canvas: FC<PropsWithChildren> = ( { children } ) => {
  const ref = useRef<HTMLDivElement>( null );
  useEffect( () => {
    const div = ref.current as HTMLDivElement;
    div.appendChild( canvas );

    return () => {
      div.removeChild( canvas );
    };
  }, [] );

  useEffect( () => {
    root.render( children );
  }, [children] );

  return (
    <div ref={ ref }/>
  );
};

export default Canvas;
