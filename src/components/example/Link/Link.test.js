import React, {Component} from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import {ButtonBase} from "../../ButtonBase/ButtonBase";


class Link extends Component {
  handleClick = () => {
    alert('Кликнули по ссылке!');
  };

  render() {
    const {title, url} = this.props;

    return <a href={url} onClick={this.handleClick}>{title}</a>;
  }
}

test('should render correctly', () => {
  const output = renderer.create(
    <Link title="mockTitle" url="mockUrl"/>
  ).toJSON();
  expect(output).toMatchSnapshot();
});

test('тест вызова события при клике', () => {

  // создаем mock функцию, что вернет не важно
  window.alert = jest.fn();
  // делаем неглубоки рендеринг
  const output = shallow(
    <Link title="mockTitle" url="mockUrl" />
  );
  // симулируем клик
  output.simulate('click');
  // https://jestjs.io/docs/en/expect#tohavebeencalledwitharg1-arg2-
  // проверяем с каким аргументом вызывается функция alert
  expect(window.alert).toHaveBeenCalledWith('Кликнули по ссылке!');
});

// наглядный пример того как работает код выше
test('тест вызова события при клике 21', () => {
  const f = jest.fn(); // создали mock функцию
  f('Test1'); // вызвали с определенными аргументами
  expect(f).toHaveBeenCalledWith('Test1') // проверили с тем ли аргументом она вызывается
});

test('вызывается только один раз', () => {
  const f = jest.fn(); // создали mock функцию
  f('Test1'); // вызвали с определенными аргументами
  expect(f).toHaveBeenCalledTimes(1); // проверили с тем ли аргументом она вызывается
});


class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }
  handleClick = () => {
    alert('clicked');
    this.setState({ clicked: true });
  };

  render() {
    const {title} = this.props;

    return <ButtonBase onClick={this.handleClick}>{title}</ButtonBase>;
  }
}

test('should handle state changes', () => {
  const output = shallow(
    <Button title="mockTitle" />
  );

  expect(output.state().clicked).toEqual(false);
  output.simulate('click');
  expect(output.state().clicked).toEqual(true);
});
