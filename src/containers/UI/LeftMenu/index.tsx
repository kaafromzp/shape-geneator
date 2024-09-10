import Button from 'components/UI/Button';
import { R3FRef } from 'components/UI/R3FStoreProvider';
import Select, { IOption } from 'components/UI/Select';
import React, { useCallback } from 'react';
import useStore from 'store/index';
import { OrbitControls } from 'three-stdlib';

const gridOptions = [
  { value: 0.01, label: '0.01' },
  { value: 0.1, label: '0.1' },
  { value: 1, label: '1' }
] as IOption<0.01 | 0.1 | 1>[];

const snapOptions = [
  { value: 1e-5, label: '0' },
  { value: 0.01, label: '0.01' },
  { value: 0.1, label: '0.1' },
  { value: 1, label: '1' }
] as IOption<0 | 0.01 | 0.1 | 1>[];

function LeftMenu() {
  const grid = useStore( ( ( state ) => state.grid ) );
  const setGrid = useStore( ( ( state ) => state.setGrid ) );
  const snapGrid = useStore( ( ( state ) => state.snapGrid ) );
  const setSnapGrid = useStore( ( ( state ) => state.setSnapGrid ) );
  const snapAngle = useStore( ( ( state ) => state.snapAngle ) );
  const setSnapAngle = useStore( ( ( state ) => state.setSnapAngle ) );
  const fitSceneToCameraFrustum = useStore( ( ( state ) => state.fitSceneToCameraFrustum ) );

  return (
    <div style={ { position: 'fixed', left: '10px', top: '10px' } }>
      <div style={ { display: 'flex', flexDirection: 'column', textAlign: 'center' } }>
        <h3 style={ { paddingBottom: '10px' } }>Settings</h3>
        <Select
          label={ 'Grid' }
          options={ gridOptions }
          value={ grid }
          onValueChange={ ( option ) => setGrid( option.value ) }
        />
        <Select
          label={ 'Snap Grid' }
          options={ snapOptions }
          value={ snapGrid }
          onValueChange={ ( option ) => setSnapGrid( option.value ) }
        />
        <Select
          label={ 'Snap Angle' }
          options={ snapOptions }
          value={ snapAngle }
          onValueChange={ ( option ) => setSnapAngle( option.value ) }
        />
        <Button text='Fit scene' onClick={ fitSceneToCameraFrustum }/>
      </div>
    </div>
  );
}

export default LeftMenu;
