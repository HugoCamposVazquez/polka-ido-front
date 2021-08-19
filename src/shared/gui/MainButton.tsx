import { Button } from 'antd';
import React, { useCallback } from 'react';

import { cs } from '../../utils/css';
import * as styles from './MainButton.styles';

type IProps = {
  title: string;
  onClick: () => void;
  type: 'fill' | 'bordered';
  style?: any;
  disabled?: boolean;
};

export const MainButton = ({ title, onClick, type, style, disabled }: IProps) => {
  const getButtonStyle = useCallback(() => {
    if (disabled) {
      return styles.fillButtonDisabledStyle;
    }

    if (type === 'fill') {
      return styles.fillButtonStyle;
    }
    return styles.borderedButtonStyle;
  }, [type, disabled]);

  const buttonStyle = getButtonStyle();

  console.log('buttonStyle: ', buttonStyle);
  return (
    <Button onClick={onClick} style={cs(buttonStyle, style)} disabled={disabled}>
      {title}
    </Button>
  );
};
