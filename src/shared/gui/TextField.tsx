import { Popover } from 'antd';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { sideColor, sideColor6, sideColor8, sideColor13 } from '../../utils/colorsUtil';
import { cs } from '../../utils/css';
import * as styles from './TextField.styles';

interface IProps {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
  styleType: 'bordered' | 'underlined' | 'none';
  autoFocus?: boolean;
  mode: 'light' | 'dark';
  type?: 'text' | 'number' | 'numerical';
  imposeMinMax?: any;
  onBlur?: () => void;
  popupDescription?: {
    title?: string;
    description: string;
  };
}

export const TextField = ({
  name,
  placeholder,
  disabled,
  styleType,
  autoFocus,
  mode,
  style,
  type,
  popupDescription,
  ...props
}: IProps) => {
  const { control } = useFormContext();

  let borderWidth = '';

  if (styleType === 'bordered') {
    borderWidth = '0.06rem';
  } else if (styleType === 'underlined') {
    borderWidth = '0 0 0.06rem';
  } else {
    borderWidth = '0rem';
  }

  let additionalProps: any = { ...props };
  if (type === 'numerical') {
    additionalProps = {
      type: 'number',
      inputMode: 'decimal',
      autoComplete: 'off',
      autoCorrect: 'off',
      title: 'Invalid number',
      placeholder: '0.0',
      minLength: 1,
      maxLength: 79,
      spellCheck: 'false',
    };
  }

  const inputComponent = (
    <div style={styles.inputParentStyle}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => {
          return (
            <input
              className={styles.inputClassName(
                mode === 'light' ? sideColor8 : sideColor13,
                mode === 'light' ? sideColor : sideColor6,
              )}
              style={cs(style, { borderWidth: borderWidth })}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              type={type || 'text'}
              {...additionalProps}
              onChange={(e) => {
                if (type === 'numerical') {
                  // replace commas with periods
                  const formattedValue = e.target.value.replace(/,/g, '.');
                  onChange(formattedValue);
                } else {
                  onChange(e);
                }
              }}
            />
          );
        }}
      />
    </div>
  );

  if (popupDescription)
    return (
      <Popover
        trigger="focus"
        content={() => <div style={styles.popup}>{popupDescription?.description}</div>}
        title={popupDescription?.title}>
        {inputComponent}
      </Popover>
    );

  return inputComponent;
};
