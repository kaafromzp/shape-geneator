import React, { useCallback, useMemo } from 'react';
import useStore from 'store/index';
import ArcSegment from './ArcSegment';
import LinearSegment from './LinearSegment';
import MoveSegment from './MoveSegment';
import QuadraticBezierCurveSegment from './QuadraticBezierCurveSegment';
import getCurrentPoint from 'helpers/getCurrentPoint';
import Button from 'components/UI/Button';

type IProps = {
  index: number
}

export default function Segment( { index }: IProps ) {
  const addSegment = useStore( ( ( state ) => state.addSegment ) );
  const removeSegment = useStore( ( ( state ) => state.removeSegment ) );

  const handleAddLineSegment = useCallback( ( index: number ) => ( ) => {
    const currentPoint = getCurrentPoint( index );

    addSegment( index, {
      type: 'linear',
      to: { x: currentPoint.x + 1, y: currentPoint.y + 1 }
    } );
  }, [addSegment] );
  const handleArcSegment = useCallback( ( index: number ) => ( ) => {
    const currentPoint = getCurrentPoint( index );

    addSegment( index, {
      type: 'arc',
      center: { x: currentPoint.x + 1, y: currentPoint.y },
      angleFrom: Math.PI,
      angleTo: 0,
      radius: 1,
      clockwise: true
    } );
  }, [addSegment] );
  const handleQBezierSegment = useCallback( ( index: number ) => ( ) => {
    const currentPoint = getCurrentPoint( index );

    addSegment( index, {
      type: 'qBezier',
      to: { x: currentPoint.x + 2, y: currentPoint.y },
      helperPoint1: { x: currentPoint.x + 1, y: currentPoint.y + 2 }
    } );
  }, [addSegment] );

  const type = useStore( ( state ) => ( state.segments[ index ].type ) );

  const buttonsAdd = useMemo( () => ( <div
    style={ {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center'
    } }>
    <Button text='+ line' onClick={ handleAddLineSegment( index ) }/>
    <Button text='+ arc' onClick={ handleArcSegment( index ) }/>
    <Button text='+ bezier' onClick={ handleQBezierSegment( index ) }/>
  </div>
  ), [
    handleAddLineSegment,
    handleArcSegment,
    handleQBezierSegment,
    index
  ] );

  const handleRemoveSegment = useCallback( () => {
    removeSegment( index );
  }, [index, removeSegment] );

  const buttonRemove = useMemo( () => (
    <div style={ { width: '30px', height: '20px' } }>
      <Button text='x' onClick={ handleRemoveSegment }/>
    </div>

  ), [handleRemoveSegment] );

  const component = useMemo( () => {
    switch ( type ) {
      case 'move':
        return <MoveSegment index= { index }/>;
      case 'linear':
        return <LinearSegment index= { index }/>;
      case 'arc':
        return <ArcSegment index= { index }/>;
      case 'qBezier':
        return <QuadraticBezierCurveSegment index= { index }/>;
      default:
        console.warn( `Type ${ type } is not defined` );

        return null;
    }
  }, [index, type] );

  return (
    <>
      <div style={ {
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        gap: '10px',
        border: 'solid',
        paddingTop: '5px',
        paddingBottom: '5px'
      } }>
        {component}
        {buttonRemove}
      </div>
      {buttonsAdd}
    </>
  );

}
