# Основа
Редактирование текста, картинок и таблиц. Компонент содержит методы для начала редактирования, автосохранения и сохранения редактирование ячеек. 

# Рендер

В ренедере имеется проверка, если при передаче с компонента ProjectEditor правдивого parentLetterNumber, то мы не рендерим нумерацию , в данном случае около раздела "Приложения". Меняю так же UI компонента, т.к. блок с нумерацией имел другую ширину для позиционирования.

Также помимо провреки на рендер нумерации ячеек эдитора (ProjectEditor), для текстового блока. В этом блоке мы делаем провреку и следующий рендер.

Если режим редактирования ячейки - ложен(false), то и данные не введены то мы по умолчанию выводим надпись : " Нажмите чтобы начать редактирование раздела " , иначе мы парсим html тег, полученный от редактора ( Froala ).

Если режим редактирования ячейки - правдив(true), то мы открываем редактор (EditorCellForm), который последуююее включает методы : автосохранения и фокуса.

Также имеется возможность переименования и именования названия каринки.

И имеется возможность удаления и комментирования ячейки.