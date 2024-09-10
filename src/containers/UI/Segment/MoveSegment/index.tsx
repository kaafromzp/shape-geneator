import React from 'react';
import Point from 'containers/UI/Point';

type IProps = {
  index: number
}

export default function MoveSegment( { index }: IProps ) {
  return (
    // <div style={ { display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '10px', border: 'solid' } }>
    <>
      <h4>Move</h4>
      <Point index={ index } pointType='to'/>
    </>
  // </div>
  );
}
