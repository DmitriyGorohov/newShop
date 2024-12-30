import React, { useRef } from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@src/styles/Colors';
import { useSelector } from 'react-redux';
import { shopSelector } from '@src/store/shop/shopSlice';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import SwipeList from '@src/components/SwipeList';
import Navigation from '@src/navigation/navigation';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const CartList = () => {
    const { itemBasket } = useSelector(shopSelector);
    const scrollRef = useRef(null);

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    paddingHorizontal: 16,
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
            <AnimatedScrollView ref={scrollRef} style={styles.container}>
                {itemBasket.map((item) => {
                    return <SwipeList key={item.product.id} item={item} />;
                })}
            </AnimatedScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        marginBottom: 230,
        backgroundColor: Colors.purpleBackground,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
});

export default CartList;
