import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Pressable, Platform, SafeAreaView,
} from 'react-native';
import Colors from '@src/styles/Colors';
import { useSelector } from 'react-redux';
import { shopSelector } from '@src/store/shop/shopSlice';
import Navigation from '@src/navigation/navigation';
import CartList from '@src/components/CartList';
import { Screens } from '@src/navigation/const';

const CartScreen = (): React.JSX.Element => {
    const { totalCount, itemBasket } = useSelector(shopSelector);
    return (
        <SafeAreaView
            style={[
                styles.container,
                // totalCount === 0 && { justifyContent: 'center' },
            ]}
        >
            {itemBasket.length > 0 && (
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 8,
                        width: '100%',
                        marginLeft: Platform.OS === 'ios' ? 0 : 20,
                        position: 'absolute',
                        paddingHorizontal: 20,
                        bottom: 0,
                        zIndex: 999,
                        backgroundColor: Colors.purpleBlack,
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: 12,
                            paddingTop: 12,
                            width: '100%',
                            marginBottom: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 12,
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.white,
                                    fontWeight: 700,
                                }}
                            >
                                Subtotal:{' '}
                            </Text>
                            <Text
                                style={{
                                    color: Colors.white,
                                    fontWeight: 700,
                                }}
                            >
                                $ {totalCount.toFixed(2)}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 12,
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.pink,
                                    fontWeight: 700,
                                }}
                            >
                                Commission:{' '}
                            </Text>
                            <Text
                                style={{
                                    color: Colors.pink,
                                    fontWeight: 700,
                                }}
                            >
                                $ 0
                            </Text>
                        </View>
                    </View>
                    <Pressable
                        onPress={
                            itemBasket.length > 0
                                ? () => {
                                    Navigation.navigate(Screens.CART_SUCCESS);
                                }
                                : null
                        }
                        style={{
                            borderRadius: 30,
                            paddingVertical: 12,
                            opacity: itemBasket.length > 0 ? 1 : 0.5,
                            marginBottom: 40,
                            width: '100%',
                            backgroundColor: Colors.pink,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.white,
                                fontSize: 20,
                                fontWeight: '500',
                            }}
                        >
                            Order
                        </Text>
                        <Text
                            style={{
                                color: Colors.white,
                                fontWeight: 700,
                                fontSize: 12,
                            }}
                        >
                            $ {totalCount.toFixed(2)}
                        </Text>
                    </Pressable>
                </View>
            )}
            {totalCount > 0 ? (
                <CartList />
            ) : (
                <View
                    style={{

                        paddingHorizontal: 16,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            marginBottom: 20,
                            paddingTop: Platform.OS === 'ios' ? 0 : 60,
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
                        source={require('@src/assets/img-main/basket-empty/Rectangle.png')}
                        resizeMode="cover"
                        style={{
                            marginTop: 100,
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginBottom: 20,
                        }}
                    />
                    <Text
                        style={{
                            textAlign: 'center',
                            color: Colors.white,
                            fontSize: 24,
                            paddingHorizontal: 50,
                            fontWeight: '500',
                            marginBottom: 12,
                        }}
                    >
                        You still have an empty shopping cart..
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: Colors.purpleBlack,
    },
});
export default CartScreen;
