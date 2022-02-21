
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

2.2 API Модуля "Бронирование"   Done

2.2.1 Бронирование номера клиентом
POST /api/client/reservations   

добавить проверку наподобии let reserv = await this.reservationModel.findOne({dateStart:{$gte:data.startDate},dateEnd:{$lte:data.endDate}});

2.2.2 Список броней текущего пользователя
GET /api/client/reservations    work
2.2.3 Отмена бронирования клиентом
DELETE /api/client/reservations/:id work
2.2.4 Список броней конкретного пользователя
GET /api/manager/reservations/:userId   work
2.2.5 Отмена бронирования менеджером
DELETE /api/manager/reservations/:userId/:reservationId     work


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

2.5 API модуля "Чат с техподдрежкой"

2.5.1 Создание обращения в поддержку
POST /api/client/support-requests/  work
2.5.2 Получение списка обращений в поддержку для клиента
GET /api/client/support-requests/   work
2.5.3 Получение списка обращений в поддержку для менеджера
GET /api/manager/support-requests/  work
2.5.4 Получение истории сообщений обращения в техподдержку
GET /api/common/support-requests/:id/messages   work
2.5.5 Отправка сообщения
POST /api/common/support-requests/:id/messages  work
2.5.6 Отправка события, что сообщения прочитаны
POST /api/common/support-requests/:id/messages/read


JWT client = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDM2OGNjNjM0NDAwNGFmZjcyZGQwNyIsImVtYWlsIjoic2hpc2hrb3ZAbWFpbC5ydSIsIm5hbWUiOiJJdmFuIiwiaWF0IjoxNjQ1MjY4NTQ1fQ._v1RnpA2vK6BglwOVAjmnAx4QK8rH_cOeYweldkcOQY

JWT manager = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDM2YjVmNjM0NDAwNGFmZjcyZGQwYSIsImVtYWlsIjoiYWJjZGVAbWFpbC5ydSIsIm5hbWUiOiJBQUEiLCJpYXQiOjE2NDU0NDIxNTR9.9HwzhW-JyxB9lgbGUxd0fPsq6sa5z8K8OVEq9Br26sQ







