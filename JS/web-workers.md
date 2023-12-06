# Что такое Web Workers ?

Web Workers — предоставляют простое средство для запуска скриптов в фоновом потоке. Поток Worker'а может выполнять задачи без вмешательства в пользовательский интерфейс.

Имеет доступ к Navigator, XMLHttpRequest, Array, Date, Math, String, setTimeout(), setInterval().

Имеет следующие ограничения: отсутсвие доступа к DOM, вместо window — глобальный объект self, отсутствует доступ к cookies/localStorage/sessionStorage, также недоступны часть браузерных API, например доступ к камере/микрофону. Также у них есть ограничения по ресурсам от самого браузера.

Также Web Workers имеют свой собственный event loop, но он функционирует немного по‑другому, в отличии от главного потока.

В Web Workers существует единственный поток выполнения, который используется для обработки всех задач, включая события, сообщения и выполнение кода — WorkerGlobalScope. Он работает в асинхронном режиме и выполняет код в ответ на сообщения и события.

> Если чуть проще, то Web Workers — это скрипт, который мы можем запустить параллельно с основным потоком и выполнять какие‑то операции не блокирующие основной поток и соответсвенно не мешающие взаимодействию пользователя с нашей страницей.

**Dedicated Worker** — worker, который создает отдельный и изолированный контекст выполнения, работающий параллельно с основным потоком в приложении. В основном используется для выполнения вычислений, обработки данных и задач, которые требуют много времени, не блокирующих основной поток.

**Shared Worker** — worker, который создает общий контекст выполнения, доступный для нескольких окон, вкладок или фреймов приложения. В основном используется для выполнения кода в фоновом режиме и обеспечивает общий доступ к данным и состоянию между разными частями приложения, что делает его особенно полезным в сценариях, где несколько пользователей или компонентов должны совместно использовать данные и взаимодействовать друг с другом.

## Как работать с Dedicated Workers ?

Все взаимодействие происходит с помощью функции postMessage() и listener onmessage. Общий workflow выглядит следующим образом:

- Инициализируем Dedicated Worker с помощью конструктора
- Делаем postMessage из Main Thread
- Срабатывает listener в Worker Thread
- Worker выполняет логику, которую вы написали
- Worker с помощью postMessage отправляет событие обратно в Main Thread
- Срабатываем listener в Main Thread

![Схема работы Main Thread -> Worker](https://github.com/wmcheck/Notes/assets/2428660/d1d6f665-8cee-4c0e-9906-571cd44b3f84)

> Можно создавать сколько угодно потоков (при этом, каждый из них будет иметь разный контекст), главное чтобы хватило ресурсов ПК и не натолкнулись в ограничения браузера.

Инициализация инстанса Worker'a, прокидываем в конструктор путь до файла Worker.
```javascript
// new Worker('Путь до worker файла, относительно текущего файла')
const worker = new Worker('worker.js');
```

### Основные функции для обмена данными между потоками:

Метод для отправки сообщения из одного потока в другой

**postMessage(message: any, transfer: Transferable[]): void** 

- message — любое значение или объект, который может быть обработан алгоритмом структурного клонирования, если коротко, то этот алгоритм продвинутее чем JSON сериализатор, например он может клонировать — Blob, File, ImageData, Buffers, может восстанавливать циклические ссылки, но не умеет в клонирование свойств и прототипов и не работает с Error, Function, DOM Elements.
- transfer — массив объектов(объекты могут быть только ArrayBuffer | MessagePort | ImageBitmap), которые перенесутся в контекст worker и больше не будут доступны в изначальном потоке, это может помочь при копировании большого объема данных, чтобы не потерять в производительности и памяти.

```javascript
// Тут мы передаем buffer в контекст worker, в этом скрипте он больше не будет доступен 
const buffer = new ArrayBuffer(42);
const data = { text: 'Hello, World!', buffer };
worker.postMessage(data, [buffer]);  
```

Слушатель отправки message

**onmessage: ((this: Worker, event: MessageEvent) => any) | null**

- event — объект события полученный от worker/main thread
 
```javascript
interface MessageEvent<T = any> extends Event {
    // Переданные данные
    readonly data: T;
    // Последний идентификатор события (event ID) в случае событий, связанных с сервером
    readonly lastEventId: string;
    // Origin сообщения, используется, при работе с событиями связанными cross-document messaging, и позволяет определить источник отправителя сообщения.
    readonly origin: string;
    // Порты, по сути, открытые нами страницы, используются для обмена данными и сообщениями между веб-воркерами и основными потоками.
    readonly ports: ReadonlyArray<MessagePort>;
    // Предоставляет информацию об отправителе сообщения, такую как, например, какое окно отправило событие
    readonly source: MessageEventSource | null;
}
```
  
### Пример использования

Использования Dedicated Worker, на примере работы с изображением (пример максимально абстрактный, без конкретных реализаций, но демонстрирует некоторые возможности).

Допустим необходимо сжать картинку, если она больше определенного размера, и при этом не блокировать основной поток.

В основном потоке хэндлим событие выбора юзером файла изображения, отправляем его в Worker, и когда приходит обработанное изображение из Worker, добавляем эту картинку на страницу.

***app.js***
```javascript
const imageProcessingWorker = new Worker('worker.js');

const imageSelect = document.getElementById('image-select');

imageSelect.addEventListener('change', function(event) {
  const selectedImage = event.target.files[0];
  imageProcessingWorker.postMessage(selectedImage);
});

imageProcessingWorker.onmessage = function(event) {
  const processedImage = event.data;
  const imageContainer = document.getElementById('image-container');
  imageContainer.appendChild(processedImage);
};
```

***worker.js***
```javascript
self.onmessage = function(event) {
  const image = event.data;
  // Функция, которая производит какие-то преобразования с картинкой, например сжатие
  const processedImage = processImage(image)
  
  self.postMessage(processedImage);
};
```

### Убийство Dedicated Worker

Когда Dedicated Worker вам больше не нужен, его можно убить с помощью 
```javascript
worker.terminate()
```

Dedicated Worker сам уничтожится, когда вы закроете вкладку с ним.

### Применение

- Обработка видео/аудио/картинок - ресайз, наложение фильтров и кодирование/декодирование медиаданных и тд.
- Загрузка, обработка и сохранение больших файлов.
- 3D-графика и различные анимации.
- Маппинг больших данных, например списков/различные сортировки и тд.

## Как работать с Shared Workers ?

**Shared Worker** работает похожим образом с Dedicated Worker, однако тут все взаимодействие проходит через port: MessagePort, и соответсвенно из‑за этого у нас появляется listener onconnect в файле Worker'a. 
Общий workflow выглядит следующим образом:

- Инициализируем Shared Worker с помощью конструктора в наших файлах(в этом примере их 2)
- Получаем port нашего Shared Worker'a
- Делаем port.postMessage() из Main Threads
- Устанавливаем connect с Main Threads из Worker Thread, с помощью onconnect
- Получаем port из event'a, который прилетел нам на подключении, я пока рассматриваю случай, когда у меня 1 порт — const port = event.ports[0];, если у вас будет больше, выбирайте соответсвующий(порты создаются следующим образом — тык)
- Worker с помощью port.postMessage отправляет событие обратно в Main Thread's всем портам, на которых висит port.onmessage
- Срабатывает listeners в Main Thread's

  ![Схема работы Shared Worker с двумя страницами index1.html и index2.html](https://github.com/wmcheck/Notes/assets/2428660/a8ef49a7-c719-4406-adac-ef324f7ad55b)

> Можем создавать сколько угодно потоков (при этом если мы создаем их из одного файла Worker'a, они будут иметь одинаковый контекст), главное чтобы хватило ресурсов ПК и мы не уперлись в ограничения браузера.

Инициализация Shared Worker
```javascript
// new Worker('Путь до worker файла, относительно текущего файла')
const worker = new SharedWorker('worker.js');
// тут у нас в worker есть объект port он используется для управления Shared Worker
```
SharedWorker имеет такие же сигнатуры функции для postMessage и listener onmessage, а также onconnect имеет такую же сигантуру как onmessage

```javascript
postMessage(message: any, transfer: Transferable[]): void
onmessage: ((this: Worker, event: MessageEvent) => any) | null
onconnect: ((this: Worker, event: MessageEvent) => any) | null
```

### Пример использования

Сделаем формочку, где можно будет вбить сообщение и оно появится на странице, и с помощью нашего Worker'a отобразим его сразу на двух страницах(index1.html, index2.html). Откройте обе странички, чтобы заценить.

Инициализируем наших Shared Worker's в index1.html, index2.html, где

index1.html
1. Инициализируем Shared Worker, берем его port
2. При клике на кнопку Send отправляем в Shared Worker message, с помощью port.postMessage()
3. Создаем handleronmessage, в нем добавляем новую строку в наш контейнер с сообщениями

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Shared Worker 1</title>
  </head>
  <body>
    <div class="message-container"></div>
    <input type="text" class="message-input" />
    <button class="send-message-button">Send</button>
    <script>
      const messageContainer = document.querySelector('.message-container');
      const messageInput = document.querySelector('.message-input');
      const sendMessageButton = document.querySelector('.send-message-button');

      const worker = new SharedWorker('worker.js');
      const port = worker.port;

      sendMessageButton.addEventListener('click', () => {
        const message = messageInput.value;
        port.postMessage(message);
        messageInput.value = '';
      });
      
      port.onmessage = (e) => {
        messageContainer.innerHTML += e.data + '<br>';
      };
    </script>
  </body>
</html>
```

index2.html
1. Инициализируем Shared Worker, берем его port
2. Создаем handler onmessage, в нем добавляем новую строку в наш контейнер с сообщениями (тут не делаем нашей формочки, тут будет только список сообщений)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Shared Worker 2</title>
  </head>
  <body>
    <div class="message-container"></div>
    <script>
      const messageContainer = document.querySelector('.message-container');
    
      const worker = new SharedWorker('worker.js');
      const port = worker.port;

      port.onmessage = (e) => {
        messageContainer.innerHTML += e.data + '<br>';
      };
    </script>
  </body>
</html>
```

worker.js
1. Создаем массив, куда сложим все наши порты — ports(эти порты нам нужны, чтобы отправить сообщение сразу во все вкладки/iframe, где используется наш Worker, и отобразить там новое сообщение)
2. Создаем handler onmessage и отправляем сообщение на все наши ports
3. Вуаля, получаем на обеих страницах одинаковые messages

```javascript
const ports = [];

self.onconnect = (event) => {
  // Достаем порт с которого подключились и сохраняем его, чтобы потом отправить ему сообщение
  const port = event.ports[0];
  ports.push(port);

  port.onmessage = (e) => {
    const message = e.data;
    for (const client of ports) {
      client.postMessage(`Message: ${message}`);
    }
  };
};
```

### Убийство Shared Worker

С помощью 
```javascript
worker.close()
```

Когда закрыли все вкладки на которых был использован этот Shared Worker

### Применение

- Все, что связано с обменом данными между вкладками и окнами приложения.
- Управление общими ресурсами.
- Все тоже самое, что и у Dedicated Workers

## Итоги

Shared Workers и Dedicated Workers — мощные инструменты для улучшения производительности приложений. Shared Workers подходят для обмена данными и управления общими ресурсами между разными частями приложения, в то время как Dedicated Workers помогают обеспечить изоляцию кода и ускоряют выполнение вычислений.

### Поддержка браузеров
Dedicated Workers - 97%, все поддерживает, кроме Opera Mini(Даже IE в последних версиях)
Shared Workers - 53%, тут хуже, с десктопными браузерами все нормально, до мобильных еще не добралась технология

Dedicated можно спокойно юзать, Shared в целом тоже можно использовать только на Desktop, особенно если основной пользователь это пользователь именно с Desktop'a

