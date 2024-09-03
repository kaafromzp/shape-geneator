import { StateCreator } from 'zustand';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import createUndoRedoSlice, { IUndoRedoActions, IUndoRedoState } from './createUndoRedoSlice';
// import createFlagsSlice, { IFlagsSliceActions, IFlagsSliceState } from './flagsSlice';
import createAppDataSlice, { IAppDataSliceActions, IAppDataSliceState } from './appDataSlice';
import createSettingsSlice, { ISettingsSliceActions, ISettingsSliceState } from './settingsSlice';
export type IState = ISettingsSliceState & IUndoRedoState & IAppDataSliceState

export type IActions = ISettingsSliceActions & IUndoRedoActions & IAppDataSliceActions
export type IStore = IState & IActions

const stateSetter:StateCreator<IStore> = ( ...a ) => (
  {
    ...createAppDataSlice( ...a ),
    ...createSettingsSlice( ...a ),
    ...createUndoRedoSlice( ...a )
  } );

const useStore = createWithEqualityFn<IStore>( stateSetter, shallow );
// @ts-ignore
window.store = useStore;
export default useStore;
