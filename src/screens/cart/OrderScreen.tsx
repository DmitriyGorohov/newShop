import React, { useCallback } from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Navigation from '@src/navigation/navigation';
import Colors from '@src/styles/Colors';
import { useDispatch } from 'react-redux';
import { resetProductToBasket } from '@src/store/shop/shopSlice';
import { useFocusEffect } from '@react-navigation/native';

const OrderScreen = (): React.JSX.Element => {
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            return () => {
                dispatch(resetProductToBasket());
            };
        }, [dispatch])
    );

    return (
        <SafeAreaView
            style={[
                styles.container,
                { paddingTop: Platform.OS === 'ios' ? 0 : 60 },
            ]}
        >
            <View
                style={{
                    paddingHorizontal: 16,
                    paddingVertical: 30,
                    backgroundColor: Colors.purpleBackground,
                    borderRadius: 20,
                    marginHorizontal: 6,
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        marginBottom: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => Navigation.pop()}
                        activeOpacity={0.9}
                        style={{
                            width: 65,
                            height: 65,
                            borderRadius: 65 / 2,
                            backgroundColor: Colors.button.second,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 12,
                        }}
                    >
                        <Image
                            resizeMode={'cover'}
                            source={require('@src/assets/img-main/arrow-back/basil_arrow-up-solid.png')}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: Colors.white,
                            fontSize: 35,
                            fontWeight: '800',
                        }}
                    >
                        Basket
                    </Text>
                </View>
                <Image
                    source={require('@src/assets/img-main/busket-success/material-symbols_done-rounded.png')}
                    resizeMode="cover"
                    style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: 32,
                    }}
                />
                <Text
                    style={{
                        color: Colors.white,
                        fontSize: 24,
                        paddingHorizontal: 40,
                        textAlign: 'center',
                    }}
                >
                    Your order has been successfully placed
                </Text>
            </View>
            <Image
                source={require('@src/assets/img-main/qr-code-success/qr-code-success.png')}
                resizeMode={'cover'}
                style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 32,
                }}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purpleBlack,
    },
});
export default OrderScreen;
