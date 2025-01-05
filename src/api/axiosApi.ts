import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Типизация ответа от эндпоинта
export interface EventTypeApi {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    image: ReturnType<typeof require>; // Можно уточнить тип как Date, если вы будете парсить дату
}

interface ApiResponse {
    enabled: boolean;
    path: string;
    events: EventTypeApi[];
}

export class AxiosApi {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000, // Таймаут запроса в миллисекундах
        });
    }

    /**
     * Выполняет GET-запрос на эндпоинт `/test`
     * @returns Promise с типизированным ответом ApiResponse
     */
    public async getTestData(): Promise<ApiResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await this.axiosInstance.get('/test');
            return response.data;
        } catch (error) {
            console.error('Ошибка при выполнении GET-запроса:', error);
            throw new Error('Не удалось получить данные с сервера.');
        }
    }
}
