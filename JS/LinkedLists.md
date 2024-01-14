# Связный список (Linked Lists)

Связный список - это структура данных, в которой несколько значений хранятся линейно. Каждое значение содержит своё собственное значение узла, а также содержит данные вместе со ссылкой на следующий узел в списке. Ссылка - это указатель на другой объект узла или на null, если следующего узла нет. Если у каждого узла есть только один указатель на другой узел (чаще всего называется next), то этот список считается односвязный (singly linked list); тогда как если у каждого узла есть две ссылки (обычно previous и next), то он считается двусвязный (doubly linked list).

## Зачем использовать связный список
Основное преимущество связных списков состоит в том, что они могут содержать произвольное количество значений, используя необходимый объем памяти. Сохранение памяти было очень важно на старых компьютерах, где мало памяти. Для массивов требовалось резервировать необходимый обьем памяти под элементы и можно было легко исчерпать доступную память или наоборот, не использовать то, что было зарезервировано. Связные списки были созданы, чтобы обойти эту проблему.

Связные списки стали популярными, когда разработчики не знали, сколько элементов в конечном итоге будет содержать массив. Было гораздо проще использовать связный список и добавлять значения по мере необходимости, чем точно угадывать максимальное количество значений, которое может содержать массив. Такие связные списки часто используются в качестве основы для встроенных структур данных в различных языках программирования.

Встроенный тип JavaScript Array не реализован как связный список, хотя его размер динамический и всегда является лучшим вариантом для начала. Мы можем пройти всю свою карьеру без необходимости в использовании связных списков в JavaScript, но они по-прежнему являются хорошим способом узнать о создании собственных структур данных.

ссылка на статью https://frontend-stuff.com/blog/linked-lists-with-javascript/