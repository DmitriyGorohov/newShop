import NavigatorContainerTemplate from '@src/navigation/NavigatorContainerTemplate';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from '@src/store/store';
import { setEnabledApi, setEvents, setPath } from '@src/store/shop/shopSlice';
import { AxiosApi } from '@src/api/axiosApi';
import BootSplash from 'react-native-bootsplash';
import { useNetworkStatus } from '@src/utils/useNetworkStatus';
import Navigation from '@src/navigation/navigation';
import { Screens } from '@src/navigation/const';

const AppWrapper = () => {
    return (
        <GestureHandlerRootView style={styles.rootContainer}>
            <Provider store={store}>
                <App />
            </Provider>
        </GestureHandlerRootView>
    );
};

const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isConnected = useNetworkStatus();

    useEffect(() => {
        if (!isConnected) {
            Navigation.navigate(Screens.NOT_INTERNET); // Переход на экран "Нет интернета"
        }
    }, [isConnected]);

    useEffect(() => {
        (async () => {
            dispatch(setEnabledApi(null));
            dispatch(setEvents([]));
            dispatch(setPath(''));
            const api = new AxiosApi('https://clicsushi.store');
            try {
                const data = await api.getTestData();
                dispatch(setEnabledApi(data.enabled));
                dispatch(setEvents(data.events));
                dispatch(setPath(data.path));
                console.log('Ответ от API:', data);
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setTimeout(async () => {
                    await BootSplash.hide();
                }, 1000)
            }
        })();
    }, [dispatch]);
    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor={'transparent'}
            />
            <Host>
                <NavigatorContainerTemplate />
            </Host>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
});

export default AppWrapper;
