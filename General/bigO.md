# Big O нотация: что это такое и почему ее обязательно нужно знать каждому программисту

Чем отличается структура данных от абстрактного типа данных? Что такое Big O нотация и как ее применять?
О структурах данных
Представьте, что вы создали очень популярное приложение, число пользователей которого быстро приближается к миллиону. Хотя пользователям нравится приложение, они жалуются, что оно работает медленно, из-за чего некоторые пользователи покидают ваш сервис.

Вы решили разобраться, в чем проблема и заметили, что основным узким местом является способ получения информации о пользователе при аутентификации. Ваше приложение ищет запрашиваемый идентификатор пользователя внутри несортированного списка словарей Python до тех пор, пока идентификатор не будет найден. Именно это создает проблему.

Попытаемся понять, что мы можем сделать. Как мы можем хранить идентификаторы пользователей таким образом, чтобы получить любой из них как можно быстрее? В этом случае может помочь сортировка списка. Однако, если мы каждый раз будем искать id с самого начала, то столкнемся с тем, что новые клиенты с большим количеством идентификаторов будут проходить множество шагов для аутентификации. Если мы попытаемся начать поиск с конца списка, тогда клиенты, которые были с нами с самого начала, будут в низком приоритете.

Более эффективный подход заключается в том, чтобы расположить данные о пользователях в виде двоичного дерева поиска, что позволит нам найти любой из миллиона идентификаторов значительно быстрее. Версия этой структуры данных является одним из способов индексирования записей внутри базы для быстрого поиска. Постепенный перенос информации пользователей в базу данных снижает задержку приложения.

![image](https://github.com/wmcheck/Notes/assets/2428660/88f970a0-32a8-4855-bcd4-c83716cc89f6)

Структуры данных, которые используют программы из примера выше, определяют, будет ли код масштабироваться по мере роста объема данных. Или придется переписывать все с нуля каждый раз, когда количество пользователей будет увеличиваться?

Выбор правильных структур данных имеет решающее значение для масштабируемого кода. От этого зависит все: быстрый поиск кратчайшего пути между локациями, постоянное обслуживание приоритетных элементов в регулярно меняющемся списке, мгновенное и безопасное подтверждение корректно введенного пароля.

Прежде чем приступить к изучению структур данных, необходимо понять, что это такое и как их сравнивать. Начнем с изучения различий внутри структур данных и их назначения – абстрактных типов данных. Далее расскажем про Big O нотацию – метрику для сравнения скорости операций над структурами данных и пройдемся по основным типам данных, которые хранятся внутри структуры данных.

Необходимо понять, что не существует «идеальной» структуры данных, потому что её полезность полностью зависит от того, как она используется. Исходя из этого важно определить потребности вашей программы, чтобы подобрать подходящий инструмент для работы.

## Структуры данных vs абстрактные типы данных
В программировании, как и в реальной жизни, существует множество способов выполнения задачи. Допустим, вы хотите выкопать яму. В вашем распоряжении есть вилы, молоток, пила и лопата. Каждый инструмент можно рассматривать как «структуру данных» в том смысле, что он является конкретным средством для решения проблемы.

Однако, если отделить задачу от способа ее выполнения, вы увидите, что данные инструменты выполняют роль «средства для копания» и являются абстрактным типом данных. То, как вы на самом деле копаете, можно назвать структурой данных. Абстрактный тип данных – это теоретическая сущность, а структура данных – это ее реализация.

Рассмотрим еще один пример. Предположим, вы хотите навестить своего друга, живущего на другом конце города. В вашем распоряжении велосипед, автомобиль и ноги. Здесь транспортное средство – это абстрактный тип данных. То, как вы передвигаетесь – это структура данных.
![image](https://github.com/wmcheck/Notes/assets/2428660/6d906ae9-67da-4819-bf96-5f8e56066b7c)

Это различие важно, так как существует несколько способов выполнения задачи. У каждого из них свои плюсы и минусы, которые зависят от конкретной программы. Так, для рытья ям лучше всего подходит лопата. Однако, для перемещения по городу «правильная» структура данных зависит от внешнего контекста. Например, автомобиль является самым быстрым способом, но для него нужны дороги, тогда как наши ноги медленнее, но могут использовать любые маршруты.

Структура данных – это конкретный инструмент, который мы используем для выполнения задачи. Но нашего пользователя волнует только абстрактный тип данных. Вашего друга не беспокоит, как вы доберетесь до его дома, главное, чтобы вы пришли вовремя.

Еще один пример. Представьте, что вам нужно убрать чистое белье. Структурой данных с низким временем записи и высоким временем чтения будет стопка одежды. Добавление в эту стопку происходит быстро, но извлечение конкретного предмета происходит медленнее, так как приходится искать его в несортированном белье.

Альтернативным методом может быть аккуратное размещение одежды в комоде или шкафу. Этот метод имеет высокое время записи и низкое время чтения, поскольку потребуется больше времени, чтобы разложить одежду, но вы сможете быстрее получить доступ к любому предмету, который вы искали.

![image](https://github.com/wmcheck/Notes/assets/2428660/df4badcc-84fb-4399-bb4e-5ad6ce0ec861)

Данные примеры не далеки от стратегий сброса данных в AWS S3 по сравнению с базой данных или хранения данных в высокоструктурированной базе данных SQL по сравнению с гибкой базой данных NoSQL.

## Big O нотация
Логично, что лопатой легче выкопать яму, чем молотком, но как оценить разницу в производительности? Количество секунд, которые мы потратим на то, чтобы вырыть яму – это хорошая метрика. При этом для работы с ямами разного размера нам нужен расчет времени, который учитывает объем и глубину. Есть и другие факторы, которые придется учесть. Такие, как разный размер лопат и возможности людей, которые копают. Бодибилдер с молотком может выкопать яму быстрее, чем ребенок с лопатой, но это не значит, что молоток – лучший инструмент для копания.

![image](https://github.com/wmcheck/Notes/assets/2428660/59ea6003-6c21-4aa6-b180-ff1a5c996497)

В компьютерных терминах эти два аспекта можно представить как объем обрабатываемых данных и как используемую машину. При сравнении того, насколько хорошо структуры данных выполняют какую-либо операцию, нам нужна метрика, которая количественно определяет, как производительность зависит от объема данных. Например, хранение новых данных или получение запрошенного элемента. Это не зависит от того, какую машину мы используем.

Для этого мы можем обратиться к нотации Big O, обозначаемой как O(⋅). Big O – это мера эффективности «в худшем случае», верхняя граница того, сколько времени потребуется для выполнения задачи, или сколько памяти для этого необходимо. Например, поиск элемента в несортированном списке имеет значение O(n). Для получения результата, возможно, вам придется перебрать весь список.

Вот еще один пример операции с временной сложностью O(n). При увеличении количества элементов в списке, печать каждого элемента в Python списке занимает больше времени. Если вы удваиваете количество элементов, то удваивается и их время вывода, которое растет линейно.

        
# сложность времени O(n)
def print_num(arr: list):
    for num in arr:
        print(num)

    
Если же мы выводим каждую пару элементов в массиве, то сложность становится O(n²). Массив из 4 элементов требует 16 шагов, массив из 10 элементов – 100 шагов и так далее.

        
# сложность времени O(n^2)
def print_pairs(arr: list):
    for num1 in arr:
        for num2 in arr:
            print(num1, num2)

    
Алгоритм O(n²) не является идеальным. Нам нужен алгоритм, который работает в постоянном режиме. Или O(1), где время выполнения не зависит от объема данных. Например, печать случайного значения из массива всегда будет занимать одно и то же время, независимо от размера массива.

        
# время O(1)
def print_idx(arr: list, i: int):
    print(arr[i])

    
Можно количественно оценить эффективность этих функций с помощью команды %%timeit в Jupyter Notebook. Ниже видно резкое увеличение времени выполнения O(n²) print_pairs. Также видно силу функции O(1) print_idx, время выполнения которой колеблется около 0.153 мс, независимо от размера массива и от того, какой элемент запрашивается, первый или последний.

![image](https://github.com/wmcheck/Notes/assets/2428660/1581c21b-e1fb-416e-8d5a-a49257e5cb1a)

Можно использовать график, подобный приведенному ниже, чтобы сравнить, как масштабируются алгоритмы с различной эффективностью. Зеленая область является идеальной – это наиболее масштабируемое время выполнения, которое растет значительно медленнее, чем объем данных. Данные в серой зоне выглядят удовлетворительно. Ситуация в оранжевой зоне нежелательна. Того, что вы видите в красной зоне, лучше избегать.

![image](https://github.com/wmcheck/Notes/assets/2428660/7699ddb2-554d-474c-ab2b-d777cfdf5b9b)

Однако, для решения каких задач может потребоваться алгоритм из красной зоны? Они необходимы для решения задач, где требуется знать все возможные ответы на вопрос. Одним из таких примеров алгоритма O(2ⁿ) является поиск всех подмножеств массива. Каждый элемент множества может быть либо включен, либо исключен из подмножества. Набор из четырех элементов [A,B,C,D] будет иметь 2⁴ или 16 подмножеств:

[], [A], [B], [C], [D]
[A,B], [A,C], [A,D], [B,C], [B,D], [C,D]
[A,B,C], [A,B,D], [A,C,D], [B,C,D]
[A,B,C,D]
Худшее время выполнения у алгоритма O(n!), который представляет из себя перестановки – классический пример n-факторной сложности. Чтобы найти все возможные варианты расположения [A, B, C, D] мы начинаем с одной из четырех букв в первой позиции, затем одну из оставшихся трех во второй позиции и так далее. Таким образом, будет 4 × 3 × 2 × 1, или 24 перестановки:

[A,B,C,D], [A,B,D,C], [A,C,B,D], [A,C,D,B], [A,D,B,C], [A,D,C,B]
[B,A,C,D], [B,A,D,C], [B,C,A,D], [B,C,D,A], [B,D,C,A], [B,D,A,C]
[C,A,B,D], [C,A,D,B], [C,B,A,D], [C,B,D,A], [C,D,B,A], [C,D,A,B]
[D,A,B,C], [D,A,C,B], [D,B,A,C], [D,B,C,A], [D,C,A,B], [D,C,B,A]
Время выполнения этих задач быстро увеличивается. Массив из 10 элементов имеет 1024 подмножества и 3 628 800 перестановок. Массив из 20 элементов имеет 1 048 576 подмножеств и 2 432 902 008 176 640 000 перестановок.

Если ваша задача состоит в том, чтобы найти все подмножества или перестановки введенного массива, сложно избежать времени выполнения O(2ⁿ) или O(n!). Однако, если вы выполняете эту операцию более одного раза, есть несколько архитектурных трюков, которые можно использовать для уменьшения нагрузки.

## Типы данных
Перейдем к фундаментальным типам данных. Если структура данных – это набор данных, возникает вопрос: какие типы данных должны быть в наших структурах? Есть несколько типов данных, универсальных для всех языков программирования:

Целые числа (Integers), такие как 1, -5 и 256.
В других языках программирования (кроме Python) вы можете определить тип целого числа. Например, знаковое (+/-) или беззнаковое (только +), а также количество бит, которое может содержать целое число.

Числа с плавающей запятой (Float) – это числа с десятичными знаками. Например, 1.2, 0.14.
В Python к ним относятся числа, определенные с помощью научной нотации, такие как 1e5. В более низкоуровневых языках, например, C или Java, есть родственный тип double. Он обозначает дополнительную точность после запятой.

Заголовки (Chars) – это буквы a, b, c. Их набор – это строка, которая технически является массивом chars. Строковые представления чисел и символов, таких как 5 или ?, тоже являются символами.
Void – ноль, как None в Python. Указывает на отсутствие данных. Это помогает при инициализации массива, который будет заполняться. Например, функция, которая выполняет действие, но ничего не возвращает. Такая, как отправка электронного письма.

![image](https://github.com/wmcheck/Notes/assets/2428660/d82a8c4d-0f6e-40c5-82fd-f93ebb412046)


## Другая статья

Примечание. Сокращенный перевод, скорее пересказ своими словами.
UPD: как отметили в комментариях, примеры не идеальны. Автор не ищет лучшее решение задачи, его цель объяснить сложность алгоритмов «на пальцах».

Big O нотация нужна для описания сложности алгоритмов. Для этого используется понятие времени. Тема для многих пугающая, программисты избегающие разговоров о «времени порядка N» обычное дело.

Если вы способны оценить код в терминах Big O, скорее всего вас считают «умным парнем». И скорее всего вы пройдете ваше следующее собеседование. Вас не остановит вопрос можно ли уменьшить сложность какого-нибудь куска кода до n log n против n^2.

Структуры данных

Выбор структуры данных зависит от конкретной задачи: от вида данных и алгоритма их обработки. Разнообразные структуры данных (в .NET или Java или Elixir) создавались под определенные типы алгоритмов.

Часто, выбирая ту или иную структуру, мы просто копируем общепринятое решение. В большинстве случаев этого достаточно. Но на самом деле, не разобравшись в сложности алгоритмов, мы не можем сделать осознанный выбор. К теме структур данных можно переходить только после сложности алгоритмов.

Здесь мы будем использовать только массивы чисел (прямо как на собеседовании). Примеры на JavaScript.

Начнем с самого простого: O(1)

Возьмем массив из 5 чисел:

const nums = [1,2,3,4,5];

Допустим надо получить первый элемент. Используем для это индекс:

const nums = [1,2,3,4,5];
const firstNumber = nums[0];

Насколько это сложный алгоритм? Можно сказать: «совсем не сложный — просто берем первый элемент массива». Это верно, но корректнее описывать сложность через количество операций, выполняемых для достижения результата, в зависимости от ввода (операций на ввод).

Другими словами: насколько возрастет кол-во операций при увеличении кол-ва входных параметров.

В нашем примере входных параметров 5, потому что в массиве 5 элементов. Для получения результата нужно выполнить одну операцию (взять элемент по индексу). Сколько операций потребуется если элементов массива будет 100? Или 1000? Или 100 000? Все равно нужна только одна операция.

Т.е.: «одна операция для всех возможных входных данных» — O(1).

O(1) можно прочитать как «сложность порядка 1» (order 1), или «алгоритм выполняется за постоянное/константное время» (constant time).

Вы уже догадались что O(1) алгоритмы самые эффективные.

Итерации и «время порядка n»: O(n)

Теперь давайте найдем сумму элементов массива:

const nums = [1,2,3,4,5];
let sum = 0;
for(let num of nums){
	sum += num;
}

Опять зададимся вопросом: сколько операций на ввод нам потребуется? Здесь нужно перебрать все элементы, т.е. операция на каждый элемент. Чем больше массив, тем больше операций.

Используя Big O нотацию: O(n), или «сложность порядка n (order n)». Так же такой тип алгоритмов называют «линейными» или что алгоритм «линейно масштабируется».

Анализ

Можем ли мы сделать суммирование более эффективным? В общем случае нет. А если мы знаем, что массив гарантированно начинается с 1, отсортирован и не имеет пропусков? Тогда можно применить формулу S = n(n+1)/2 (где n последний элемент массива):

const sumContiguousArray = function(ary){
	//get the last item
	const lastItem = ary[ary.length - 1];
	//Gauss's trick
	return lastItem * (lastItem + 1) / 2;
}
const nums = [1,2,3,4,5];
const sumOfArray = sumContiguousArray(nums);

Такой алгоритм гораздо эффективнее O(n), более того он выполняется за «постоянное/константное время», т.е. это O(1).

Фактически операций не одна: нужно получить длину массива, получить последний элемент, выполнить умножение и деление. Разве это не O(3) или что-нибудь такое? В Big O нотации фактическое кол-во шагов не важно, важно что алгоритм выполняется за константное время.

Алгоритмы с константным временем это всегда O(1). Тоже и с линейными алгоритмами, фактически операций может быть O(n+5), в Big O нотации это O(n).

Не самые лучшие решения: O(n^2)

Давайте напишем функцию которая проверяет массив на наличие дублей. Решение с вложенным циклом:

const hasDuplicates = function (num) {
    //loop the list, our O(n) op
    for (let i = 0; i < nums.length; i++) {
        const thisNum = nums[i];
        //loop the list again, the O(n^2) op
        for (let j = 0; j < nums.length; j++) {
            //make sure we're not checking same number
            if (j !== i) {
                const otherNum = nums[j];
                //if there's an equal value, return
                if (otherNum === thisNum) return true;
            }
        }
    }
    //if we're here, no dups
    return false;
}
const nums = [1, 2, 3, 4, 5, 5];
hasDuplicates(nums);//true

Мы уже знаем что итерирование массива это O(n). У нас есть вложенный цикл, для каждого элемента мы еще раз итерируем — т.е. O(n^2) или «сложность порядка n квадрат».

Алгоритмы с вложенными циклами по той же коллекции всегда O(n^2).

«Сложность порядка log n»: O(log n)

В примере выше, вложенный цикл, сам по себе (если не учитывать что он вложенный) имеет сложность O(n), т.к. это перебор элементов массива. Этот цикл заканчивается как только будет найден нужный элемент, т.е. фактически не обязательно будут перебраны все элементы. Но в Big O нотации всегда рассматривается худший вариант — искомый элемент может быть самым последним.

Здесь вложенный цикл используется для поиска заданного элемента в массиве. Поиск элемента в массиве, при определенных условиях, можно оптимизировать — сделать лучше чем линейная O(n).

Пускай массив будет отсортирован. Тогда мы сможем использовать алгоритм «бинарный поиск»: делим массив на две половины, отбрасываем не нужную, оставшуюся опять делим на две части и так пока не найдем нужное значение. Такой тип алгоритмов называется «разделяй и влавствуй» Divide and Conquer.

![image](https://github.com/wmcheck/Notes/assets/2428660/15b835a4-6397-4fdb-a8a9-f1044f2bf6f6)
Этот алгоритм основан на логарифме.

Быстрый обзор логарифмов

Рассмотрим пример, чему будет равен x?

x^3 = 8

Нужно взять кубический корень от 8 — это будет 2. Теперь посложнее

2^x = 512

С использованием логарифма задачу можно записать так

log2(512) = x

«логарифм по основанию 2 от 512 равен x». Обратите внимание «основание 2», т.е. мы мыслим двойками — сколько раз нужно перемножить 2 что бы получить 512.

В алгоритме «бинарный поиск» на каждом шаге мы делим массив на две части.

Мое дополнение. Т.е. в худшем случае делаем столько операций, сколько раз можем разделить массив на две части. Например, сколько раз мы можем разделить на две части массив из 4 элементов? 2 раза. А массив из 8 элементов? 3 раза. Т.е. кол-во делений/операций = log2(n) (где n кол-во элементов массива).

Получается, что зависимость кол-ва операций от кол-ва элементов ввода описывается как log2(n)


Таким образом, используя нотацию Big O, алгоритм «бинарный поиск» имеет сложность O(log n).

Улучшим O(n^2) до O(n log n)

Вернемся к задачке проверки массива на дубли. Мы перебирали все элементы массива и для каждого элемента еще раз делали перебор. Делали O(n) внутри O(n), т.е. O(n*n) или O(n^2).

Мы можем заменить вложенный цикл на бинарный поиск*. Т.е. у нас остается перебор всех элементов O(n), внутри делаем O(log n). Получается O(n * log n), или O(n log n).

const nums = [1, 2, 3, 4, 5];
const searchFor = function (items, num) {
    //use binary search!
    //if found, return the number. Otherwise...
    //return null. We'll do this in a later chapter.
}
const hasDuplicates = function (nums) {
    for (let num of nums) {
        //let's go through the list again and have a look
        //at all the other numbers so we can compare
        if (searchFor(nums, num)) {
            return true;
        }
    }
    //only arrive here if there are no dups
    return false;
}


* ВНИМАНИЕ, во избежание Импринтинга. Использовать бинарный поиск для проверки массива на дубли — плохое решение. Здесь лишь показывается как в терминах Big O оценить сложность алгоритма показанного в листинге кода выше. Хороший алгоритм или плохой — для данной заметки не важно, важна наглядность.

Мышление в терминах Big O

Получение элемента коллекции это O(1). Будь то получение по индексу в массиве, или по ключу в словаре в нотации Big O это будет O(1)
Перебор коллекции это O(n)
Вложенные циклы по той же коллекции это O(n^2)
Разделяй и властвуй (Divide and Conquer) всегда O(log n)
Итерации которые используют Divide and Conquer это O(n log n)

