import { StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { IState, IStore } from '.';
import { Mode, ISegment, selectedObjectType } from 'types';
import { produce } from 'immer';
import { R3FRef } from 'components/UI/R3FStoreProvider';
import { RootState } from '@react-three/fiber';
import { Box3, Group, OrthographicCamera, Vector3 } from 'three';
import { fitImgToSpace } from 'containers/3D/Camera';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { handleUndoRedo } from 'helpers/handleUndoRedo';
import { UndoRedoModes } from './createUndoRedoSlice';

export type IAppDataSliceState = {
  grid: 0.01 | 0.1 | 1
  snapGrid: 0 | 0.01 | 0.1 | 1
  snapAngle: 0 | 0.01 | 0.1 | 1
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
  setGrid: ( grid: 0.01 | 0.1 | 1 )=>void
  setSnapGrid: ( snapGrid: 0 | 0.01 | 0.1 | 1 )=>void
  setSnapAngle: ( snapGrid: 0 | 0.01 | 0.1 | 1 )=>void

  fitSceneToCameraFrustum: ( ) => void
  updateSegment: ( index: number, changes: Partial<ISegment> ) => void
  addSegment: ( index: number, changes: ISegment ) => void
  setSegment: ( index: number, changes: ISegment ) => void
  removeSegment: ( index: number ) => void
}

export type IObjects3DSliceStore = IAppDataSliceState & IAppDataSliceActions

const createAppDataSlice: StateCreator<
IStore,
[],
[],
IObjects3DSliceStore
> = ( set ) => {

  return {
    grid: 0.1,
    snapGrid: 0.1,
    snapAngle: 0.1,
    segments: [
      { type: 'move', to: { x: 1, y: 1 } },
      { type: 'linear', to: { x: 1.5, y: 2 } },
      { type: 'linear', to: { x: 2, y: 0 } },
      { type: 'arc', center: { x: 1, y: 0 }, radius: 1, angleFrom: 0, angleTo: 3 * Math.PI / 2, clockwise: true },
      { type: 'qBezier', to: { x: -3, y: -3 }, helperPoint1: { x: -3, y: 4 } },
      { type: 'linear', to: { x: -2, y: 0 } }
    ],
    mode: Mode.View,
    selectedIndex: null,
    selectedType: null,
    draggedIndex: null,
    draggedType: null,
    fitSceneToCameraFrustum: () => {
      const {
        scene,
        camera,
        controls,
        gl: {
          domElement: {
            width,
            height
          }
        }
      } = ( R3FRef.current as UseBoundStore<StoreApi<RootState>> ).getState();
      const bBox = new Box3().setFromObject( scene.getObjectByName( 'bBoxBase' ) as Group );
      const bBoxSize = new Vector3();
      const center = new Vector3();
      bBox.getSize( bBoxSize );
      bBox.getCenter( center );
      const fitSize = fitImgToSpace( { width: bBoxSize.x, height: bBoxSize.y }, { width, height } );
      const k = fitSize.width / bBoxSize.x;
      const size = { width: width / k * 1.2, height: height / k * 1.2 };
      camera.position.set( center.x, center.y, 1e10 );
      ( camera as OrthographicCamera ).left = -size.width / 2;
      ( camera as OrthographicCamera ).right = size.width / 2;
      ( camera as OrthographicCamera ).top = size.height / 2;
      ( camera as OrthographicCamera ).bottom = -size.height / 2;
      camera.zoom = 1;

      camera.updateMatrixWorld( true );
      camera.updateProjectionMatrix();
      ( controls as OrbitControls ).target.set( center.x, center.y, 0 );
      ( controls as OrbitControls ).update();
    },
    setGrid: ( grid, undoRedoMode = UndoRedoModes.DEFAULT ) => {
      set( produce( ( state: IState ) => {
        const prevGrid = state.grid;
        handleUndoRedo(
          { commands: ['setGrid'], args: [[prevGrid]] },
          state,
          undoRedoMode
        );
        state.grid = grid;
      } ) );
    },
    setSnapGrid: ( snapGrid, undoRedoMode = UndoRedoModes.DEFAULT ) => {
      set( produce( ( state: IState ) => {
        const prevSnapGrid = state.snapGrid;
        handleUndoRedo(
          { commands: ['setSnapGrid'], args: [[prevSnapGrid]] },
          state,
          undoRedoMode
        );
        state.snapGrid = snapGrid;
      } ) );
    },
    setSnapAngle: ( snapAngle, undoRedoMode = UndoRedoModes.DEFAULT ) => {
      set( produce( ( state: IState ) => {
        const prevAngle = state.snapAngle;
        handleUndoRedo(
          { commands: ['setSnapAngle'], args: [[prevAngle]] },
          state,
          undoRedoMode
        );
        state.snapAngle = snapAngle;
      } ) );
    },
    setSelectedSegment: ( index, type, undoRedoMode = UndoRedoModes.DEFAULT ) => {
      set( produce( ( state: IState ) => {
        // const selectedIndex = state.selectedIndex;
        // const selectedType = state.selectedType;

        // handleUndoRedo(
        //   { commands: ['setSelectedSegment'], args: [[selectedIndex, selectedType]] },
        //   state,
        //   undoRedoMode
        // );

        state.selectedIndex = index;
        state.selectedType = type;
      } ) );
    },
    setDraggedSegment: ( index, type, undoRedoMode = UndoRedoModes.DEFAULT ) => {
      set( produce( ( state: IState ) => {
        const draggedIndex = state.draggedIndex;
        const draggedType = state.draggedType;

        handleUndoRedo(
          { commands: ['setDraggedSegment'], args: [[draggedIndex, draggedType]] },
          state,
          undoRedoMode
        );

        state.draggedIndex = index;
        state.draggedType = type;
      } ) );
    },
    setSegment: ( index, changes, undoRedoMode = UndoRedoModes.DEFAULT ) => {
      set( produce( ( state: IState ) => {
        const segment = state.segments[ index ];

        handleUndoRedo(
          { commands: ['setSegment'], args: [[index, { ...segment }]] },
          state,
          undoRedoMode
        );
        state.segments[ index ] = changes;
      } ) );
    },
    updateSegment: ( index, changes, undoRedoMode = UndoRedoModes.DEFAULT ) => {
      set( produce( ( state: IState ) => {
        const segment = state.segments[ index ];

        handleUndoRedo(
          { commands: ['setSegment'], args: [[index, { ...segment }]] },
          state,
          undoRedoMode
        );

        Object.assign( segment, changes );
      } ) );
    },
    addSegment: ( index, changes, undoRedoMode = UndoRedoModes.DEFAULT ) => {
      set( produce( ( state: IState ) => {

        handleUndoRedo(
          { commands: ['removeSegment'], args: [[index + 1]] },
          state,
          undoRedoMode
        );

        state.segments.splice( index + 1, 0, changes );
      } ) );
    },
    removeSegment: ( index, undoRedoMode = UndoRedoModes.DEFAULT ) => {
      set( produce( ( state: IState ) => {
        const segment = { ...state.segments[ index ] };

        handleUndoRedo(
          { commands: ['addSegment'], args: [[index - 1, segment]] },
          state,
          undoRedoMode
        );

        state.segments.splice( index, 1 );
      } ) );
    }
  };
};

export default createAppDataSlice;
