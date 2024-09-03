import React from 'react';
import useStore from 'store/index';
import ArcSegment from './ArcSegment';
import LinearSegment from './LinearSegment';
import MoveSegment from './MoveSegment';
import QuadraticBezierCurveSegment from './QuadraticBezierCurveSegment';

type IProps = {
  index: number
}

export default function Segment( { index }: IProps ) {
  const type = useStore( ( state ) => ( state.segments[ index ].type ) );
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
}
