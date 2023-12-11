# Что такое CI/CD?
## Автоматизируйте рабочие процессы разработки программного обеспечения и чаще развертывайте более качественный код. Использование непрерывного и итеративного процесса сборки, тестирования и развертывания помогает избежать ошибок и сбоев кода.

### Объяснение CI/CD
CI/CD подпадает под DevOps (объединение команд разработки и эксплуатации) и сочетает в себе практики непрерывной интеграции и непрерывной доставки. CI/CD автоматизирует большую часть или все ручные вмешательства человека, которые традиционно необходимы для получения нового кода от фиксации в рабочей среде, включая сборку, тестирование (включая интеграционные тесты, модульные тесты и регрессионные тесты) и этапы развертывания, а также инфраструктуру. обеспечение. С помощью конвейера CI/CD команды разработчиков могут вносить изменения в код, который затем автоматически тестируется и отправляется для доставки и развертывания. Правильно используйте CI/CD , и время простоя будет сведено к минимуму, а выпуск кода произойдет быстрее.

CI/CD — неотъемлемая часть DevOps и любой современной практики разработки программного обеспечения. Специально созданная платформа CI/CD позволяет максимально увеличить время разработки за счет повышения производительности организации, повышения эффективности и оптимизации рабочих процессов за счет встроенных средств автоматизации, тестирования и совместной работы. По мере роста приложений функции CI/CD могут помочь снизить сложность разработки . Внедрение других практик DevOps, таких как сдвиг в сторону безопасности и создание более тесных цепочек обратной связи, помогает организациям преодолеть разрозненность разработки, безопасно масштабироваться и получить максимальную отдачу от CI/CD.

CI/CD важен, поскольку помогает группам разработки, безопасности и эксплуатации работать максимально эффективно и результативно. Это сокращает утомительную и трудоемкую ручную работу по разработке и устаревшие процессы утверждения, освобождая команды DevOps для более инновационного подхода к разработке программного обеспечения. Автоматизация делает процессы предсказуемыми и повторяемыми, что снижает вероятность ошибок из-за вмешательства человека. Команды DevOps получают более быструю обратную связь и могут чаще интегрировать небольшие изменения, чтобы снизить риск внесения изменений, нарушающих сборку. Создание непрерывных и итеративных процессов DevOps ускоряет жизненные циклы разработки программного обеспечения, поэтому организации могут предоставлять больше функций, которые нравятся клиентам.

Что такое непрерывная интеграция (CI)
Непрерывная интеграция — это практика ранней и частой интеграции всех ваших изменений кода в основную ветку общего репозитория исходного кода, автоматического тестирования каждого изменения при фиксации или слиянии и автоматического запуска сборки. Благодаря непрерывной интеграции ошибки и проблемы безопасности можно выявлять и устранять гораздо проще и на гораздо более ранних этапах процесса разработки.

Часто объединяя изменения и запуская автоматические процессы тестирования и проверки, вы минимизируете возможность конфликта кода, даже если над одним приложением работают несколько разработчиков. Вторичным преимуществом является то, что вам не придется долго ждать ответов и вы сможете при необходимости исправить ошибки и проблемы безопасности, пока тема еще свежа в вашей памяти.

Обычные процессы проверки кода начинаются со статического анализа кода, который проверяет качество кода. Как только код пройдет статические тесты, автоматизированные процедуры CI упаковывают и компилируют код для дальнейшего автоматического тестирования. Процессы CI должны иметь систему контроля версий, которая отслеживает изменения, чтобы вы знали версию используемого кода.

Что такое непрерывная доставка (CD)?
Непрерывная доставка — это практика разработки программного обеспечения, которая работает в сочетании с CI для автоматизации процесса предоставления инфраструктуры и выпуска приложений.

После того как код протестирован и создан в рамках процесса CI, на заключительных этапах его работу берет на себя компакт-диск, гарантируя, что он упакован всем необходимым для развертывания в любой среде в любое время. Компакт-диск может охватывать все: от подготовки инфраструктуры до развертывания приложения в среде тестирования или производственной среде.

Программное обеспечение на компакт-диске создается таким образом, что его можно развернуть в производство в любое время. Затем вы можете запустить развертывание вручную или перейти к непрерывному развертыванию, при котором развертывания также автоматизированы.

Что такое непрерывное развертывание?
Непрерывное развертывание позволяет организациям автоматически развертывать свои приложения, устраняя необходимость вмешательства человека. При непрерывном развертывании команды DevOps заранее устанавливают критерии для выпуска кода, и когда эти критерии выполняются и проверяются, код развертывается в производственной среде. Это позволяет организациям быть более гибкими и быстрее предоставлять пользователям новые функции.

Хотя вы можете осуществлять непрерывную интеграцию без непрерывной доставки или развертывания, вы не можете реализовать CD без CI. Это потому, что было бы чрезвычайно сложно выполнить развертывание в рабочей среде в любое время, если вы не практикуете основы CI, такие как интеграция кода в общий репозиторий, автоматизация тестирования и сборки и выполнение всего этого небольшими партиями ежедневно.

### Почему GitLab CI/CD?
Непрерывное тестирование — это практика тестирования программного обеспечения, при которой тесты выполняются непрерывно с целью выявления ошибок, как только они появляются в базе кода. В конвейере CI/CD непрерывное тестирование обычно выполняется автоматически, при этом каждое изменение кода запускает серию тестов, чтобы убедиться, что приложение по-прежнему работает должным образом. Это может помочь выявить проблемы на ранних этапах процесса разработки и предотвратить их более сложное и дорогостоящее устранение в дальнейшем. Непрерывное тестирование также может предоставить разработчикам ценную информацию о качестве их кода, помогая им выявлять и устранять потенциальные проблемы до того, как они будут выпущены в производство.

При непрерывном тестировании в конвейере CI/CD выполняются различные типы тестов. Они могут включать в себя:

- Модульное тестирование , которое проверяет, что отдельные единицы кода работают должным образом.
- Интеграционное тестирование , которое проверяет, как различные модули или службы в приложении работают вместе.
- Регрессионное тестирование , которое выполняется после исправления ошибки, чтобы гарантировать, что конкретная ошибка не повторится.

## Основы CI/CD

Существует восемь фундаментальных элементов CI/CD, которые помогают обеспечить максимальную эффективность жизненного цикла разработки. Они охватывают разработку и развертывание. Включите эти основы в свой конвейер, чтобы улучшить рабочий процесс DevOps и доставку программного обеспечения:

1. Единый репозиторий
исходного кода. Управление исходным кодом (SCM), в котором хранятся все необходимые файлы и сценарии для создания сборок, имеет решающее значение. Репозиторий должен содержать все необходимое для сборки. Сюда входит исходный код, структура базы данных, библиотеки, файлы свойств и контроль версий. Он также должен содержать тестовые сценарии и сценарии для сборки приложений.

2. Частая регистрация в основной ветке.
Интегрируйте код в свою магистраль, основную или главную ветку — то есть разработку на основе магистрали — как можно раньше и чаще. Избегайте дочерних ветвей и работайте только с основной веткой. Используйте небольшие фрагменты кода и объединяйте их в ветку как можно чаще. Не объединяйте более одного изменения одновременно.

3. Автоматические сборки.
Сценарии должны включать в себя все необходимое для сборки с помощью одной команды. Сюда входят файлы веб-сервера, сценарии баз данных и прикладное программное обеспечение. Процессы CI должны автоматически упаковывать и компилировать код в пригодное для использования приложение.

4. Самотестирование сборок
CI/CD требует непрерывного тестирования. Сценарии тестирования должны гарантировать, что провал теста приведет к неудачной сборке. Используйте статические сценарии тестирования перед сборкой, чтобы проверить код на целостность, качество и соответствие требованиям безопасности. Разрешить в сборку только код, который проходит статические тесты.

5. Частые итерации.
Множественные фиксации в репозитории приводят к уменьшению количества мест, где можно скрыть конфликты. Делайте небольшие, частые итерации, а не серьезные изменения. Благодаря этому можно легко отменить изменения в случае возникновения проблемы или конфликта.

6. Стабильные среды тестирования.
Код следует тестировать в клонированной версии производственной среды. Вы не можете тестировать новый код в рабочей версии. Создайте клонированную среду, максимально приближенную к реальной среде. Используйте сценарии тщательного тестирования для обнаружения и выявления ошибок, которые не прошли первоначальный процесс тестирования перед сборкой.

7. Максимальная прозрачность
Каждый разработчик должен иметь доступ к последним исполняемым файлам и видеть любые изменения, внесенные в репозиторий. Информация в хранилище должна быть видна всем. Используйте контроль версий для управления передачей обслуживания, чтобы разработчики знали, какая версия является последней. Максимальная наглядность означает, что каждый может отслеживать прогресс и выявлять потенциальные проблемы.

8. Предсказуемое развертывание в любое время
Развертывание должно быть настолько рутинным и с низким уровнем риска, чтобы команде было удобно выполнять его в любое время. Процессы тестирования и проверки CI/CD должны быть строгими и надежными, чтобы дать команде уверенность в возможности развертывания обновлений в любое время. Частые развертывания, включающие ограниченные изменения, также представляют меньшие риски и могут быть легко отменены.

## Преимущества внедрения CI/CD

Компании и организации, внедряющие CI/CD, обычно замечают множество положительных изменений. Вот некоторые преимущества, на которые вы можете рассчитывать при внедрении CI/CD:

Более счастливые пользователи и клиенты: меньшее количество ошибок и ошибок попадает в рабочую среду, поэтому ваши пользователи и клиенты получают больше удовольствия. Это приводит к повышению уровня удовлетворенности клиентов, повышению их доверия и улучшению репутации вашей организации.

Ускоренная окупаемость: возможность развертывания в любое время позволяет быстрее выводить продукты и новые функции на рынок. Ваши затраты на разработку ниже, а более быстрый результат освобождает вашу команду для другой работы. Клиенты получают результаты быстрее, что дает вашей компании конкурентное преимущество.

Меньше тушения пожаров: тестирование кода чаще, меньшими партиями и на более ранних этапах цикла разработки может серьезно сократить количество противопожарных учений. Это приводит к более плавному циклу разработки и снижению стресса в команде. Результаты более предсказуемы, легче находить и исправлять ошибки.

Более надежное соблюдение сроков. Устранение узких мест при развертывании и обеспечение предсказуемости развертывания может устранить значительную часть неопределенности, связанной с соблюдением ключевых сроков. Разбивка работы на более мелкие и управляемые части означает, что вам будет легче завершить каждый этап вовремя и отслеживать прогресс. Такой подход дает достаточно времени для мониторинга общего прогресса и более точного определения сроков завершения.

Освободите время разработчиков. Благодаря большей автоматизации процесса развертывания у команды появляется время для более полезных проектов. По оценкам, разработчики тратят от 35% до 50% своего времени на тестирование, проверку и отладку кода. Автоматизируя эти процессы, разработчики значительно повышают свою производительность.

Меньше переключения контекста. Получение отзывов о коде в режиме реального времени облегчает разработчикам работу над одной задачей за раз и минимизирует их когнитивную нагрузку . Работая с небольшими участками кода, которые автоматически тестируются, разработчики могут быстро отлаживать код, пока их мысли еще не закончены. Находить ошибки проще, поскольку требуется меньше кода для проверки.

Уменьшите выгорание: исследования показывают , что компакт-диски заметно уменьшают трудности при развертывании и выгорание команды. Разработчики испытывают меньше разочарований и напряжения при работе с процессами CI/CD. Это приводит к тому, что сотрудники становятся более счастливыми и здоровыми и меньше выгорают.

Ускоренное восстановление: CI/CD упрощает устранение проблем и восстановление после инцидентов, сокращая среднее время разрешения (MTTR). Практика непрерывного развертывания подразумевает частые небольшие обновления программного обеспечения, поэтому при появлении ошибок их легче обнаружить. Разработчики имеют возможность быстро исправлять ошибки или откатывать изменения, чтобы клиент мог быстро вернуться к работе.

## Почему GitLab CI/CD?

Чтобы реализовать все необходимые основы полной CI/CD, многие платформы CI полагаются на интеграцию с другими инструментами для удовлетворения этих потребностей. Многим организациям приходится поддерживать дорогостоящие и сложные цепочки инструментов, чтобы иметь полные возможности CI/CD. Это часто означает поддержку отдельного SCM, такого как Bitbucket или GitHub, и подключение к отдельному инструменту тестирования, который подключается к их инструменту CI, который подключается к инструменту развертывания, такому как Chef или Puppet, который также подключается к различным инструментам безопасности и мониторинга.

Вместо того, чтобы просто сосредоточиться на создании отличного программного обеспечения, организациям приходится также поддерживать и управлять сложной цепочкой инструментов. GitLab — это единое приложение для всего жизненного цикла DevSecOps. Это означает, что мы реализуем все основы CI/CD в одной среде.