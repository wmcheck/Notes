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
