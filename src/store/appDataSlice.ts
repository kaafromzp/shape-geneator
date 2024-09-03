import { StateCreator } from 'zustand';
import { IState, IStore } from '.';
import { Mode, ISegment, selectedObjectType } from 'types';
import { produce } from 'immer';

export type IAppDataSliceState = {
  segments: ISegment[]
  mode: Mode,
  selectedIndex: number | null,
  selectedType: selectedObjectType | null
  draggedIndex: number | null,
  draggedType: selectedObjectType | null
}

export type IAppDataSliceActions = {
  setSelectedSegment: ( index: number | null, type : selectedObjectType | null )=>void
  setDraggedSegment: ( index: number | null, type : selectedObjectType | null )=>void
  // setProductId: ( id: UUID | null ) => void
  // setAppData: ( s: IAppDataSliceState ) => void
  updateSegment: ( index: number, changes: Partial<ISegment> ) => void
  // setAttributeValues: ( uuid: UUID, attributes: IAttributes ) => void
  // setObjectPosition: ( uuid: UUID, partialPosition: Partial<IInterpretedVector3> ) => void
  // setObjectSize: ( uuid: UUID, partialSize: Partial<IInterpretedVector3> ) => void
  // duplicateObject3D: ( uuid: UUID, parentId?: UUID, undoRedoMode?: UndoRedoModes ) => void
  // deleteObject3D: ( id: UUID, undoRedoMode?: UndoRedoModes ) => void
  // _addObject3D: ( config: IObject, undoRedoMode?: UndoRedoModes ) => void
  // _removeObject3D: ( id: UUID, undoRedoMode?: UndoRedoModes ) => void
  // createObject3D: ( config: IObject, undoRedoMode?: UndoRedoModes ) => void
  // createObject3DFromCatalog: (
  //   catalogPath: string | Exclude<IObjectCatalog, IInterpretedShape | IInterpretedCurve>,
  //   parentId?: UUID,
  //   undoRedoMode?: UndoRedoModes
  // ) => void
}

export type IObjects3DSliceStore = IAppDataSliceState & IAppDataSliceActions

const createAppDataSlice: StateCreator<
IStore,
[],
[],
IObjects3DSliceStore
> = ( set ) => {

  return {
    segments: [
      { type: 'move', to: { x: 1, y: 1 } },
      { type: 'linear', to: { x: 1.5, y: 2 } },
      { type: 'linear', to: { x: 2, y: 0 } },
      { type: 'arc', center: { x: 1, y: 0 }, radius: 1, angleFrom: 0, angleTo: 3 * Math.PI / 2 },
      { type: 'qBezier', to: { x: -5, y: -5 }, helperPoint1: { x: -3, y: 4 } },
      { type: 'linear', to: { x: -2, y: 0 } }
    ],
    mode: Mode.View,
    selectedIndex: null,
    selectedType: null,
    draggedIndex: null,
    draggedType: null,
    setSelectedSegment: ( index, type ) => {
      set( { selectedIndex: index, selectedType: type } );
    },
    setDraggedSegment: ( index, type ) => {
      set( { draggedIndex: index, draggedType: type } );
    },
    updateSegment: ( index, changes ) => {
      set( produce( ( state: IState ) => {
        const object3D = state.segments[ index ];
        Object.assign( object3D, changes );


      } ) );
    }
  };
};

export default createAppDataSlice;
