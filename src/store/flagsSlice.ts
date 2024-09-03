// import { produce } from 'immer';
// import { StateCreator } from 'zustand';
// import { IState, IStore } from '.';
// import { handleUndoRedo } from 'helpers/handleUndoRedo';
// import { APIStatus } from 'types/APIStatus';
// import { UndoRedoModes } from './createUndoRedoSlice';
// import { IViewports } from 'types/viewports';

// export type IFlagsSliceState = {
//   appDataAPIStatus: APIStatus
//   materialsAPIStatus: APIStatus
//   UICategoriesAPIStatus: APIStatus
//   privateCatalogAPIStatus: APIStatus
//   masterCatalogAPIStatus: APIStatus
//   looksAPIStatus: APIStatus
//   models3DAPIStatus: APIStatus
//   showLoader: number
//   mainColor: string
//   viewports: IViewports
// }

// export type IFlagsSliceActions = {
//   setMainColor: ( s: string, reversibleEnum: UndoRedoModes ) => void
//   addShowLoader: () => void
//   removeShowLoader: () => void
//   setAppDataAPIStatus: ( s: APIStatus ) => void
//   setMaterialsAPIStatus: ( s: APIStatus ) => void
//   setLooksAPIStatus: ( s: APIStatus ) => void
//   setPrivateCatalogAPIStatus: ( s: APIStatus ) => void
//   setUICategoriesAPIStatus: ( s: APIStatus ) => void
//   setMasterCatalogAPIStatus: ( s: APIStatus ) => void
//   setModels3DAPIStatus: ( s: APIStatus ) => void
//   setViewports: ( s: IViewports ) => void
// }

// export type IFlagsSliceStore = IFlagsSliceState & IFlagsSliceActions

// const createFlagsSlice: StateCreator<
// IStore,
// [],
// [],
// IFlagsSliceStore
// > = ( set ) => ( {
//   appDataAPIStatus: APIStatus.None,
//   privateCatalogAPIStatus: APIStatus.None,
//   UICategoriesAPIStatus: APIStatus.None,
//   masterCatalogAPIStatus: APIStatus.None,
//   materialsAPIStatus: APIStatus.None,
//   models3DAPIStatus: APIStatus.None,
//   looksAPIStatus: APIStatus.None,
//   showLoader: 0,
//   mainColor: '#186cd8',
//   viewports: IViewports.SINGLE,
//   setMainColor: ( mainColor, undoRedoMode = UndoRedoModes.DEFAULT ) => {
//     set( produce( ( state: IState ) => {
//       handleUndoRedo(
//         { commands: ['setMainColor'], args: [[state.mainColor]] },
//         state,
//         undoRedoMode
//       );
//       state.mainColor = mainColor;
//     } ) );
//   },
//   addShowLoader: () => {
//     set( ( { showLoader } ) => ( { showLoader: showLoader + 1 } ) );
//   },
//   removeShowLoader: () => {
//     set( ( { showLoader } ) => ( { showLoader: showLoader - 1 } ) );
//   },
//   setAppDataAPIStatus: ( appDataAPIStatus ) => {
//     set( { appDataAPIStatus } );
//   },
//   setMaterialsAPIStatus: ( materialsAPIStatus ) => {
//     set( { materialsAPIStatus } );
//   },
//   setLooksAPIStatus: ( looksAPIStatus ) => {
//     set( { looksAPIStatus } );
//   },
//   setModels3DAPIStatus: ( models3DAPIStatus ) => {
//     set( { models3DAPIStatus } );
//   },
//   setUICategoriesAPIStatus: ( UICategoriesAPIStatus ) => {
//     set( { UICategoriesAPIStatus } );
//   },
//   setPrivateCatalogAPIStatus: ( privateCatalogAPIStatus ) => {
//     set( { privateCatalogAPIStatus } );
//   },
//   setMasterCatalogAPIStatus: ( masterCatalogAPIStatus ) => {
//     set( { masterCatalogAPIStatus } );
//   },
//   setViewports: ( viewports, undoRedoMode = UndoRedoModes.DEFAULT ) => {
//     set( produce( ( state: IState ) => {
//       handleUndoRedo(
//         { commands: ['setViewports'], args: [[state.viewports]] },
//         state,
//         undoRedoMode
//       );
//       state.viewports = viewports;
//     } ) );
//   }
// } );

// export default createFlagsSlice;
