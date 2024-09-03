import { ThreeEvent } from '@react-three/fiber';
import { circleGeometry } from 'helpers/geometry';
import { layersRaycast } from 'helpers/layers';
import { materialPointSelected, materialPointUnselected } from 'helpers/material';
import React, { useCallback } from 'react';
import useStore from 'store/index';
import { pointType } from 'types/index';

type IProps = {
  index: number,
  pointType: pointType
}

export default function Point( { index, pointType }: IProps ) {
  // @ts-ignore
  const point = useStore( ( state ) => ( ( state.segments[ index ] )[ pointType ] ) );
  const setSelectedSegment = useStore( ( state ) => ( state.setSelectedSegment ) );
  const setDraggedSegment = useStore( ( state ) => ( state.setDraggedSegment ) );
  const selectedIndex = useStore( ( state ) => ( state.selectedIndex ) );
  const selectedType = useStore( ( state ) => ( state.selectedType ) );
  const draggedIndex = useStore( ( state ) => ( state.draggedIndex ) );
  const draggedType = useStore( ( state ) => ( state.draggedType ) );

  const onPointerEnter = useCallback( ( ) => {
    if ( draggedIndex === null && draggedType === null ) {
      setSelectedSegment( index, pointType );
    }
  }, [
    setSelectedSegment,
    draggedIndex,
    draggedType,
    pointType,
    index
  ] );

  const onPointerLeave = useCallback( ( ) => {
    if ( draggedIndex === null && draggedType === null ) {
      setSelectedSegment( null, null );
    }
  }, [
    setSelectedSegment,
    draggedIndex,
    draggedType
  ] );

  const onPointerDown = useCallback( ( e: ThreeEvent<PointerEvent> ) => {
    setDraggedSegment( index, pointType );
    e.stopPropagation();
  }, [
    setDraggedSegment,
    index,
    pointType
  ] );

  return (
    <mesh
      position={ [
        point.x,
        point.y,
        0
      ] }
      name={ pointType }
      layers={ layersRaycast }
      onPointerEnter={ onPointerEnter }
      onPointerLeave={ onPointerLeave }
      onPointerDown={ onPointerDown }
      geometry={ circleGeometry }
      material={ ( ( selectedIndex === index ) && ( selectedType === pointType ) )
        ? materialPointSelected
        : materialPointUnselected
      }
    />
  );
}
