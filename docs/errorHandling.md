# Error Handling - best practices.

## Использование Try/Catch

### В методе класса

Если метод класса должен вернуть данные то стоит обернуть все тело функции или часть где 
явно может пойти что-то не так в Try/Catch и в Catch вернуть валидный тип данных, например:

```js
class ForBar {  
  // метод принимает на вход объект, преобразует его в массив и возвращает его
  // для того чтобы тот участок кода который вызывает этот метод получил валидные данные и не вылетел
  // имеет смысл вернуть пустой массив
  // также не забываем указать значение по умолчанию
  objectToArray(object = {}){    
    try{
      return Object.values(object);
    }catch (error){
      console.error('Error in method - objectToArray: ',error);
      return [];
    }    
  }
  
}
```

```jsx harmony
import React,{Component} from 'react';
import Link from 'react-router-dom';

class Menu extends Component {
  
  // метод генерирует меню и возвращает jsx разметку,  
  // в данном примере если на этапе формирования меню вылетит исключение мы вернем null т.к. React render возвращает либо null либо компоненту
  // так же не забываем указать значение по умолчанию для аргумента, это дополнительная мера безопасности
  createMenu(menuList = []){
    try{
      return (<ul>
          {
            menuList.map((item, index) => <li key={`menu-${index}`}>
              <Link to={item.link}>
                {item.title}
              </Link>
            </li>)            
          }
      </ul>);
    } catch (error){
      console.error('Error in method - createMenu: ',error);
      return null;
    }    
  }
  
  render(){
    return(<div>
      {
        this.createMenu()
      }
    </div>)
  }
}
```

Если у вас есть компонента которая принимает внешние данные и вы понимаете что без них нет смысла
 её даже пытатся рендерить то имеет смысл сделать проверку !data вывести оповещение в консоль и вернуть либо null
 либо компоненту с сообщением о том что объект пуст:

```jsx harmony
import React,{Component} from 'react';


class Products extends Component {
  render(){
    const {data} = this.props;
    if(!data){
      console.info('[Products info]: Message: data is empty.');
      return null
    }
    return(<div>
      {
        data && data.map((item, index) => <div key={`item-${index}`}>{item}</div>)
      }
    </div>)
  }
}


class App extends Component {
  render(){
    return(<div>
      <Products />
    </div>)
  }
}
```














