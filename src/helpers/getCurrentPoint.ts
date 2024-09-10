import useStore from 'store/index';
import { v } from './vectors';
import { IArcSegment, ILinearSegment, IVector2 } from 'types/index';
import { Vector2 } from 'three';

export default function getCurrentPoint( index: number ): IVector2 {
  const segment = useStore.getState().segments[ index ];
  const { type } = segment;
  switch ( type ) {
    case 'linear':
    case 'move':
    case 'qBezier':
      const to = ( segment as ILinearSegment ).to;

      return { x: to.x, y: to.y };
    case 'arc':
      const center = ( segment as IArcSegment ).center;
      const angleTo = ( segment as IArcSegment ).angleTo;
      const radius = ( segment as IArcSegment ).radius;
      v.set( center.x, center.y )
        .add(
          new Vector2( Math.cos( angleTo ), Math.sin( angleTo ) )
            .multiplyScalar( radius )
        );

      return { x: v.x, y: v.y };
    default:
      console.warn( `Type ${ type } is not defined` );

      return { x: 0, y: 0 };
  }
}


