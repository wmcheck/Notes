# Переменные

Область видимости - зона в которой переменные доступны

- глобальная
- функциональная
- блочная

```
// глобальная
console.log('1');

function exampeFunc() {
  // функциональная
  console.log('2');
}

if (true) {
  // блочная
  console.log('3');
  console.log('4');
}

for (let i = 0; i <10; i++) {
  // блочная
  console.log('5');
  console.log('6');
}

```
