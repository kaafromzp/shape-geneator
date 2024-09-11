import React, { MouseEvent, useCallback } from 'react';
import { CommandTypeEnum, handlePop, PopHandlerEnum } from 'helpers/handlePop';
import useStore from 'store';
import Button from 'UI/Button';
import { ReverseButtonProps } from './types';

const ReverseButton = ( { commandType }: ReverseButtonProps ) => {
  const commands = useStore( ( state ) => state[ commandType ] );

  const disableButton = !commands.length;
  const svgSrc = commandType === CommandTypeEnum.UNDO ? './assets/svg/undo.svg' : './assets/svg/redo.svg';

  const handleReverseAction = useCallback( ( e: MouseEvent ) => {
    e.stopPropagation();
    handlePop(
      commandType === CommandTypeEnum.UNDO ? PopHandlerEnum.UNDO : PopHandlerEnum.REDO,
      commandType
    );
  }, [commandType] );

  return (
    <Button
      // className={ 'navbar-menu__btn navbar-menu__btn-reverse' }
      disabled={ disableButton }
      onClick={ handleReverseAction }
      svg={ svgSrc }
    />
  );
};

export default ReverseButton;
