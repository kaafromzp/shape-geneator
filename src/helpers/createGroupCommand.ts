import { IStore } from 'store';
import { IUndoRedoActions, IUndoRedoState } from 'store/createUndoRedoSlice';

export const createGroupCommand = ( commandType: Exclude<keyof IUndoRedoState, 'undoGroup' | 'redoGroup'> ) => ( state: IStore, command: keyof IUndoRedoActions ) => {
  const commandStack = state[ commandType ];
  const isBegin = command.startsWith( 'begin' );

  if( isBegin ) {
    const commandObj = {
      commands: [],
      args: []
    };
    commandStack.push( commandObj );
  }
  // else {
  //   const lastCommand = commandStack[ commandStack.length - 1 ];
  //   lastCommand.commands.push( command );
  //   lastCommand.args.push( [] );
  // }

  // @ts-ignore
  state[ `${ commandType.slice( 0, 4 ) }Group` ] = command.startsWith( 'begin' );
};
