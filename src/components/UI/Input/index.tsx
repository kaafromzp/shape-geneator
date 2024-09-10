import * as ReactForm from '@radix-ui/react-form';
import React, { ChangeEvent, HTMLInputTypeAttribute, useCallback, useMemo } from 'react';
import { cn } from '../../../helpers/cn';
import './index.scss';

const Input = (
  {
    required,
    label,
    value,
    additionalText,
    withBorder = true,
    onValueChange
  }: {
    name: string
    required?: boolean
    label: string
    value: string | number
    type?: HTMLInputTypeAttribute
    additionalText?: string
    withBorder?: boolean
    onValueChange: ( value: string | number ) => void
  } ) => {

  const type = useMemo( () => ( typeof value === 'string' ? 'text' : 'number' ), [value] );

  const onChange = useCallback( ( e: ChangeEvent<HTMLInputElement> ) => {
    onValueChange( type === 'number' ? Number( e.currentTarget.value ) : e.currentTarget.value );
  }, [onValueChange, type] );

  return (
    <ReactForm.Root>
      <ReactForm.Field
        className='input-field'
        name={ 'testattribute' }
      >
        <ReactForm.Label className='input-field__label'>{label}</ReactForm.Label>
        <div className='input-field__container'>
          <ReactForm.Control asChild>
            <>
              <input
                onChange = { onChange }
                className={ cn(
                  'input-field__input',
                  withBorder && 'input-field__input--border'
                ) }
                type={ type }
                required={ required }
                value={ type === 'number' ? Math.round( value as number * 1e6 ) * 1e-6 : value }
              />
              {/* {
                ( type === 'number' ) && <div className='input-field__input--arrow-box'>
                  <button className='input-field__input--up-arrow' type='button'/>
                  <button className='input-field__input--down-arrow' type='button'/>
                </div>
              } */}
            </>
          </ReactForm.Control>
        </div>
        {
          additionalText &&
            <ReactForm.Message className='input-field__message'>{additionalText}</ReactForm.Message>
        }
      </ReactForm.Field>
    </ReactForm.Root>
  );
};

export default Input;
