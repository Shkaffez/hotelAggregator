
2.1 API Модуля "Гостиницы"      Done

2.1.1 Поиск номеров
GET /api/common/hotel-rooms 	work
2.1.2 Информация о конкретном номере
GET /api/common/hotel-rooms/:id	work
2.1.3 Добавление гостиниц
POST /api/admin/hotels/	        work
2.1.4 Получение списка гостиниц
GET /api/admin/hotels/      	work
2.1.5 Изменение описания гостиницы
PUT /api/admin/hotels/:id	    work
2.1.6 Добавление номера
POST /api/admin/hotel-rooms/	work
2.1.7 Изменение описания номера
PUT /api/admin/hotel-rooms/:id	work

2.3 API Модуля "Аутентификация и авторизация"
Переделать с jwt на сессии и куки

2.3.1 Вход
POST /api/auth/login	        work
2.3.2 Выход
POST /api/auth/logout	    not done
2.3.3 Регистрация
POST /api/client/register   	work

2.4 API Модуля "Управление пользователями"

2.4.1 Создание пользователя
POST /api/admin/users/	        work
2.4.2 Получение списка пользователей
GET /api/admin/users/	        work
GET /api/manager/users/	        work








