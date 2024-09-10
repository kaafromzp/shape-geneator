import * as ReactSelect from '@radix-ui/react-select';
import React from 'react';
import './index.scss';
import { SelectItemProps } from './types';

const SelectGeneralItem = (
  {
    children,
    img,
    value,
    disabled
  }: SelectItemProps ) => {

  return (
    <ReactSelect.Item className='general-select-item' value={ String( value ) } disabled={ disabled }>

      {
        img && <div className='general-select-item__img-box'>
          <img crossOrigin='anonymous' src={ img } alt={ img }/>
        </div>
      }

      <ReactSelect.ItemText>{children}</ReactSelect.ItemText>

    </ReactSelect.Item>
  );
};

export default SelectGeneralItem;
