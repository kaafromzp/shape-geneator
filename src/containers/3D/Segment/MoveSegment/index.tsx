import React from 'react';
import Point from 'containers/3D/Point';

type IProps = {
  index: number
}

export default function MoveSegment( { index }: IProps ) {
  return <Point index={ index } pointType='to'/>;
}
