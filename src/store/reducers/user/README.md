> ! 

## Structure

```
{
  error: null, // ошибка инициализации или обновления пользователя в редакс
  initLoading: false, // отвечает за статус инициализации пользователя
  updateLoading: false, // отвечает за статус выполнения обновления пользователя в приложении, нужен в профиле когда ты обновляешь данне пользоваетеля
  isAuth: false, // отвечает за авторизованность пользователя
  ...
}
```


## actions

### userInit

Нужен для инициализации пользователя в приложении при старте. 
Он вызывается каждый раз при ребуте страницы, получает из localStorage данные пользователя 
и выполняет запрос на сервер чтобы получить его данные на клиент обновляя их в localStorage и записывая в redux.
Это позволяет всегда иметь актуальные данные пользователя. 
 Вызывается так:

```js
import userInit from './actions';
Store.dispatch(userInit());
```

### userRemove

Нужен для удаления пользователя из приложения. Используется в logout чтобы сбросить redux, localstorage и cookie. Вызывается так:

```js
import userRemove from './actions';
Store.dispatch(userRemove());
```

### userUpdate

Нужен для обновления данны пользователя в localStorage и в redux. 
Выполняем после метода updateuser для текущего авторизованного пользователя чтобы обновить его данные в localStorage и redux. 
Вызывается так:

```js
import userUpdate from './actions';
Store.dispatch(userUpdate());
```
