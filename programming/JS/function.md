# Функции

## как они работают в качестве конструкторов.

```
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

const user = new Person('John', 'Doe');
```

Функция Person тут является конструктором и создает два поля в новом объекте

Откуда взялся Person.prototype? При объявлении функции, у нее автоматически создается свойство prototype для того чтобы ее можно было использовать как конструктор (note 3), таким образом свойство prototype функции не имеет отношения к прототипу самой функции, а задает прототипы для дочерних объектов. Это позволит реализовывать наследование и добавлять новые методы, например так:
![image](https://github.com/wmcheck/Notes/assets/2428660/a2923a4e-ba3c-4f39-b15c-636248d435e5)


```
Person.prototype.fullName = function () {
    return this.firstName + ' ' + this.lastName;
}
```
![image](https://github.com/wmcheck/Notes/assets/2428660/c16ee8b6-f7e6-4169-9b64-8efa1730c339)

И теперь вызов user.fullName() вернет строку "John Doe".

## Что такое new 

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

## Наследование

Зная все вышеперечисленное, можно сделать классическое наследование дочернего класса Student от класса Person. Для этого нужно


Создать конструктор Student с вызовом логики конструктора Person
Задать объекту `Student.prototype` прототип от `Person`
Добавить новые методы к `Student.prototype`
```
function Student(firstName, lastName, grade) {
    Person.call(this, firstName, lastName);
    this.grade = grade;
}

// вариант 1
Student.prototype = Object.create(Person.prototype, {
    constructor: {
        value:Student,
        enumerable: false,
        writable: true
    }
});

// вариант 2
Object.setPrototypeOf(Student.prototype, Person.prototype);

Student.prototype.isGraduated = function() {
    return this.grade === 0;
}

const student = new Student('Judy', 'Doe', 7);
```
![image](https://github.com/wmcheck/Notes/assets/2428660/8469fb61-ddc0-4bcd-8674-821f1a08baab)

Фиолетовым цветом обозначены поля объекта (они все находятся в самом объекте, т.к. this у всей цепочки прототипов один), а методы желтым (находятся в прототипах соответствующих функций)
Вариант 1 предпочтительнее, т.к. Object.setPrototypeOf может привести к проблемам с производительностью.

## сахар к классу 

Для того чтобы облегчить классическую схему наследование и предоставить более привычный синтаксис, были представлены классы, просто сравним код с примерами Person и Student: 

```
class Person {
    constructor(firstName, lastName) {  
        this.firstName = firstName; 
        this.lastName = lastName;
    }

    fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}

class Student extends Person {
    constructor(firstName, lastName, grade) {
        super(firstName, lastName);
        this.grade = grade;
    }

    isGraduated() {
        return this.grade === 0;
    }
}
```

Уменьшился не только бойлерплейт, но и поддерживаемость: 

В отличие от функции конструктора, при вызове конструктора без new выпадет ошибка
Родительский класс указывается ровно один раз при объявлении

При этом цепочка прототипов получается идентичной примеру с явным указанием prototype у функций конструкторов.


