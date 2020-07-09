import React from 'react';
import { Alert } from 'antd'

export default () => {

  const close = () => {
    window.location.reload();
  }
  return (
    <Alert
      message="Ошибка!"
      showIcon
      type="error"
      closable
      onClose={close}
    />
  );
}
