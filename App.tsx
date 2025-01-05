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

    useEffect(() => {
        (async () => {
            await BootSplash.hide();
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
