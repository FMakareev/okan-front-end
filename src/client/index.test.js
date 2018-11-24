import React, {Component} from 'react';
import renderer from 'react-test-renderer';
// import {ROOT} from "./index";
// import { render } from 'react-dom';

// jest.mock('react-dom');

class Link extends Component {
  handleClick = () => {
    alert('Кликнули по ссылке!');
  };

  render() {
    const {title, url} = this.props;

    return <a href={url} onClick={this.handleClick}>{title}</a>;
  }
}

test('ПРоверка', () => {
  const output = renderer.create(
    <Link title="mockTitle" url="mockUrl"/>
  ).toJSON();
  expect(output).toMatchSnapshot();
});
// test('ROOT: Проверка рендера рутового компонента', () => {
//   render(ROOT)
// });
