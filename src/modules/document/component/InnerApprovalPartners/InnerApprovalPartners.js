import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Field} from 'redux-form';

/**View */
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';
import Text from '@lib/ui/Text/Text';
import CheckboxBase from '@lib/ui/CheckboxBase/CheckboxBase';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';

const FlexStyled = styled(Flex)`
  border-top: 1px solid;
  ${props => BorderColorProperty({...props, borderColor: 'color7'})};
  padding-bottom: 12px;
  min-height: 45px;
`;

export class InnerApprovalPartners extends Component {
  static propTypes = {
    /** Data  */
    data: PropTypes.element,
  };

  static defaultProps = {
    options: [],
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.options.length !== this.props.options.length) {
      return true;
    }
    if (nextProps.input.value.length !== this.props.input.value.length) {
      return true;
    }
    return false;
  }

  onChange = id => {
    const {
      input: {value, onChange},
    } = this.props;

    let indexCurrentId = this.findUserInValue(value, id); // Возвращаем индекс id
    if (indexCurrentId !== -1) {
      // При повторном клике мы уже находим id и возвращается его index
      onChange(this.removeFromArrayById(value, indexCurrentId)); // передаем массив(не пустой) и индекс на удаление
    } else {
      onChange([...value, id]); // Добавляем в редакс массив и id
    }
  };

  findUserInValue = (value, id) => {
    if (Array.isArray(value) && typeof id !== 'undefined') {
      return value.findIndex(item => item === id); // Возвращаем -1 или индекс id
    } else {
      return false;
    }
  };

  removeFromArrayById(arr, indexes) {
    let slice = [].slice; // В переменную slice скопировали метод
    let arrayOfIndexes = slice.call(arguments, 1); // В переменную arrayOfIndexes одалжили метод, который копирует массив от arg(id) на +1. И получили новый массив в котором вырезали id
    // console.log(1, arr, indexes, arrayOfIndexes, arguments);
    // arr - массив indexes - индекс по которому кликнули 2 раз arrayofIndex - Новый массив arg - id
    return arr.filter(function (item, index) {
      // И в итоге возращаем новый массив
      return arrayOfIndexes.indexOf(index) === -1; //Возвращает индекс id по которому был найден, иначе -1
    });
  }

  render() {
    const {options, input} = this.props;
    return (
      <Fragment>
        <Box mb={'100px'}>
          <Text
            fontSize={6}
            lineHeight={8}
            color={'color7'}
            textAlign={'center'}
            mb={6}
            fontFamily={'primary500'}>
            Утверждающие ОКАН
          </Text>

          {options.length > 0 ? (
            options.map((item, index) => {
              const {id} = item;
              return (
                <FlexStyled
                  key={`InnerApprovalPartners-${index}`}
                  onClick={event => {
                    event.preventDefault();
                    return this.onChange(id);
                  }}
                  pt={3}>
                  <CheckboxBase
                    input={input}
                    id={id}
                    checked={this.findUserInValue(input.value, id) >= 0}
                  />

                  <Text
                    fontFamily={'primary300'}
                    fontSize={6}
                    lineHeight={8}
                    color={'color11'}
                    ml={20}>
                    {item.name}
                  </Text>
                </FlexStyled>
              );
            })
          ) : (
            <Text
              fontFamily={'primary300'}
              fontSize={6}
              lineHeight={8}
              color={'color11'}
              textAlign={'center'}>
              Cписок согласующих пуст
            </Text>
          )}
        </Box>
      </Fragment>
    );
  }
}

export default InnerApprovalPartners;
