import React, { useCallback } from 'react';
import useStore from 'store/index';
import { IVector2, pointType } from 'types/index';
import { Vector2 } from 'three';
import { v } from 'helpers/vectors';
import Input from 'components/UI/Input';
import { IOption } from 'components/UI/Select';

type IProps = {
  index: number,
  pointType: pointType
}

const getLabel = ( pointType: pointType ) => {
  switch ( pointType ) {
    case 'helperPoint1': return 'point 1';
    default: return pointType as string;
  }
};

export default function Point( { index, pointType }: IProps ) {
  const updateSegment = useStore( ( state ) => state.updateSegment );
  const { x, y } = useStore( ( state ) => {
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

  const onXValueChange = useCallback( ( value: number ) => {
    updateSegment( index, { [ pointType ]: { x: value, y } } );
  }, [
    y,
    pointType,
    index,
    updateSegment
  ] );

  const onYValueChange = useCallback( ( value: number ) => {
    updateSegment( index, { [ pointType ]: { x, y: value } } );
  }, [
    x,
    pointType,
    index,
    updateSegment
  ] );

  return (
    <div style={ {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px'
    } }>
      <h4>{getLabel( pointType )}</h4>
      <Input
        label='x'
        value = { x }
        name='x'
        // @ts-ignore
        onValueChange={ onXValueChange }
      />
      <Input
        label='y'
        value = { y }
        name='y'
        // @ts-ignore
        onValueChange={ onYValueChange }
      />
    </div>
  );
}
