import { extend, createRoot, events } from '@react-three/fiber';
import { layersAll, layersRaycast } from 'helpers/layers';
import React, { FC, PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import useStore from 'store/index';
import * as THREE from 'three';

// Register the THREE namespace as native JSX elements.
// See below for notes on tree-shaking
extend( THREE );

const Canvas: FC<PropsWithChildren> = ( { children } ) => {
  const ref = useRef<HTMLDivElement>( null );
  const canvas = useMemo( () => document.createElement( 'canvas' ), [] );
  const root = useMemo( () => {
    const root = createRoot( canvas );

    root.configure( {
      events,
      raycaster: { layers: layersRaycast },
      frameloop: 'demand',
      orthographic: true,
      camera: {
        position: [
          0,
          0,
          1
        ],
        left: -5,
        right: 5,
        top: 5,
        bottom: -5,
        layers: layersAll
      }
    } );

    window.addEventListener( 'resize', ( ) => {
      root.configure( { size: { width: window.innerWidth, height: window.innerHeight, left: 0, top: 0 } } );
    } );

    // // Trigger resize
    window.dispatchEvent( new Event( 'resize' ) );
    // canvas.addEventListener( 'pointermove', ( e ) => {
    //   const { draggedIndex, draggedType, updateSegment } = useStore.getState();
    //   if ( draggedIndex && draggedType ) {
    //     updateSegment( draggedIndex, { to: { x: e.unprojectedPoint.x, y: e.unprojectedPoint.y } } );
    //   }
    // } );

    return root;

  }, [canvas] );

  useEffect( () => {
    const div = ref.current as HTMLDivElement;
    div.appendChild( canvas );

    return () => {
      div.removeChild( canvas );
      // root.unmount();
    };
  }, [root, canvas] );

  useEffect( () => {
    root.render( children );
  }, [children, root] );

  return (
    <div
      ref={ ref }
      // style={ { position: 'absolute', top: '100px', left: 0, width: '300px', height: '200px' } }
    />
  );
};

export default Canvas;
