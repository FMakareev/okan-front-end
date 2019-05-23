import React, { Component } from 'react';
import { DropdownMenuList } from '../DropdownMenuList/DropdownMenuList';
import { ROLE_EXTERNALCONTRACTOR, ROLE_USER } from '@lib/shared/roles';
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';
import { Relative } from '@lib/ui/Relative/Relative';
import { Absolute } from '@lib/ui/Absolute/Absolute';
import { captureException } from '../../../../hocs/withSentry/withSentry';

export class AddContractorButton extends Component {
  state = {
    isOpen: false,
  };

  componentWillUnmount() {
    if (isBrowser) {
      document.removeEventListener('click', this.eventHandle, false);
    }
  }

  componentWillMount() {
    if (isBrowser) {
      document.addEventListener('click', this.eventHandle, false);
    }
  }

  /**
   * @param {array} path - массив объекто дом элементов начиная от того на котором сработало событие и до корня документа
   * @param {string} className - название класса который
   * @desc метод ищет в массиве класс и возвращает его индекс.
   * */
  findClassInPath = (path, className) => {
    try {
      return path.findIndex(item => item.className && item.className.indexOf(className) >= 0);
    } catch (error) {
      captureException(error);
      return null;
    }
  };

  /**
   * @desc метод является callback обработчиком для прослушивания дом
   * */
  eventHandle = event => {
    try {
      if (Array.isArray(event.path)) {
        if (
          this.findClassInPath(event.path, `AbsoluteDropdownMenuList`) >= 0 ||
          this.findClassInPath(event.path, `AddContractorButton`) >= 0
        ) {
          return null;
        } else {
          if (this.state.isOpen) {
            return this.onToggleMenu();
          }
          return null;
        }
      }
    } catch (error) {
      captureException(error);
    }
  };

  onToggleMenu = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  };

  render() {
    const { isOpen } = this.state;
    const { onChange } = this.props;
    return (
      <Relative>
        <ButtonBase
          className={'AddContractorButton'}
          type={'button'}
          variant={'large'}
          size={'medium'}
          width={'100%'}
          onClick={() => this.onToggleMenu()}>
          Добавить контрагента
        </ButtonBase>
        {isOpen && (
          <Absolute
            className={'AbsoluteDropdownMenuList'}
            left={0}
            right={0}
            top={'calc(100% + 4px)'}
            zIndex={1}>
            <DropdownMenuList
              onChange={value => {
                onChange(value);
                this.onToggleMenu(false);
              }}
              valueKey={'role'}
              options={[
                {
                  label: 'Выбрать из списка',
                  role: ROLE_USER,
                },
                {
                  label: 'Ввести информацию вручную',
                  role: ROLE_EXTERNALCONTRACTOR,
                },
              ]}
            />
          </Absolute>
        )}
      </Relative>
    );
  }
}

export default AddContractorButton;
