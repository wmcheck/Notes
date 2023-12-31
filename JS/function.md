# Функции

## Что такое прототип

Объект в JS имеет собственные и унаследованные свойства, например, в этом коде:

```
var foo = { bar: 1 };
foo.bar === 1 // true
typeof foo.toString === "function" // true
```

у объекта foo имеется собственное свойство bar со значением 1, но также имеются и другие свойства, такие как toString. Чтобы понять, как объект foo получает новое свойство toString, посмотрим на то, из чего состоит объект:

![image](https://github.com/wmcheck/Notes/assets/2428660/0a1741ae-4c67-41f3-9efb-51b3ca0f3e8c)

Дело в том, что у объекта есть ссылка на другой объект-прототип. При доступе к полю foo.toString сначала выполняется поиск такого свойства у самого объекта, а потом у его прототипа, прототипа его прототипа, и так пока цепочка прототипов не закончится. Это похоже на односвязный список объектов, где поочередно проверяется объект и его объекты-прототипы. Так реализовано наследование свойств, например, у (почти, но об этом позже) любого объекта есть методы valueOf и toString.


## Как выглядит прототип 

У всех прототипов имеются два общих свойства, constructor и __proto__. Свойство constructor указывает на функцию-конструктор, с помощью которой создавался объект, а свойство __proto__ указывает на следующий прототип в цепочке (либо null, если это последний прототип). Остальные свойства доступны через ., как в примере выше.


Да кто такой этот ваш constructor 

constructor – это ссылка на функцию, с помощью которой был создан объект: 


const a = {};
a.constructor === Object // true

Не совсем понятна идея зачем он был нужен, возможно, как способ клонирования объекта: 


object.constructor(object.arg)

В остальном же использовать constructor лучше не стоит, так как это writable свойство, которое можно случайно перезаписать, работая с прототипом, и сломать часть логики.


## Где живёт прототип 

На самом деле, объекты представляют собой не только поля, доступные для JS кода. Интерпретатор также сохраняет некоторые приватные данные объекта для работы с ним, для этого в стандарте определено понятие внутренних слотов, которые обозначены как имя в квадратных скобках [[SlotName]]. Для прототипов отведен приватный слот [[Prototype]] содержащий ссылку на объект-прототип (либо null, если прототипа нет).

![image](https://github.com/wmcheck/Notes/assets/2428660/b81fe84c-0cf2-4d42-b0db-132214467d11)


Из-за того, что [[Prototype]] предназначался исключительно для самого JS движка, получить доступ к прототипу объекта было невозможно. Для случаев когда это было нужно, ввели нестандартное свойство __proto__, которое поддержали многие браузеры и которое по итогу попало в сам стандарт, но как опциональное и стандартизированное только для обратной совместимости с существующим JS кодом.


О чем вам недоговаривает дебаггер, или он вам не прототип

Свойство __proto__ является геттером и сеттером для внутреннего слота [[Prototype]] и находится в Object.prototype:

![image](https://github.com/wmcheck/Notes/assets/2428660/6a103230-846b-4d3d-8a5f-56dafa20f64f)

Из-за этого я избегал записи __proto__ для обозначения прототипа. __proto__ находится не в самом объекте, что приводит к неожиданным результатам. Для демонстрации попробуем через __proto__ удалить прототип объекта и затем восстановить его:

```
const foo = {};
foo.toString(); // метод toString() берется из Object.prototype и вернет '[object Object]', пока все хорошо
foo.__proto__ = null; // делаем прототип объекта null
foo.toString(); // как и ожидалось появилась ошибка TypeError: foo.toString is not a function
foo.__proto__ = Object.prototype; // восстанавливаем прототип обратно
foo.toString(); // прототип не вернулся, ошибка TypeError: foo.toString is not a function
```

Как так получилось? Дело в том, что __proto__ – это унаследованное свойство Object.prototype, а не самого объекта foo. Из-за этого в момент когда в цепочке прототипов пропадает ссылка на Object.prototype, __proto__ превращается в тыкву и перестает работать с прототипом.
А теперь отработаем кликбейт из введения. Представим следующую цепочку прототипов:
![image](https://github.com/wmcheck/Notes/assets/2428660/2b7daacf-ac9d-4b00-a3aa-e4c34dc0b98c)

```
var baz = { test: "test" };
var foo = { bar: 1 };
foo.__proto__ = baz;
```
В консоли Chrome foo будет выглядеть следующим образом:

![image](https://github.com/wmcheck/Notes/assets/2428660/e422731c-d607-4414-830e-b71d686581b1)


А теперь уберем связь между baz и Object.prototype:

```
baz.__proto__ = null;
```
И теперь в консоли Chrome видим следующий результат:

![image](https://github.com/wmcheck/Notes/assets/2428660/9d9971b7-e972-4b6b-87af-63b2895c9e22)


Связь с Object.prototype разорвана у baz и __proto__ возвращает undefined даже у дочернего объекта foo, однако Chrome все равно показывает что __proto__ есть. Скорее всего тут имеется в виду внутренний слот [[Prototype]], но для простоты это было изменено на __proto__, ведь если не извращаться с цепочкой прототипов, это будет верно.


## Как работать с прототипом объекта

Рассмотрим основные способы работы с прототипом: изменение прототипа и создание нового объекта с указанным прототипом.


Для изменения прототипа у существующего объекта есть всего два метода: использование сеттера __proto__ и метод Object.setPrototypeOf.

```
var myProto = { name: "Jake" };
var foo = {};
Object.setPrototypeOf(foo, myProto);
foo.__proto__ = myProto;
```
Если браузер не поддерживает ни один из этих методов, то изменить прототип объекта невозможно, можно только создать его копию с новым прототипом.
Но есть один нюанс с внутренним слотом [[Extensible]] который указывает на то, возможно ли добавлять к нему новые поля и менять его прототип. Есть несколько функций, которые выставляют этот флаг в false и предотвращают смену прототипа: Object.freeze, Object.seal, Object.preventExtensions. Пример:

```
const obj = {};
Object.preventExtensions(obj);
Object.setPrototypeOf(obj, Function.prototype); // TypeError: #<Object> is not extensible
```
А теперь менее категоричный вопрос создания нового объекта с прототипом. Для этого есть следующие способы.
Стандартный способ:

```
const foo = Object.create(myPrototype);
```
Если нет поддержки Object.create, но есть __proto__:

```
const foo = { __proto__: myPrototype };
```
И в случае если отсутствует поддержка всего вышеперечисленного:

```
const f = function () {}
f.prototype = myPrototype;
const foo = new f();
```
Способ основан на логике работы оператора new, о которой поговорим чуть ниже. Но сам способ основан на том, что оператор new берет свойство prototype функции и использует его в качестве прототипа, т.е. устанавливает объект в [[Prototype]], что нам и нужно.

Есть только два ограничения:

- Ссылки не могут идти по кругу. JavaScript выдаст ошибку, если мы попытаемся назначить __proto__ по кругу.
- Значение __proto__ может быть объектом или null. Другие типы игнорируются.
- может быть только один [[Prototype]]. Объект не может наследоваться от двух других объектов.

### ВАЖНО!
Свойство __proto__ — исторически обусловленный геттер/сеттер для [[Prototype]]
Это распространённая ошибка начинающих разработчиков – не знать разницы между этими двумя понятиями.

Обратите внимание, что __proto__ — не то же самое, что внутреннее свойство [[Prototype]]. Это геттер/сеттер для [[Prototype]]. Позже мы увидим ситуации, когда это имеет значение, а пока давайте просто будем иметь это в виду, поскольку мы строим наше понимание языка JavaScript.

Свойство __proto__ немного устарело, оно существует по историческим причинам. Современный JavaScript предполагает, что мы должны использовать функции Object.getPrototypeOf/Object.setPrototypeOf вместо того, чтобы получать/устанавливать прототип. Мы также рассмотрим эти функции позже.

По спецификации __proto__ должен поддерживаться только браузерами, но по факту все среды, включая серверную, поддерживают его. Так что мы вполне безопасно его используем.

Далее мы будем в примерах использовать __proto__, так как это самый короткий и интуитивно понятный способ установки и чтения прототипа.

## Функции конструкторы как они работают в качестве конструкторов.

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

## Итого
- В JavaScript все объекты имеют скрытое свойство [[Prototype]], которое является либо другим объектом, либо null.
- Мы можем использовать obj.__proto__ для доступа к нему (исторически обусловленный геттер/сеттер, есть другие способы, которые скоро будут рассмотрены).
- Объект, на который ссылается [[Prototype]], называется «прототипом».
-Если мы хотим прочитать свойство obj или вызвать метод, которого не существует у obj, тогда JavaScript попытается найти его в прототипе.
- Операции записи/удаления работают непосредственно с объектом, они не используют прототип (если это обычное свойство, а не сеттер).
- Если мы вызываем obj.method(), а метод при этом взят из прототипа, то this всё равно ссылается на obj. Таким образом, методы всегда работают с текущим объектом, даже если они наследуются.
- Цикл for..in перебирает как свои, так и унаследованные свойства. Остальные методы получения ключей/значений работают только с собственными свойствами объекта.

## F.prototype
новые объекты могут быть созданы с помощью функции-конструктора new F().

Если в F.prototype содержится объект, оператор new устанавливает его в качестве [[Prototype]] для нового объекта.

F.prototype используется только в момент вызова new F
F.prototype используется только при вызове new F и присваивается в качестве свойства [[Prototype]] нового объекта.

Если после создания свойство F.prototype изменится (F.prototype = <другой объект>), то новые объекты, созданные с помощью new F, будут иметь в качестве [[Prototype]] другой объект, а уже существующие объекты сохранят старый.

F.prototype по умолчанию, свойство constructor
У каждой функции (за исключением стрелочных) по умолчанию уже есть свойство "prototype".

По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.

Вот такой:
```
function Rabbit() {}

/* прототип по умолчанию
Rabbit.prototype = { constructor: Rabbit };
*/
```
Проверим это:

```
function Rabbit() {}
// по умолчанию:
// Rabbit.prototype = { constructor: Rabbit }

alert( Rabbit.prototype.constructor == Rabbit ); // true
```
Соответственно, если мы ничего не меняем, то свойство constructor будет доступно всем кроликам через [[Prototype]]:
```
function Rabbit() {}
// по умолчанию:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); // наследует от {constructor: Rabbit}

alert(rabbit.constructor == Rabbit); // true (свойство получено из прототипа)
```

__Мы можем использовать свойство constructor существующего объекта для создания нового.__

Пример:
```
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

let rabbit2 = new rabbit.constructor("Black Rabbit");
```
Это удобно, когда у нас есть объект, но мы не знаем, какой конструктор использовался для его создания (например, он мог быть взят из сторонней библиотеки), а нам необходимо создать ещё один такой объект.

Но, пожалуй, самое важное о свойстве "constructor" это то, что…

…JavaScript сам по себе не гарантирует правильное значение свойства "constructor".

Да, оно является свойством по умолчанию в "prototype" у функций, но что случится с ним позже – зависит только от нас.

В частности, если мы заменим прототип по умолчанию на другой объект, то свойства "constructor" в нём не будет.

Таким образом, чтобы сохранить верное свойство "constructor", мы должны добавлять/удалять/изменять свойства у прототипа по умолчанию вместо того, чтобы перезаписывать его целиком:

```
function Rabbit() {}

// Не перезаписываем Rabbit.prototype полностью,
// а добавляем к нему свойство
Rabbit.prototype.jumps = true
// Прототип по умолчанию сохраняется, и мы всё ещё имеем доступ к Rabbit.prototype.constructor
Или мы можем заново создать свойство constructor:

Rabbit.prototype = {
  jumps: true,
  constructor: Rabbit
};

// теперь свойство constructor снова корректное, так как мы добавили его
```

## Итог
способ задания [[Prototype]] для объектов, создаваемых с помощью функции-конструктора. 
Выделим основные моменты:

- Свойство F.prototype (не путать с [[Prototype]]) устанавливает[[Prototype]] для новых объектов при вызове new F().
- Значение F.prototype должно быть либо объектом, либо null. Другие значения не будут работать.
- Свойство "prototype" является особым, только когда оно назначено функции-конструктору, которая вызывается оператором new.

В обычных объектах prototype не является чем-то особенным:
```
let user = {
  name: "John",
  prototype: "Bla-bla" // никакой магии нет - обычное свойство
};
```
По умолчанию все функции имеют F.prototype = { constructor: F }, поэтому мы можем получить конструктор объекта через свойство "constructor".


> Стрелочные функции не имеют "arguments"
Если мы обратимся к arguments из стрелочной функции, то получим аргументы внешней «нормальной» функции.

Пример:

function f() {
  let showArg = () => alert(arguments[0]);
  showArg(2);
}

f(1); // 1
Как мы помним, у стрелочных функций нет собственного this. Теперь мы знаем, что нет и своего объекта arguments.

## ЗАДАНИЯ

### Декоратор defer
Добавьте функциям декорирующий метод "defer()"
Добавьте всем функциям в прототип метод defer(ms), который возвращает обёртку, откладывающую вызов функции на ms миллисекунд.

Например, должно работать так:
```JavaScript
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // выведет 3 через 1 секунду.
```

Решение
```JavaScript
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// check it
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // выведет 3 через 1 секунду.
```

### Декоратор debounce

debounce(f, ms) – это обёртка, которая откладывает вызовы f, пока не пройдёт ms миллисекунд бездействия (без вызовов, «cooldown period»), а затем вызывает f один раз с последними аргументами.

Другими словами, debounce – это так называемый секретарь, который принимает «телефонные звонки», и ждёт, пока не пройдет ms миллисекунд тишины. И только после этого передает «начальнику» информацию о последнем звонке (вызывает непосредственно f).

Например, у нас была функция f и мы заменили её на f = debounce(f, 1000).


```JavaScript
let f = debounce(console.log, 1000);
f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 2500);
setTimeout( () => f("d"), 400);
setTimeout( () => f("e"), 500);
setTimeout( () => f("f"), 5200);

function debounce(func, ms) {
    let timerId;

    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => func.apply(this, args), ms);  
    }
}  
```

## Тормозящий (throttling) декоратор

«тормозящий» декоратор throttle(f, ms), который возвращает обёртку.

При многократном вызове он передает вызов f не чаще одного раза в ms миллисекунд.

По сравнению с декоратором debounce поведение совершенно другое:

- debounce запускает функцию один раз после периода «бездействия». Подходит для обработки конечного результата.
- throttle запускает функцию не чаще, чем указанное время ms. Подходит для регулярных обновлений, которые не должны быть слишком частыми.
Другими словами, throttle похож на секретаря, который принимает телефонные звонки, но при этом беспокоит начальника (вызывает непосредственно f) не чаще, чем один раз в ms миллисекунд.

### Реальное применение 

Например, мы хотим отслеживать движения мыши.

В браузере мы можем реализовать функцию, которая будет запускаться при каждом перемещении указателя и получать его местоположение. Во время активного использования мыши эта функция запускается очень часто, что-то около 100 раз в секунду (каждые 10 мс). Мы бы хотели обновлять некоторую информацию на странице при передвижении указателя.

…Но функция обновления update() слишком ресурсоёмкая, чтобы делать это при каждом микродвижении. Да и нет смысла делать обновление чаще, чем один раз в 1000 мс.

Поэтому мы обернём вызов в декоратор: будем использовать throttle(update, 1000) как функцию, которая будет запускаться при каждом перемещении указателя вместо оригинальной update(). Декоратор будет вызываться часто, но передавать вызов в update() максимум раз в 1000 мс.

Визуально это будет выглядеть вот так:

1. Для первого движения указателя декорированный вариант сразу передаёт вызов в update. Это важно, т.к. пользователь сразу видит нашу реакцию на его перемещение.
2. Затем, когда указатель продолжает движение, в течение 1000 мс ничего не происходит. Декорированный вариант игнорирует вызовы.
3. По истечению 1000 мс происходит ещё один вызов update с последними координатами.
4. Затем, наконец, указатель где-то останавливается. Декорированный вариант ждёт, пока не истечёт 1000 мс, и затем вызывает update с последними координатами. В итоге окончательные координаты указателя тоже обработаны.

```JavaScript
function throttle(func, ms) {
    let saveArgs;
    let saveThis;
    let isThrottle = false;
    
    function wrapper(...args) {

        if (isThrottle) {
            saveArgs = args;
            saveThis = this;
            return
        }

        func.apply(this, args);
        isThrottle = true;

        setTimeout(() => {
            isThrottle = false;
            
            if (saveArgs) {
                wrapper.apply(saveThis, saveArgs);
                saveArgs = saveThis = null;
            }
          }, ms);
    }
    return wrapper
}

function f(a) {
  console.log(a)
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано
```
