# Service Workers

Плохой интернет, когда нужно загрузить картинку весом как чугунный мост. В эпоху очень быстрого интернета мы стали забывать о том, что в некоторых локациях нашего мира нет хорошей сети (например, когда вы едете в поезде по нашей необъятной стране). Эту проблему довольно хорошо решают Service Workers

## Что такое Service Workers?

- Service Workers - worker, который создает отдельный и изолированный контекст выполнения, работающий параллельно с основным потоком в приложении. С помощью Service Worker'a, можно перехватывать сетевые запросы, эффективно реализовывать кэширование файлов, push-уведомления, фоновую синхронизацию и оффлайн доступность приложения.
- Event Loop Service Workers - полностью асинхронный, поэтому Service Worker не может использовать синхронные API, такие как Local Storage/Session Storage и тд, также Service Worker не имеет доступа к DOM. Service Worker работает только по HTTPS из соображений безопасности.
- N.B. Мы можем запустить только один Service Worker на странице, если вы попытаетесь создать более одного Service Worker'a на странице, то он просто подменит предыдущий.

## Жизненный цикл Service Worker

### Регистрация
На этом этапе мы регистрируем наш Service Worker, с помощью следующего кода:

```JavaScript
// 'service-worker.js' - путь до файла нашего Service Worker'a
navigator.serviceWorker.register('service-worker.js')
```
### Установка
После регистрации Service Worker загружает файл service-worker.js. На этом этапе Service Worker выполняет метод ***oninstall***, где мы можем закэшировать ресурсы.

```JavaScript
// Имя кэша
const CACHE_NAME = 'cache_v1';
// слушаем событие установки
self.addEventListener('install', (event) => {
  // предотвращает завершение события до тех пор, пока не завершится асинхронная операция(используется, чтобы Service Worker не был деактивирован браузером)
  event.waitUntil((async () => {
    // берем объект кэша и добавляем туда наши файлы
    const cache = await caches.open(CACHE_NAME);
    await cache.add('fallback.html');
  })());
});
```
### Ожидание активации
После успешной установки, Service Worker переходит в состояние ожидание активации. Он остается в этом состоянии, пока нет другой версии Service Worker, активированной на сайте.

### Активация
Когда не существует активных Service Workers, текущий Service Worker активируется. В этот момент он выполняет метод onactivate. В этом методе можно выполнять различные операции, например, удаление устаревших кэшированных ресурсов.

```JavaScript
// слушаем событие активации
self.addEventListener('activate', async () => {
  // получаем имена кэшей
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(async (cacheName) => {
    // Удаляем кэши, которые не относятся к текущей версии
    if (cacheName !== CACHE_NAME) {
      await caches.delete(cacheName);
    }
  }));
});
```
### Активное состояние
После успешной активации, Service Worker может перехватывать сетевые запросы с помощью метода ***fetch***, управлять кэшем, отправлять уведомления браузера и выполнять другие задачи.

```JavaScript
// реализация Network-First стратегии кэширования
// слушаем событие fetch
self.addEventListener('fetch', async event => {
  try {
    // пробуем получить запрос из сети
    return await fetch(event.request);
  } catch (error) {
    // если произошла ошибка достаем данные из кэша
    return await caches.match(event.request);
  }
});
```

### Замена
В этой части жизненного цикла рассматривается случай, когда регистрируется новая версия Service Worker (например, при обновлении нашего приложения), новая версия проходит все этапы установки и активации затем новая версия активируется после того, как не будет активных клиентов, использующих предыдущую версию Service Worker. В свою очередь, старая версия Service Worker переходит в режим "ожидание активации" и ожидает деактивации.

### Деактивация и удаление
Деактивация происходит в нескольких случаях:
- Браузер решает, что Service Worker больше не нужен для обслуживания активных клиентов
- Изменения в коде Service Worker или обновление страницы

Удаление происходит в нескольких случаях:
- Автоматическое удаление браузером после деактивации
- Удаление разработчиком
```JavaScript
self.registration.unregister()
```

![Диаграмма жизненного цикла Service Worker](https://github.com/wmcheck/Notes/assets/2428660/0df4ea71-f58a-4ea3-9661-e05e3638cfab)
Подробный разбор темы, статья [Джейка Арчибальда](https://web.dev/articles/service-worker-lifecycle)


## Сценарии использования
Теорию, теперь давайте на практических примерах, посмотрим, что с помощью Service Workers можно делать. Думаю из этих примеров станет понятнее как их применять и зачем. Рассмотрим такие Use Cases, как Кэширование, Кастомный fallback при отсутствие сети и Push Notifications.

N.B. Service Workers можно отслеживать в инструментах разработчика Chrome, Chrome Devtools -> Application -> Service Workers.

### Кэширование
Кэширование - процесс сохранение и хранения ресурсов, таких как HTML, CSS, JS, png, svg, jpeg, шрифты и тд.

С помощью кэширования мы сможем улучшить следующие аспекты:

- Увеличение производительности: Кэшированные ресурсы загружаются гораздо быстрее, чем с сервера, что ускоряет загрузку страниц и улучшает пользовательский опыт.
- Работа в оффлайн-режиме: Когда ресурсы кешированы, приложение может продолжать работу в оффлайне, используя локально сохраненные ресурсы, пока сеть недоступна.

Однако нам придется столкнуться с следующими трудностями:

- Ограниченное количество кэша: Каждый браузер имеет ограниченный размер кэша и нужно следить, чтобы он не переполнялся.
- Слишком много данных в кэше: Каждый файл сохраняется локально у пользователя на его устройстве и занимает память, нужно заботиться о том, чтобы кэш не занимал слишком много памяти.

### Реализаций самые популярных стратегии кэширования:

#### Network-First
![Network-First](https://github.com/wmcheck/Notes/assets/2428660/e1e9a8bd-f918-446b-bb50-202b0aeb6a20)

Network-First - стратегия кэширования, в которой мы сначала пытаемся выполнить запрос к сети, и если он успешен, мы перезаписываем кэш и возвращаем результат. Если запрос неудачен, возвращаем данные из кэша.

Этот подход может подойти для ресурсов, у которых часто обновляются данные, например - блоги, новостные сайты, маркетплейсы, заметки, календари.

```JavaScript
const CACHE_NAME = 'cache_v1';
// Добавляем изначальный кэш
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const imageUrls = [
        '/img/cache1.png',
        '/img/cache2.png',
      ];

      await cache.addAll(imageUrls);
      // активирует Service Worker минуя фазу ожидания активации
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
    // с помощью self.clients.claim() можно начать перехватывать запросы не ожидая перезагрузки страницы, работает в паре с self.skipWaiting()
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        // Пытаемся получить данные с помощью запроса
        const response = await fetch(event.request);

        // Если запрос прошел успешно, обновляем кэш
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone());

        return response;
      } catch (error) {
        // Если запрос упал с ошибкой, находим нужный нам кэш и возвращаем его
        const cachedResponse = await caches.match(event.request);
        // Если закэшированный ресурс есть, то возвращаем его
        if (cachedResponse) {
          return cachedResponse;
        }
        // Если кэша нету, возвращаем страницу fallback.html или какое-то кастомное сообщение об этом, тут уже на ваше усмотрение
        return await cache.match('fallback.html');
      }
    })()
  );
});
```
Также, можно улучшить эту реализацию. Например, если вы хотите быстро получать данные, и актуальность для вас не критична, то можно создать реализацию, в которой по истечении некоторого времени (например, если запрос занимает более секунды), возвращаться к кэшу. Код будет выглядеть абсолютно так же, единственное, что нужно сделать, это написать обертку над fetch с установкой временного ограничения setTimeout().

#### Cache-First
![Cache-First](https://github.com/wmcheck/Notes/assets/2428660/347ed8b1-02e9-4ba9-81f3-1b7178132018)

Cache-First - стратегия кэширования, в которой мы сначала пытаемся найти ресурс в кэше, а если ресурс не найден, делаем запрос к сети и записываем в кэш.

Этот подход может подойти для ресурсов, у которых данные не обновляются часто, или где актуальность данных не столь важна, например, для страниц лэндингов, иконок, изображений в блогах, новостных порталах. Главное, не использовать этот подход на ресурсах, которые всегда должны быть актуальными, поскольку это может существенно навредить пользовательскому опыту (поскольку пользователь может не понять, что это кэшированные данные).

```JavaScript
const CACHE_NAME = 'cache_v1';
// Добавляем изначальный кэш
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const imageUrls = [
        '/img/cache1.png',
        '/img/cache2.png',
      ];

      await cache.addAll(imageUrls);

      // активирует Service Worker минуя фазу ожидания активации
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
    // с помощью self.clients.claim() можно начать перехватывать запросы не ожидая перезагрузки страницы, работает в паре с self.skipWaiting()
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        // Пытаемся найти ресурс в кэше
        const cachedResponse = await caches.match(event.request);

        // Если ресурс есть в кеше, возвращаем его
        if (cachedResponse) {
          return cachedResponse;
        }

        // Если ресурс нет в кеше, получаем его из сети
        const response = await fetch(event.request);

        // Обновляем кэш с полученным ресурсом
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone());

        return response;
      } catch (error) {
        // Если кэша нету, возвращаем страницу fallback.html или какое-то кастомное сообщение об этом, тут уже на ваше усмотрение
        return await cache.match('fallback.html');
      }
    })()
  );
});
```

#### Cache-Only
![Cache-Only](https://github.com/wmcheck/Notes/assets/2428660/dd927052-0c7c-4339-95c0-a011a9cf3992)

Cache-Only - стратегия кэширования, в которой один раз получаются данные из сети, а далее всегда отдаются из кэша.

Довольно специфичная стратегия, её нужно использовать очень аккуратно, однако она может подойти для следующих ситуаций (имхо): если вам совсем не нужно актуализировать данные, например, сайт для чтения книг (загружаешь книгу один раз и читаешь), рекламные лендинги (они довольно редко обновляются и имеют динамические данные).

```JavaScript
const CACHE_NAME = 'cache_v1';
// Добавляем изначальный кэш
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const imageUrls = [
        '/img/cache1.png',
        '/img/cache2.png',
      ];

      await cache.addAll(imageUrls);

      // активирует Service Worker минуя фазу ожидания активации
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
    // с помощью self.clients.claim() можно начать перехватывать запросы не ожидая перезагрузки страницы, работает в паре с self.skipWaiting()
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      // Пытаемся найти ресурс в кэше
      const cachedResponse = await caches.match(event.request);

      // Если ресурс есть в кеше, возвращаем его
      if (cachedResponse) {
        return cachedResponse;
      }
      // Если кэша нет, возвращаем страницу fallback.html или какое-то кастомное сообщение об этом, тут уже на ваше усмотрение
      return await cache.match('fallback.html');
    })()
  );
});
```

#### Кастомный fallback при отсутствие сети
Полезная фишка, если мы хотим кастомизировать страницу отсутствия сети, например, хотим поместить туда какую-то полезную информацию или стандартизировать эту страницу для всех пользователей (в разных браузерах разные страницы для отсутствующей сети). Сделать это можно следующим образом:

```JavaScript
const offlineHTML = `
  <h1>Отсутствует подключение к сети</h1>
  <p>Пожалуйста, проверьте свое подключение к сети.</p>
`;

self.addEventListener('fetch', async event => {
  try {
    return await fetch(event.request);;
  } catch (error) {
    // также здесь можно вернуть закэшированную страницу отсутсвия сети
    return new Response(offlineHTML, { headers: { 'Content-Type': 'text/html' } });
  }
});
```

## Push Notifications
### Что такое Push Notifications
Push Notifications - это сообщения, отправляемые с сервера на устройство пользователя, даже если веб-приложение не активно или закрыто. Они могут содержать текст, звук и другую информацию, они используются для уведомления пользователя о важных событиях, обновлениях и других действиях.

### Как они работают

- Запрашивается разрешение на отправку уведомлений.
```JavaScript
if ('Notification' in window) {
  Notification.requestPermission();
}
```

- Регистрирует устройство пользователя для получения Push-уведомлений.
```JavaScript
if ('serviceWorker' in navigator && 'PushManager' in window) {
  try {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    
    // Регистрируем устройство для получения Push-уведомлений
    const subscription = await serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true });
    
    // отправляем подписку на сервер, тут надо реализовать логику в зависимости от выбранной стратегии на бекенде
    await sendSubscriptionToServer(subscription);
  } catch (error) {
    console.log('Failed to register', error);
  }
}
```
- На сервере настраивается логика для отправки уведомлений на зарегистрированные устройства. Это может быть реализовано с помощью Web Push Protocol или других протоколов.

- Когда сервер отправляет Push-уведомление, оно приходит к Service Worker, который обрабатывает уведомление с помощью push event.
```JavaScript
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    badge: '/badge.png'
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
```

## Поддержка браузеров
Сам Service Worker отлично поддерживается всеми современными браузерами и не поддерживается IE(классика)  

C Push Manager API, которое используется для Push Notifications дела обстоят похуже, но тоже в целом неплохо.

## Итог

Service Workers — мощный инструмент для улучшения пользовательского опыта и производительности приложения. Service Workers могут перехватывать сетевые запросы, позволяя кэшировать ресурсы и обеспечивать работу приложения в оффлайне, что позволяет существенно улучшить пользовательский опыт в условиях слабого соединения или его отсутствия. Также Service Workers поддерживает отправку Push Notifications.
