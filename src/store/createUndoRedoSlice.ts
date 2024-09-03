import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { createGroupCommand } from 'helpers/createGroupCommand';
import { IActions, IState, IStore } from './index';

export type UndoRedoCommand = {
  commands: Array<keyof IActions>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: Array<Array<any>>
}

export enum UndoRedoModes {
  DEFAULT = 'default',
  UNDO = 'undo',
  REDO = 'redo',
  NO_RECORD = 'no_record'
}

export type IUndoRedoState = {
  undoCommands: UndoRedoCommand[]
  redoCommands: UndoRedoCommand[]
  undoGroup: boolean
  redoGroup: boolean
}

export type IUndoRedoActions = {
  popRedo: () => void
  popUndo: () => void
  beginUndoGroup: () => void
  endUndoGroup: () => void
  beginRedoGroup: () => void
  endRedoGroup: () => void
}

export type IUndoRedoStore = IUndoRedoState & IUndoRedoActions

const createUndoRedoSlice: StateCreator<
IStore,
[],
[],
IUndoRedoStore
> = ( set ) => {

  const createUndoGroupCommands = createGroupCommand( 'undoCommands' );
  const createRedoGroupCommands = createGroupCommand( 'redoCommands' );

  return {
    undoCommands: [],
    redoCommands: [],
    undoGroup: false,
    redoGroup: false,
    popUndo: () => {
      set( produce( ( state: IState ): void => {
        state.undoCommands.pop();
      } ) );
    },
    popRedo: () => {
      set( produce( ( state: IState ): void => {
        state.redoCommands.pop();
      } ) );
    },
    beginUndoGroup: () => set(
      produce( ( state: IStore ) => {
        createUndoGroupCommands( state, 'beginUndoGroup' );
      } )
    ),
    endUndoGroup: () => set(
      produce( ( state: IStore ) => {
        createUndoGroupCommands( state, 'endUndoGroup' );
      } )
    ),
    beginRedoGroup: () => set(
      produce( ( state: IStore ) => {
        createRedoGroupCommands( state, 'beginRedoGroup' );
      } )
    ),
    endRedoGroup: () => set(
      produce( ( state: IStore ) => {
        createRedoGroupCommands( state, 'endRedoGroup' );
      } )
    )
  };
};

export default createUndoRedoSlice;
