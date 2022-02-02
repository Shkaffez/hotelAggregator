2.1 API Модуля "Гостиницы"
Если пользователь не аутентифицирован или его роль client, то при поиске всегда должен использоваться флаг isEnabled: true.

Поменял в SearchRoomsParams title: string на _id: ObjectId. Уточнить у препода, можно ли так, есть ли 
у них несостыковка.

Поменял в search(params: Pick<Hotel, "title">): Promise<Hotel[]> Pick<Hotel, "title"> на SearchHotelsParams


Спросить на счет загрузки файлов в монго дб