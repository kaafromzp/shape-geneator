import React from 'react';
import Point from 'containers/UI/Point';

type IProps = {
  index: number
}

export default function QuadraticBezierCurveSegment( { index }: IProps ) {
  return (
    <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'center', gap: '10px' } }>
      <>
        <div style={ { display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '10px' } }>
          <h4>Bezier Curve</h4>
          <Point
            index={ index }
            pointType='to'
          />
        </div>
        <div style={ { display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '10px' } }>
          <Point
            index={ index }
            pointType='helperPoint1'
          />
        </div>
      </>
    </div>
  );
}
