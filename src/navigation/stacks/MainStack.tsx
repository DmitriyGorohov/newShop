import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import { Screens } from '../const';
import MainScreen from '@src/screens/main/MainScreen';
import ShopScreen from '@src/screens/shop/ShopScreen';
import ContactsScreen from '@src/screens/contacts/ContactsScreen';
import EventsScreen from '@src/screens/events/EventsScreen';
import ReservationScreen from '@src/screens/reservation/ReservationScreen';
import BonusesScreen from '@src/screens/bonuses/BonusesScreen';
import CartScreen from '@src/screens/cart/CartScreen';
import ReservationSuccessScreen from '@src/screens/reservation/ReservationSuccessScreen';
import OrderScreen from '@src/screens/cart/OrderScreen';
import EventContentScreen from '@src/screens/events/EventContentScreen';
import ReservationTableScreen from '@src/screens/reservation/ReservationTableScreen';
import FavoriteScreen from '@src/screens/shop/FavoriteScreen';

const Stack = createStackNavigator();

const MainStack = (): React.JSX.Element => {
    return (
        <Stack.Navigator initialRouteName={Screens.MAIN_SCREEN}>
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.MAIN_SCREEN}
                component={MainScreen}
            />
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.SHOP}
                component={ShopScreen}
            />
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.CART_SUCCESS}
                component={OrderScreen}
            />
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.SHOP_FAVORITE}
                component={FavoriteScreen}
            />
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.CONTACTS}
                component={ContactsScreen}
            />
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                   headerShown: false,
                }}
                name={Screens.EVENTS}
                component={EventsScreen}
            />
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.RESERVATION}
                component={ReservationScreen}
            />
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.CART}
                component={CartScreen}
            />
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.BONUSES}
                component={BonusesScreen}
            />
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                   headerShown: false,
                }}
                name={Screens.RESERVATION_SUCCESS}
                component={ReservationSuccessScreen}
            />

            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.RESERVATION_TABLE}
                component={ReservationTableScreen}
            />
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.EVENTS_CONTENT}
                component={EventContentScreen}
            />
        </Stack.Navigator>
    );
};
export default MainStack;
