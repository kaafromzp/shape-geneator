import React from 'react';
import useStore from 'store/index';
import Segment from '../Segment';
import { circleGeometry } from 'helpers/geometry';
import { materialOrigin } from 'helpers/material';
import Plane from '../Plane';

export type sizes = {
  width: number;
  height: number;
}


export default function Scene() {
  const segments = useStore( ( state ) => state.segments );

  return (
    <>
      <Plane/>
      <group
        name='bBoxBase'
      >
        <mesh geometry={ circleGeometry } material={ materialOrigin }/>
        {segments.map( ( s, i ) => ( <Segment key={ i } index={ i }/> ) )}
      </group>
    </>
  );
}
