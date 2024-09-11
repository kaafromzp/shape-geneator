import React, { useCallback, useMemo, useRef } from 'react';
import { planeGeometry } from 'helpers/geometry';
import { ThreeEvent, useLoader } from '@react-three/fiber';
import {
  CanvasTexture,
  ImageBitmapLoader,
  MeshBasicMaterial,
  NearestFilter,
  RepeatWrapping,
  RGBAFormat,
  SRGBColorSpace,
  Vector2
} from 'three';
import { layersRaycast } from 'helpers/layers';
import useStore from 'store/index';
import { pointType } from 'types/index';
import { findCircleAngleNearestToGivenPoint } from 'helpers/vectors';

export default function Plane() {
  const materialRef = useRef<MeshBasicMaterial>( null );
  const imageBitmap = useLoader( ImageBitmapLoader, '/assets/textures/grid.png', ( loader ) => {
    loader.setOptions( { imageOrientation: 'flipY' } );
  } );

  const grid = useStore( ( state ) => state.grid );

  const texture = useMemo( () => {
    const texture = new CanvasTexture( imageBitmap );
    texture.colorSpace = SRGBColorSpace;
    texture.generateMipmaps = false;

    texture.format = RGBAFormat;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.minFilter = NearestFilter;
    texture.magFilter = NearestFilter;
    texture.repeat = new Vector2( 25 / grid, 25 / grid );
    texture.flipY = false;
    texture.needsUpdate = true;
    if ( materialRef.current ) {
      materialRef.current.map = texture;
      materialRef.current.map.needsUpdate = true;
      materialRef.current.needsUpdate = true;
    }

    return texture;

  }, [imageBitmap, grid] );

  const endUndoGroup = useStore( ( state ) => ( state.endUndoGroup ) );
  const updateSegment = useStore( ( state ) => ( state.updateSegment ) );
  const setDraggedSegment = useStore( ( state ) => ( state.setDraggedSegment ) );
  const setSelectedSegment = useStore( ( state ) => ( state.setSelectedSegment ) );
  const draggedIndex = useStore( ( state ) => ( state.draggedIndex ) );
  const draggedType = useStore( ( state ) => ( state.draggedType ) );
  const onPointerMove = useCallback( ( e: ThreeEvent<PointerEvent> ) => {
    if ( draggedIndex !== null && draggedType !== null ) {
      const store = useStore.getState();
      const segment = store.segments[ draggedIndex ];
      const unprojectedPoint = e.point.clone();
      if ( segment.type === 'arc' && ( ['from', 'to'] as pointType[] ).includes( draggedType ) ) {
        const angle = Math.round( 180 / Math.PI * findCircleAngleNearestToGivenPoint(
          new Vector2( unprojectedPoint.x, unprojectedPoint.y ),
          new Vector2( segment.center.x, segment.center.y ),
          segment.radius
        ) * ( 1 / store.snapAngle ) ) * store.snapAngle * Math.PI / 180;

        return updateSegment( draggedIndex, draggedType === 'to' ? { angleTo: angle } : { angleFrom: angle } );
      }

      // rounding - connect to store switch
      unprojectedPoint.x = Math.round( unprojectedPoint.x * ( 1 / store.snapGrid ) ) * store.snapGrid;
      unprojectedPoint.y = Math.round( unprojectedPoint.y * ( 1 / store.snapGrid ) ) * store.snapGrid;

      // dispatching result
      updateSegment( draggedIndex, { [ draggedType ]: { x: unprojectedPoint.x, y: unprojectedPoint.y } } );
    }
  }, [
    draggedIndex,
    draggedType,
    updateSegment
  ] );

  const onPointerDown = useCallback( () => {
    const draggedIndex = useStore.getState().draggedIndex;

    if ( draggedIndex !== null ) {
      setDraggedSegment( null, null );
      setSelectedSegment( null, null );
    }
  }, [setDraggedSegment, setSelectedSegment] );

  const onPointerUp = useCallback( ( ) => {
    const draggedIndex = useStore.getState().draggedIndex;
    if ( draggedIndex !== null ) {
      setDraggedSegment( null, null );
      endUndoGroup();
    }
  }, [setDraggedSegment, endUndoGroup] );

  return (
    <mesh
      position={ [
        0,
        0,
        -0.01
      ] }
      layers={ layersRaycast }
      onPointerMove={ onPointerMove }
      onPointerDown={ onPointerDown }
      onPointerUp={ onPointerUp }
      geometry = { planeGeometry }
    >
      <meshBasicMaterial transparent opacity={ 0.4 } map={ texture } ref={ materialRef }/>
    </mesh>
  );
}
