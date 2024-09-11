import useStore from 'store';

export enum CommandTypeEnum {
  UNDO = 'undoCommands',
  REDO = 'redoCommands',
}

export enum PopHandlerEnum {
  UNDO = 'popUndo',
  REDO = 'popRedo',
}

export const handlePop = ( popHandlerType: PopHandlerEnum, commandType: CommandTypeEnum ) => {
  const state = useStore.getState();
  const reversCommands = state[ commandType ];
  const lastCommand = reversCommands[ reversCommands.length - 1 ];

  if ( !lastCommand ) {
    return;
  }

  const popHandler = state[ popHandlerType ];

  const commands = lastCommand.commands;
  const args = lastCommand.args;

  if ( !commands || !args ) {
    return;
  }

  let endUndo = false;
  let endRedo = false;

  if ( commands.length > 1 ) {
    if ( commandType === CommandTypeEnum.UNDO && !state.redoGroup ) {
      state.beginRedoGroup( );
      endRedo = true;
    } else if ( commandType === CommandTypeEnum.REDO && !state.undoGroup ) {
      state.beginUndoGroup( );
      endUndo = true;
    }
  }

  for ( let i = commands.length - 1; i >= 0; i -= 1 ) {
    const currentCommand = commands[ i ];
    const currentArguments = args[ i ];

    // if ( currentCommand in commandHandlers ) {
    //   // @ts-ignore
    //   commandHandlers[ currentCommand ]();
    // } else {
    // @ts-ignore
    state[ currentCommand ]( ...currentArguments );
    // }
  }

  if ( endUndo ) {
    state.endUndoGroup( );
  }
  if ( endRedo ) {
    state.endRedoGroup( );
  }

  popHandler();
};
