import { Screens } from '@src/navigation/const';

type MenuItem = {
    id: string; // Уникальный идентификатор
    title: string; // Заголовок
    icon: ReturnType<typeof require>; // Иконка с использованием require()
    route: string; // Путь для навигации
};

export const menuData: MenuItem[] = [
    {
        id: '1',
        title: 'Shop',
        icon: require('@src/assets/img-main/arrow-right/arrow-right.png'),
        route: Screens.SHOP,
    },
    {
        id: '2',
        title: 'Reservation',
        icon: require('@src/assets/img-main/arrow-right/arrow-right.png'),
        route: Screens.RESERVATION,
    },
    {
        id: '3',
        title: 'Contacts',
        icon: require('@src/assets/img-main/arrow-right/arrow-right.png'),
        route: Screens.CONTACTS,
    },
    {
        id: '4',
        title: 'Events',
        icon: require('@src/assets/img-main/arrow-right/arrow-right.png'),
        route: Screens.EVENTS,
    },
    {
        id: '5',
        title: 'Bonuses',
        icon: require('@src/assets/img-main/arrow-right/arrow-right.png'),
        route: Screens.BONUSES,
    },
];

export type Product = {
    id: number;
    title: string;
    image: ReturnType<typeof require>;
    price: number;
    favorites: boolean;
    quantity?: number;
};

export const breakfasts: Product[] = [
    {
        id: 1,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/b-1/b-1.png'),
        price: 29,
        favorites: false,
    },
    {
        id: 2,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/b-2/b-2.png'),
        price: 19,
        favorites: false,
    },
    {
        id: 3,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/b-3/b-3.png'),
        price: 23,
        favorites: false,
    },
];

export const lunches: Product[] = [
    {
        id: 4,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/m-1/m-1.png'),
        price: 21,
        favorites: false,
    },
    {
        id: 5,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/m-2/m-2.png'),
        price: 22,
        favorites: false,
    },
    {
        id: 6,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/m-3/m-3.png'),
        price: 19,
        favorites: false,
    },
];

export const dinners: Product[] = [
    {
        id: 7,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/s-1/s-1.png'),
        price: 19,
        favorites: false,
    },
    {
        id: 8,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/s-2/s-2.png'),
        price: 19,
        favorites: false,
    },
    {
        id: 9,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/s-3/s-3.png'),
        price: 19,
        favorites: false,
    },
];

export const app: Product[] = [
    {
        id: 10,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/a-3/a-3.png'),
        price: 19,
        favorites: false,
    },
    {
        id: 11,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/a-2/a-2.png'),
        price: 19,
        favorites: false,
    },
    {
        id: 12,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/a-1/a-1.png'),
        price: 19,
        favorites: false,
    },
];

export const desert: Product[] = [
    {
        id: 13,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/d-1/d-1.png'),
        price: 19,
        favorites: true,
    },
    {
        id: 14,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/d-2/d-2.png'),
        price: 19,
        favorites: false,
    },
    {
        id: 15,
        title: 'Rice porridge with lingonberries',
        image: require('@src/assets/img-main/d-3/d-3.png'),
        price: 19,
        favorites: false,
    },
];

export const allProducts: Product[] = [
    ...breakfasts,
    ...lunches,
    ...dinners,
    ...desert,
    ...app,
];

export type EventType = {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    image: ReturnType<typeof require>;
};

export const events: EventType[] = [
    {
        id: 1,
        title: 'Dinner Under the Stars',
        description:
            'Enjoy the atmosphere of a romantic dinner on the restaurant terrace under the open sky, where a special menu and pleasant live music await you.',
        date: '23rd December 2024',
        time: '6:00 PM – 11:00 PM',
        image: require('@src/assets/img/event-1/event-1.png'),
    },
    {
        id: 2,
        title: 'Gastronomic Masterclass',
        description:
            'Join our chef for an exciting masterclass where you will learn to cook signature dishes and uncover the secrets of culinary art.',
        date: '23rd December 2024',
        time: '6:00 PM – 11:00 PM',
        image: require('@src/assets/img/event-2/event-2.png'),
    },
    {
        id: 3,
        title: 'Wine and Cheese Evening',
        description:
            'Discover the perfect pairing of wines and cheeses at our gastronomic evening, where a sommelier will share insights on the best combinations and conduct a tasting.',
        date: '23rd December 2024',
        time: '6:00 PM – 11:00 PM',
        image: require('@src/assets/img/event-3/event-3.png'),
    },
    {
        id: 4,
        title: 'Theme of the Night: Italian Celebration',
        description:
            'Immerse yourself in the atmosphere of Italy at our themed evening with live music, traditional dishes, and dances that will transport you to the heart of Rome.',
        date: '23rd December 2024',
        time: '6:00 PM – 11:00 PM',
        image: require('@src/assets/img/event-1/event-1.png'),
    },
    {
        id: 5,
        title: 'Theme of the Night: Italian Celebration',
        description:
            'Immerse yourself in the atmosphere of Italy at our themed evening with live music, traditional dishes, and dances that will transport you to the heart of Rome.',
        date: '23rd December 2024',
        time: '6:00 PM – 11:00 PM',
        image: require('@src/assets/img/event-2/event-2.png'),
    },
    {
        id: 6,
        title: 'Theme of the Night: Italian Celebration',
        description:
            'Immerse yourself in the atmosphere of Italy at our themed evening with live music, traditional dishes, and dances that will transport you to the heart of Rome.',
        date: '23rd December 2024',
        time: '6:00 PM – 11:00 PM',
        image: require('@src/assets/img/event-3/event-3.png'),
    },
];
