import React, { useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { menuData } from '@src/utils/common';
import Colors from '@src/styles/Colors';
import Navigation from '@src/navigation/navigation';
import { useNetworkStatus } from '@src/utils/useNetworkStatus';
import { Screens } from '@src/navigation/const';

const MainScreen = (): React.JSX.Element => {
    const isConnected = useNetworkStatus();

    useEffect(() => {
        if (!isConnected) {
            Navigation.navigate(Screens.NOT_INTERNET); // Переход на экран "Нет интернета"
        } else {
            Navigation.navigate(Screens.MAIN_SCREEN);
        }
    }, [isConnected]);

    const handleNavigate = (screen: string) => {
        Navigation.navigate(screen);
    };

    const renderItem = ({ item }: { item: (typeof menuData)[0] }) => (
        <TouchableOpacity
            onPress={() => handleNavigate(item.route)}
            activeOpacity={0.7}
            style={styles.itemContainer}
        >
            <Text style={styles.title}>{item.title}</Text>
            <View
                style={{
                    backgroundColor: Colors.button.second,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                }}
            >
                <Image source={item.icon} style={styles.icon} />
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 0.9,
                    backgroundColor: Colors.purpleBackground,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    paddingTop: 60,
                    width: '100%',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                }}
            >
                <Text
                    style={{
                        marginBottom: 20,
                        color: Colors.white,
                        fontSize: 24,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: '700',
                    }}
                >
                    Menu
                </Text>
                <Image
                    source={require('@src/assets/img-main/logo/logo.png')}
                    resizeMode="cover"
                />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={menuData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purpleBlack,
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingVertical: 4,
        paddingRight: 4,
        marginVertical: 8,
        backgroundColor: Colors.purpleBlack,
        borderRadius: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.white,
    },
    icon: {
        resizeMode: 'cover',
    },
});
export default MainScreen;
