import { ThreeEvent } from '@react-three/fiber';
import { circleGeometry } from 'helpers/geometry';
import { layersRaycast } from 'helpers/layers';
import { materialPointOnArcUnselected, materialPointSelected, materialPointUnselected } from 'helpers/material';
import React, { useCallback, useMemo } from 'react';
import useStore from 'store/index';
import { IVector2, pointType } from 'types/index';
import { Vector2 } from 'three';
import { v } from 'helpers/vectors';

type IProps = {
  index: number,
  pointType: pointType
}

export default function Point( { index, pointType }: IProps ) {
  const point = useStore( ( state ) => {
    const segment = state.segments[ index ];
    switch ( segment.type ) {
      case 'linear':
      case 'move':
      case 'qBezier':
        // @ts-ignore
        return segment[ pointType ] as IVector2;
      case 'arc':
        if ( pointType === 'center' ) {
          return segment[ pointType ];
        }

        v.set( segment.center.x, segment.center.y )
          .add(
            new Vector2(
              Math.cos( pointType === 'from' ? segment.angleFrom : segment.angleTo ),
              Math.sin( pointType === 'from' ? segment.angleFrom : segment.angleTo )
            )
              .multiplyScalar( segment.radius )
          );

        return { x: v.x, y: v.y };
      default:
        // @ts-ignore
        console.warn( `Type ${ pointType } on segment type ${ segment.type } is not defined` );

        return { x: 0, y: 0 };
    }
  } );
  const materialUnselected = useStore( ( state ) => {
    const segment = state.segments[ index ];
    if ( segment.type === 'arc' && ( ['from', 'to'] as ( pointType | null )[] ).includes( pointType ) ) {
      return materialPointOnArcUnselected;
    }

    return materialPointUnselected;
  } );
  const beginUndoGroup = useStore( ( state ) => ( state.beginUndoGroup ) );
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
    beginUndoGroup();
    setDraggedSegment( index, pointType );
    e.stopPropagation();
  }, [
    beginUndoGroup,
    setDraggedSegment,
    index,
    pointType
  ] );

  return (
    <mesh
      position={ [
        point.x,
        point.y,
        0.1
      ] }
      name={ pointType }
      layers={ layersRaycast }
      onPointerEnter={ onPointerEnter }
      onPointerLeave={ onPointerLeave }
      onPointerDown={ onPointerDown }
      geometry={ circleGeometry }
      material={ ( ( selectedIndex === index ) && ( selectedType === pointType ) )
        ? materialPointSelected
        : materialUnselected
      }
    />
  );
}
