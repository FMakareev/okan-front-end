import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

/**View */
import Text from '@lib/ui/Text/Text';
import Flex from '@lib/ui/Flex/Flex';

/** Components */
import ProfileNotificationItem from '../ProfileNotificationItem/ProfileNotificationItem';


export const ProfileNotification = ({ data }) => {
  const [currentPage, setPage] = useState(1);
  const [dataPerPage, setPetPage] = useState(5);

  const handleClick = event => {
    return setPage(Number(event.target.id));
  };

  const indexOfLastTodo = currentPage * dataPerPage;
  const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
  const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((data, index) => {
    return <ProfileNotificationItem key={`ProfileNotificationItem-${index}`} {...data} />;
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  // TODO: во первых стилизуй кнопки иначе это выглядит как ошибка
  // TODO: id={number} - id Должен быть уникальным, просто цифра не уникальный id
  // TODO: если страница всего дня нет смысла выводить кнпоку паганиции
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <div key={number} id={number} onClick={handleClick}>
        {number}
      </div>
    );
  });

  return (
    <Fragment>
      <Text
        fontSize={6}
        lineHeight={8}
        color={'color7'}
        textAlign={'center'}
        mb={[4]}
        fontFamily={'primary500'}>
        Оповещения
      </Text>

      {/*data &&
        data.map((item, index) => (
          <ProfileNotificationItem key={`ProfileNotificationItem-${index}`} {...item} />
        ))*/}

      {renderTodos}

      <Flex> {renderPageNumbers}</Flex>
    </Fragment>
  );
};

ProfileNotification.propTypes = {
  /** message user*/
  message: PropTypes.string,
};

export default ProfileNotification;
