<h1 align="center">Holet Aggregator</h1>

## Описание проекта
Это учебное приложение является дипломным проектом к курсу Нетологии backend разработка на Javascript.
Приложение представляет из себя backend сайта агрегатора отелей.

## Стек технологий
<p align="center">
  <img src="https://img.shields.io/badge/-NodeJS-%233c873a">
  <img src="https://img.shields.io/badge/-NestJS-red">
  <img src="https://img.shields.io/badge/-Websocket-blue">
  <img src="https://img.shields.io/badge/-MongoDB-brightgreen">
  <img src="https://img.shields.io/badge/-Docker-0db7ed">
  <img src="https://img.shields.io/badge/-Redis-critical">
</p>

## Проект содержит следующие модули:
### [Модуль "Пользователи"](https://github.com/Shkaffez/hotelAggregator/tree/main/src/modules/users)
Модуль "Пользователи" предназначается для создания, хранения и поиска профилей пользователей.

### [Модуль "Гостиницы"](https://github.com/Shkaffez/hotelAggregator/tree/main/src/modules/hotels)
Модуль "Гостиницы" предназначается для хранения и поиска гостиниц и комнат.

### [Модуль "Брони"](https://github.com/Shkaffez/hotelAggregator/tree/main/src/modules/reservation)
Модуль "Брони" предназначен для хранения и получения броней гостиниц конкретного пользователя.

### [Модуль "Чат техподдержки"](https://github.com/Shkaffez/hotelAggregator/tree/main/src/modules/support)
Модуль "Чат техподдержки" предназначается для хранения обращений в техподдержку и сообщений в чате обращения.

### [Модуль "Аутентификация и авторизация"](https://github.com/Shkaffez/hotelAggregator/tree/main/src/modules/auth)
Авторизация пользователей с использование passport session и их хранением в Redis.

## Запуск проекта
Для запуска проекта нужно выполнить комаду
`docker-compose up`
Для просмотра документации, созданной с помощью Swagger нужно перейти по адресу
http://localhost/swagger

  
