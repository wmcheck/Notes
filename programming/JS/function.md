# Функции

Что такое new 

На самом деле оператор new не таит в себе никакой магии. При вызове new выполняет несколько действий:

- Создает новый объект self
- Записывает свойство prototype функции конструктора в прототип объекта self
- Вызывает функцию конструктор с объектом self в качестве аргумента this
- Возвращает self если конструктор вернул примитивное значение, иначе возвращает значение из конструктора

Все эти действия можно сделать силами самого языка, поэтому можно написать свой собственный оператор new в виде функции:

```
function custom_new(constructor, args) {
    // https://stackoverflow.com/questions/31538010/test-if-a-variable-is-a-primitive-rather-than-an-object
    function isPrimitive(val) {
        return val !== Object(val);
    }
    const self = Object.create({});
    const constructorValue = constructor.apply(self, args) || self;
    return isPrimitive(constructorValue) ? self : constructorValue;
}
custom_new(Person, ['John', 'Doe'])
```

Но начиная с ES6 волшебство пришло и к new в виде свойства new.target, которое позволяет определить, была ли вызвана функция как конструктор с new, или как обычная функция:

```
function Foo() {
    console.log(new.target === Foo);
}
Foo(); // false
new Foo(); // true
```

new.target будет undefined для обычного вызова функции, и ссылкой на саму функцию в случае вызова через new;

