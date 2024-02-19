1.	Описание проекта:

С помощью Django и Django Rest Framework разработать функционирующий API для блогов. Функционал включает в себя авторизацию, публикацию/редактирование/удаление постов с изображениями, просмотр постов других пользователей, отображение последних постов и пагинацию. 

2. Функционал:
 
Платформа позволяет пользователям создавать свои блоги, публиковать посты с изображениями, просматривать и комментировать посты других пользователей. Платформа будет поддерживать регистрацию и аутентификацию пользователей, пагинацию постов, CRUD операции для управления постами, загрузку изображений в бакет(?) и отображение ленты последних постов от всех пользователей.

3. Инструменты реализации:
	- Среда разработки PyCharm
	- Django 5.0.1
	- Django Rest Framework
	- Инструмент Djoser для авторизации по токену
	- Библиотека Pillow для работы с изображениями, Pytest для написания тестов
	- Сервис для хранения изображений AWS S3

4. План работы:

    4.0 Поиск готовых решений

        - Изучение основных ресурсов информации, которые могут быть связаны с реализацией похожих проектов (GitHub, StackOverflow, YouTube)
        - В случае успешного нахождения идентичного проекта - заимствование кода и дальнейшая его доработка, согласно необходимым требованиям
        - В случае отсутствия схожих проектов - реализация проекта согласно приведенному ниже плану

	4.1 Подготовка к работе над проектом

		- Создание виртуальной среды
		- Установка Django и Django Rest Framework 
		- Установка всех дополнительных необходимых инструментов
		- Создание Django-проекта и Django-приложения
	
    4.2 Первоначальная настройка проекта

		- Настройка корректной работы DRF внутри Django
		- Подключение базы данных PostgreSQL	
	4.3 Работа с моделями 

        - Создание необходимых моделей для описания Пользователя (User), поста (Post) и изображений (Image)
        - Связь моделей между собой (связать каждое изображение с постом, а каждый пост с пользователем)
    4.4 Работа c постами

        - Создание сериализаторов для операций над постами
        - Cвязь сериализаторов с представлениями 
        - Создание API для представления ВСЕХ(?) постов от всех пользователей
        - Реализация сортировки постов по дате публикации (от новых к старым)	
    4.5 Настройка авторизации

        - с помощью Djoser настроить авторизацию пользователя по токену
        - настройка JWT авторизации
    4.6 Работа с изображениями

        - Изучение документации и понимание, что из себя представляет AWS S3
		- Интегрирование библиотеки AWS S3 
		- Реализация API для загрузки изображений пользователем (С сайта или НА сайт)(?)
	4.7 Создание документации для потомков и написание тестов

		- Создание документации/описания для каждого(?) класса и метода
       - Написание тестов для проверки работоспособности основных моментов проекта(?)

    