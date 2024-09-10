import { Root, Indicator } from '@radix-ui/react-checkbox';
import React from 'react';
import './index.scss';

type IProps = {
  label: string
  checked: number | boolean
  handleChange: ( checked: boolean )=> void
}

const Checkbox = ( { label, checked, handleChange }: IProps ) => {

  return (
    <div className='checkbox'>
      <Root
        checked={ Boolean( checked ) }
        onCheckedChange={ handleChange }
        className='checkbox__root'>
        <Indicator className='checkbox__indicator'>
          <span className='checkbox__indicator-mark'/>
        </Indicator>
      </Root>
      <label className='checkbox__label'>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
