import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

/**View */
import Text from '@lib/ui/Text/Text';
import Flex from '@lib/ui/Flex/Flex';
import ButtonBase from '@lib/ui/ButtonBase/ButtonBase';
import { SvgPlay } from '@lib/ui/Icons/SvgPlay';

export const RenderPage = ({ data, Component }) => {
  const [currentPage, setPage] = useState(1);
  const [dataPerPage, setPetPage] = useState(5);
  const [currentNumber, setNumber] = useState(0);

  const indexOfLastTodo = currentPage * dataPerPage;
  const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
  const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((data, index) => {
    return <Component key={`Component-${index}`} {...data} />;
  });

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers =
    pageNumbers &&
    pageNumbers.map(number => {
      return (
        <div key={`pageNumbers-${number}`} id={`pageNumbers-${number}`}>
          {number}
        </div>
      );
    });

  const dicrement = () => {
    currentNumber === 0 ? 1 : setNumber(currentNumber - 1);
    currentNumber === 0 ? setPage(1) : setPage(currentPage - 1);
  };

  const increment = () => {
    renderPageNumbers.length <= currentNumber + 1 ? currentNumber : setNumber(currentNumber + 1);
    if (renderPageNumbers.length !== currentPage) {
      setPage(currentPage + 1);
    }
  };
  const variantDicrement = currentNumber === 0 ? 'disabled' : 'xsmall';

  const variantIncrement = currentNumber + 1 === renderPageNumbers.length ? 'disabled' : 'xsmall';

  return (
    <>
      {renderTodos}

      <Flex justifyContent={'center'} mt={[4]}>
        <ButtonBase
          onClick={dicrement}
          size={'xsmall'}
          variant={variantDicrement}
          style={{ transform: 'rotate(180deg)' }}>
          {SvgPlay()}
        </ButtonBase>
        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          px={[4]}
          fontFamily={'primary500'}>
          {renderPageNumbers[currentNumber]}
        </Text>
        <ButtonBase onClick={increment} size={'xsmall'} variant={variantIncrement}>
          {SvgPlay()}
        </ButtonBase>
      </Flex>
    </>
  );
};

RenderPage.propTypes = {
  /** data*/
  data: PropTypes.object,
  /** React Component */
  Component: PropTypes.element,
};

export default RenderPage;
