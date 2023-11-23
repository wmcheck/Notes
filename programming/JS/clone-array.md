# Как сделать копию массива на js

С помощью цикла for:

```JavaScript
const array = [1, 2, 3, 'hello', true, [4, 5]];

const arrayCopy = [];
for (let i = 0; i < array.length; i += 1) {
  arrayCopy[i] = array[i];
}

console.log(arrayCopy); // => [1, 2, 3, 'hello', true, [4, 5]]
// убеждаемся, что это другой массив
console.log(array === arrayCopy); // => false
```

С помощью метода map():
```JavaScript
const arrayCopy = array.map((element) => element);

console.log(arrayCopy); // => [1, 2, 3, 'hello', true, [4, 5]]
console.log(array === arrayCopy); // => false
```

С помощью комбинации методов JSON.parse() и JSON.stringify() (подходит для глубокого копирования массивов и объектов):
```JavaScript
const arrayCopy = JSON.parse(JSON.stringify(array));

console.log(arrayCopy); // => [1, 2, 3, 'hello', true, [4, 5]]
console.log(array === arrayCopy); // => false
```

С помощью метода concat():
```JavaScript
const arrayCopy = array.concat([]);

console.log(arrayCopy); // => [1, 2, 3, 'hello', true, [4, 5]]
console.log(array === arrayCopy); // => false
```

С помощью метода Array.from():
```JavaScript
const arrayCopy = Array.from(array);

console.log(arrayCopy); // => [1, 2, 3, 'hello', true, [4, 5]]
console.log(array === arrayCopy); // => false
```

Копию массива в js можно получить используя встроенный метод slice():
```JavaScript
const arr = [1, 2, 3];
// получаем копию массива
const copyArr = arr.slice();
console.log(copyArr); // => [1, 2, 3]
// убедится в том что это другой массив можно сравнив ссылки на массивы
arr === copyArr // false

В качестве альтернативы можно воспользоваться возможностями spread оператора:

const arr = [1, 2, 3];
const copyArr = [...arr];
console.log(copyArr); // => [1, 2, 3]
arr === copyArr // false
```
