import React, { useCallback, useMemo, useRef } from 'react';
import { planeGeometry } from 'helpers/geometry';
import { ThreeEvent, useLoader } from '@react-three/fiber';
import {
  CanvasTexture,
  ImageBitmapLoader,
  MeshBasicMaterial,
  RepeatWrapping,
  RGBAFormat,
  SRGBColorSpace,
  Vector2
} from 'three';
import { layersRaycast } from 'helpers/layers';
import useStore from 'store/index';


export default function Plane() {
  const materialRef = useRef<MeshBasicMaterial>( null );
  const imageBitmap = useLoader( ImageBitmapLoader, '/assets/textures/grid-texture.jpg', ( loader ) => {
    loader.setOptions( { imageOrientation: 'flipY' } );
  } );

  const texture = useMemo( () => {
    const texture = new CanvasTexture( imageBitmap );
    texture.colorSpace = SRGBColorSpace;
    texture.generateMipmaps = false;

    texture.format = RGBAFormat;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat = new Vector2( 100, 100 );
    texture.flipY = false;
    texture.needsUpdate = true;
    if ( materialRef.current ) {
      materialRef.current.map = texture;
      materialRef.current.map.needsUpdate = true;
      materialRef.current.needsUpdate = true;
    }

    return texture;

  }, [imageBitmap] );

  const updateSegment = useStore( ( state ) => ( state.updateSegment ) );
  const setDraggedSegment = useStore( ( state ) => ( state.setDraggedSegment ) );
  const setSelectedSegment = useStore( ( state ) => ( state.setSelectedSegment ) );
  const draggedIndex = useStore( ( state ) => ( state.draggedIndex ) );
  const draggedType = useStore( ( state ) => ( state.draggedType ) );
  const onPointerMove = useCallback( ( e: ThreeEvent<PointerEvent> ) => {
    // console.log( 'plane move', draggedIndex, draggedType, e.unprojectedPoint );
    if ( draggedIndex !== null && draggedType !== null ) {
      updateSegment( draggedIndex, { [ draggedType ]: { x: Math.round( e.unprojectedPoint.x * 10 ) * 0.1, y: Math.round( e.unprojectedPoint.y * 10 ) * 0.1 } } );
    }
  }, [
    draggedIndex,
    draggedType,
    updateSegment
  ] );

  const onPointerDown = useCallback( () => {
    setDraggedSegment( null, null );
    setSelectedSegment( null, null );
  }, [setDraggedSegment, setSelectedSegment] );

  const onPointerUp = useCallback( ( ) => {
    setDraggedSegment( null, null );
  }, [setDraggedSegment] );

  return (
    <mesh
      position={ [
        0,
        0,
        -1
      ] }
      layers={ layersRaycast }
      onPointerMove={ onPointerMove }
      onPointerDown={ onPointerDown }
      onPointerUp={ onPointerUp }
      geometry = { planeGeometry }
    >
      <meshBasicMaterial transparent opacity={ 0.2 } map={ texture } ref={ materialRef }/>
    </mesh>
  );
}
