import React from 'react';
import useStore from 'store/index';
import Segment from '../Segment';
import Checkbox from 'components/UI/Checkbox';

function RightMenu() {
  const segments = useStore( ( state ) => state.segments );
  const autoClose = useStore( ( state ) => state.autoClose );
  const setAutoClose = useStore( ( state ) => state.setAutoClose );

  return (
    <div
      style={ {
        position: 'fixed',
        right: '10px',
        top: '10px',
        overflowY: 'auto',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        maxHeight: '100%'
      } }>
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
          textAlign: 'center'
        } }>
        <h3>Segments</h3>
        <div
          style={ {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '10px'
          } }>
          {segments.map( ( segment, index ) => (
            <Segment key={ index } index={ index }/>
          ) )}
          <Checkbox label='auto close' checked = { autoClose } handleChange = { setAutoClose }/>
        </div>
      </div>
    </div>
  );
}

export default RightMenu;
