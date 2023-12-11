# JavaScript

Сборника интересных и важных заметок о JavaScript.

## Как определить значение this

Четкий алгоритм, определения значения _this_ в каждом конкретном случае:

1. Если мы не находимся внутри функции, то this равно глобальному объекту. Движемся дальше.

2. Если мы находимся внутри стрелочной функции, то значение this равно значению this, находящемуся вне этой функции. Значение this в стрелочной функции определяется исключительно тем, где (в каком лексическом контексте) она была создана, и никак не зависит от того, как она была впоследствии вызвана. Движемся дальше.

3. Если эта функция вызывается с помощью оператора new, то this будет ссылаться на вновь созданный объект в конструкторе функции. Движемся дальше.

4. Если эта функция создана с помощью метода bind, call или apply, то значение this будет аргументом этой функции. Движемся дальше.

5. Если эта функция получена как свойство объекта и сразу же вызвана, то this будет равно данному объекту. Движемся дальше.

6. Если функция вызывается в строгом режиме use strict, то this будет равно undefined. В противном случае this равняется глобальному объекту.

```
const obj = {
    x: 10,
    foo() {
        console.log('this.x', this.x, this); //10 , {obj}
        setTimeout(() => {
            console.log('settimeOut () => {}', this.x, this); //10, {obj}
        }, 2000);
        setTimeout(function () {
            console.log('settimeOut fn(){}', this.x, this); //undefined, {window}
        }, 3000);
    },
};

obj.foo();
```