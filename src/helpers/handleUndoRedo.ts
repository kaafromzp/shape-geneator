import { IState } from 'store';
import { UndoRedoCommand, UndoRedoModes } from 'store/createUndoRedoSlice';

export const handleUndoRedo = (
  command: UndoRedoCommand,
  state: IState,
  undoRedoMode: UndoRedoModes
) => {

  switch ( undoRedoMode ) {
    case UndoRedoModes.DEFAULT: {
      if ( state.undoGroup ) {
        let currentUndoCommand = state.undoCommands[ state.undoCommands.length - 1 ];
        for ( let i = 0; i < command.commands.length; i += 1 ) {
          currentUndoCommand.commands.push( command.commands[ i ] );
          currentUndoCommand.args.push( [...command.args[ i ], UndoRedoModes.UNDO] );
        }
      } else {
        for ( let i = 0; i < command.commands.length; i += 1 ) {
          command.args[ i ].push( UndoRedoModes.UNDO );
        }

        state.undoCommands.push( command );
      }

      state.redoCommands = [];
      break;
    }
    case UndoRedoModes.REDO:
      if ( state.undoGroup ) {
        let currentUndoCommand = state.undoCommands[ state.undoCommands.length - 1 ];
        for ( let i = 0; i < command.commands.length; i += 1 ) {
          currentUndoCommand.commands.push( command.commands[ i ] );
          currentUndoCommand.args.push( [...command.args[ i ], UndoRedoModes.UNDO] );
        }
      } else {
        for ( let i = 0; i < command.commands.length; i += 1 ) {
          command.args[ i ].push( UndoRedoModes.UNDO );
        }

        state.undoCommands.push( command );
      }

      break;
    case UndoRedoModes.UNDO:
      if ( state.redoGroup ) {
        let currentRedoCommand = state.redoCommands[ state.redoCommands.length - 1 ];
        for ( let i = 0; i < command.commands.length; i += 1 ) {
          currentRedoCommand.commands.push( command.commands[ i ] );
          currentRedoCommand.args.push( [...command.args[ i ], UndoRedoModes.REDO] );
        }

      } else {
        for ( let i = 0; i < command.commands.length; i += 1 ) {
          command.args[ i ].push( UndoRedoModes.REDO );
        }

        state.redoCommands.push( command );
      }

      break;
    default:
      break;
  }
};
