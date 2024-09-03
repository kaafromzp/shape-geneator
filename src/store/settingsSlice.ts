// import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { IStore } from '.';
// import { handleUndoRedo } from 'helpers/handleUndoRedo';
// import { UndoRedoModes } from './createUndoRedoSlice';
// import { IState, IStore } from './index';
// import { ILanguage } from 'types/language';
// import { IAttribute, IAttributes } from 'types/attribute';
// import { inches, units } from 'types/units';
// import { IProjectAttributes } from 'types/projectAttributes';
// import { IUIAttribute, IUICategory } from 'types/categories';

export type IInformation = {
  areaName: string;
  projectName: string;
}

export type ISettingsSliceState = {
  // information: IInformation;
  // // materials: { [key in materialType]: UUID }
  // projectAttributes: IProjectAttributes;
  // UICategories: IUICategory[];
  // UIAttributes: IUIAttribute<string | number>[];
  // language: ILanguage;
  // snapSensitivity: IAttribute<inches>
  // units: units;
  // version: number;
}

export type ISettingsSliceActions = {
  // setSettings: ( s: ISettingsSliceState ) => void
  // setProjectAttributeValues: ( attributes: IAttributes ) => void
}

export type ISettingsSliceStore = ISettingsSliceState & ISettingsSliceActions

const createSettingsSlice: StateCreator<
IStore,
[],
[],
ISettingsSliceStore
> = ( set ) => ( {} );

export default createSettingsSlice;
