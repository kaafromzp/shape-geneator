import React, { useCallback } from 'react';
import useStore from 'store/index';
import { IArcSegment } from 'types/index';
import Point from 'containers/UI/Point';
import Input from 'components/UI/Input';
import Checkbox from 'components/UI/Checkbox';

type IProps = {
  index: number
}

export default function ArcSegment( { index }: IProps ) {
  const updateSegment = useStore( ( state ) => state.updateSegment );
  const angleFrom = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).angleFrom ) );
  const angleTo = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).angleTo ) );
  const radius = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).radius ) );
  const clockwise = useStore( ( state ) => ( ( state.segments[ index ] as IArcSegment ).clockwise ) );

  const handleChangeClockwise = useCallback( ( value: boolean ) => {
    updateSegment( index, { clockwise: value } );
  }, [updateSegment, index] );

  const onRadiusChange = useCallback( ( value: number ) => {
    updateSegment( index, { radius: value } );
  }, [updateSegment, index] );

  const onAngleFromChange = useCallback( ( value: number ) => {
    updateSegment( index, { angleFrom: value / 180 * Math.PI } );
  }, [updateSegment, index] );

  const onAngleToChange = useCallback( ( value: number ) => {
    updateSegment( index, { angleTo: value } );
  }, [updateSegment, index] );

  return (
    <div style={ {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'end',
      alignItems: 'center',
      gap: '10px'
    } }>
      <>
        <div style={ {
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          gap: '10px'
        } }>
          <h4>Arc</h4>
          <Point index={ index } pointType='center'/>

        </div>
        <div style={ {
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          gap: '10px'
        } }>
          <Input
            label='start'
            value = { angleFrom * 180 / Math.PI }
            name='start'
            // @ts-ignore
            onValueChange={ onAngleFromChange }
          />
          <Input
            label='end'
            value = { angleTo * 180 / Math.PI }
            name='end'
            // @ts-ignore
            onValueChange={ onAngleToChange }
          />
        </div>
        <div style={ {
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          gap: '10px'
        } }>
          <Input
            label='radius'
            value = { radius }
            name='radius'
            // @ts-ignore
            onValueChange={ onRadiusChange }
          />
          <Checkbox label='cw' checked={ clockwise } handleChange={ handleChangeClockwise }/>
        </div>
      </>
    </div>
  );
}
