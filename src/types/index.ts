export enum Mode {
  View = 'view',
  Edit = 'edit'
}

export type segmentType = 'linear' | 'arc' | 'qBezier'

export type IVector2 = {
  x: number;
  y: number;
}

export type ILinearSegment = {
  type : 'linear';
  to: IVector2;
}

export type IMoveSegment = {
  type : 'move';
  to: IVector2;
}

export type IArcSegment = {
  type : 'arc';
  radius: number;
  center: IVector2;
  angleFrom: number;
  angleTo: number;
}

export type IQBezierSegment = {
  type : 'qBezier';
  // from: IVector2;
  to: IVector2;
  helperPoint1: IVector2;
}

export type ISegment = IMoveSegment | ILinearSegment | IArcSegment | IQBezierSegment

export type selectedObjectType = 'to' | 'helperPoint1' | 'center' | 'from'

export type pointType = 'to' | 'center' | 'from' | 'helperPoint1'
