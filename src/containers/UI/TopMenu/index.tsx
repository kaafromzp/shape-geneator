import React from 'react';
import ReverseButton from './ReverseButton';
import { CommandTypeEnum } from 'helpers/handlePop';

export default function TopMenu() {
  return (
    <div style={ { position: 'fixed', left: '50%', top: '10px', transform: 'translate(-50%, 0%)' } }>
      <div style={ { display: 'flex', flexDirection: 'column', textAlign: 'center' } }>
        {/* <h3 style={ { paddingBottom: '10px' } }>Settings</h3> */}
        <div style={ { display: 'flex', textAlign: 'center' } }>
          <ReverseButton commandType={ CommandTypeEnum.UNDO }/>
          <ReverseButton commandType={ CommandTypeEnum.REDO }/>
        </div>
      </div>
    </div>
  );
}


