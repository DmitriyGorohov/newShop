import React, { useEffect, useState } from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '@src/styles/Colors';
import SegmentedControl from '@src/components/SegmentedControl';
import ProductList from '@src/components/ProductList';
import {
    Product,
    allProducts,
    breakfasts,
    dinners,
    lunches,
    app,
    desert,
} from '@src/utils/common';
import Navigation from '@src/navigation/navigation';
import { Screens } from '@src/navigation/const';
import { useDispatch, useSelector } from 'react-redux';
import { shopSelector, visibleItems } from '@src/store/shop/shopSlice';

const options = [
    'All',
    'Breakfasts',
    'Main Courses',
    'Salads',
    'Appetizers',
    'Desserts',
];

const ShopScreen = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const { itemBasket, itemFavorites, items } = useSelector(shopSelector);
    const [selectedOption, setSelectedOption] = useState('All');
    console.log(itemFavorites);
    useEffect(() => {
        const getProducts = (): Product[] => {
            switch (selectedOption) {
                case 'All':
                    return allProducts;
                case 'Breakfasts':
                    return breakfasts;
                case 'Main Courses':
                    return lunches;
                case 'Salads':
                    return dinners;
                case 'Appetizers':
                    return app;
                case 'Desserts':
                    return desert;
                default:
                    return [];
            }
        };

        // Отображаемые данные
        const products = getProducts();
        dispatch(visibleItems(products));
    }, [selectedOption, dispatch]);

    return (
        <SafeAreaView
            style={[
                styles.container,
                { paddingTop: Platform.OS === 'ios' ? 0 : 60 },
            ]}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        color: Colors.white,
                        fontSize: 35,
                        fontWeight: '800',
                    }}
                >
                    Shop
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => Navigation.navigate(Screens.SHOP_FAVORITE)}
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
                        {itemFavorites.length > 0 && (
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    backgroundColor: Colors.pink,
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20 / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 10,
                                        color: Colors.white,
                                    }}
                                >
                                    {itemFavorites.length}
                                </Text>
                            </View>
                        )}
                        <Image
                            resizeMode={'cover'}
                            source={require('@src/assets/img-main/like/Vector.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Navigation.navigate(Screens.CART)}
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
                        {itemBasket.length > 0 && (
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    backgroundColor: Colors.pink,
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20 / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 10,
                                        color: Colors.white,
                                    }}
                                >
                                    {itemBasket.length}
                                </Text>
                            </View>
                        )}
                        <Image
                            resizeMode={'cover'}
                            source={require('@src/assets/img-main/cart/Group.png')}
                        />
                    </TouchableOpacity>
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
                            source={require('@src/assets/img-main/home/Vector.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    paddingHorizontal: 16,
                }}
            >
                <SegmentedControl
                    options={options}
                    selectedOption={selectedOption}
                    onOptionPress={setSelectedOption}
                />
                <ProductList data={items} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purpleBlack,
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        width: 180,
        position: 'absolute',
        bottom: 40,
        borderRadius: 16,
        backgroundColor: Colors.button.buttonGreen,
    },
    cartIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    cartText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
export default ShopScreen;
