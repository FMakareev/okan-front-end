export const messageNotificationUnbindCell = () => {
  return {
    success: {
      title: 'Блок отвязан',
      message: 'Вы отвязали блок от всех разделов',
      position: 'tr',
      autoDismiss: 2,
    },
    error: {
      title: 'Ошибка',
      message: 'Не удалось отвязать блок',
      position: 'tr',
      autoDismiss: 2,
    },
  };
};
