import { Trigger, Portal, Content, Root, Viewport, Group, Value } from '@radix-ui/react-select';
import React, { useCallback, useMemo, useState } from 'react';
import './index.scss';
import SvgRender from 'UI/SvgRender';
import SelectGeneralItem from './components/SelectGeneralItem';

export type IOption<T> = {
  value: T
  label: string
  img?: string
}

const Select = <T extends number | string>( {
  options,
  label,
  onValueChange,
  value,
  imgToShow,
  disabled,
  searchable
}: {
  label: string
  onValueChange: ( value: IOption<T> ) => void
  imgToShow?: string
  value: T
  options: IOption<T>[]
  disabled?: boolean
  searchable?: boolean
} ) => {

  const optionLabel: string = useMemo( () => (
    options.filter( ( option ) => option.value === value )[ 0 ].label
  ), [value, options] );

  const [searchFilter, setSearchFilter] = useState( '' );

  const optionsToShow = useMemo( () => {

    if( !searchFilter ) {
      return options;
    }

    return options.filter( ( item ) => {
      return item.label.toLowerCase().includes( searchFilter.toLowerCase() );
    } );
  }, [searchFilter, options] );

  const handleSearchChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setSearchFilter( e.target.value );
  };

  const onChange = useCallback( ( value: string ) => {
    const index = Number( value );
    onValueChange( options[ index ] );
  }, [options, onValueChange] );

  if ( !options.length ) {
    return null;
  }

  return (
    <div className='select'>
      <div className='select__label'>{label}</div>
      <Root
        onValueChange={ onChange }
        disabled={ disabled }
      >
        <Trigger className='select__trigger' aria-label={ label }>
          <div className='select__trigger-value'>
            {imgToShow &&
              <div className='select__trigger-value-img'>
                <img crossOrigin='anonymous' src={ imgToShow } alt={ imgToShow }/>
              </div>
            }
            <Value>
              {optionLabel}
            </Value>
          </div>
          {!disabled && <div className='select__trigger-icon'>
            <div className='select__trigger-icon-arrow'/>
          </div>}
        </Trigger>

        <Portal className='select__portal'>
          <Content className='select__content' position='popper' sideOffset={ 5 }
            onCloseAutoFocus={ () => {
              setSearchFilter( '' );
            } }
          >
            <Viewport className='select__viewport'>
              <Group>
                <div className='select__group'>
                  <div className='select__group-inner'>

                    { searchable && <div className={ 'select__search-wrapper' }>
                      <SvgRender
                        src={ './svg/search.svg' }
                        wrapperClassName={ 'select__search-icon' }
                      />
                      <input type='text'
                        value={ searchFilter }
                        onChange={ handleSearchChange }
                        onBlur={ ( e ) => {
                          e.target?.focus();
                        } }
                        placeholder={ `Search ${ label }` }
                      />
                    </div> }

                    {optionsToShow.map( ( { label, img }, index ) => (
                      <SelectGeneralItem
                        key={ label }
                        value={ index }
                        img={ img }
                      >
                        {label}
                      </SelectGeneralItem>
                    ) )}
                  </div>
                </div>
              </Group>
            </Viewport>
          </Content>
        </Portal>
      </Root>
    </div>
  );
};

export default Select;
