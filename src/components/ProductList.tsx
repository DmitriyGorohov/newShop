import { Product } from '@src/utils/common';
import React from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Colors from '@src/styles/Colors';
import { useDispatch, useSelector } from 'react-redux';
import {
    addProductToBasket,
    decreaseProductQuantity,
    removeProductFromFavorites,
    shopSelector,
    toggleFavoriteProduct,
} from '@src/store/shop/shopSlice';
import Counter from '@src/components/Counter';

const ProductList = ({ data }: { data: Product[] }) => {
    const dispatch = useDispatch();
    const { itemBasket } = useSelector(shopSelector);

    return (
        <FlatList
            data={data}
            bounces={false}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.product}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            if (item.favorites) {
                                dispatch(removeProductFromFavorites(item.id));
                            } else {
                                dispatch(toggleFavoriteProduct(item.id));
                            }
                        }}
                        style={{
                            zIndex: 999,
                            width: 60,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 60 / 2,
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            backgroundColor: Colors.white,
                        }}
                    >
                        {item.favorites ? (
                            <Image
                                source={require('@src/assets/img-main/favorites-true/mdi_heart.png')}
                                resizeMode={'cover'}
                            />
                        ) : (
                            <Image
                                source={require('@src/assets/img-main/favorites-false/mdi_heart-outline.png')}
                                resizeMode={'cover'}
                            />
                        )}
                    </TouchableOpacity>
                    <Image
                        resizeMode="cover"
                        source={item.image}
                        style={styles.image}
                    />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                    <View style={styles.actionsContainer}>
                        {itemBasket.some(
                            (basketItem) => basketItem.product.id === item.id
                        ) ? (
                            <Counter
                                quantity={
                                    itemBasket.find(
                                        (basketItem) =>
                                            basketItem.product.id === item.id
                                    )?.quantity
                                }
                                onIncrement={() =>
                                    dispatch(addProductToBasket(item))
                                }
                                onDecrement={() =>
                                    dispatch(decreaseProductQuantity(item.id))
                                }
                            />
                        ) : (
                            <TouchableOpacity
                                onPress={() =>
                                    dispatch(addProductToBasket(item))
                                }
                                style={styles.addButton}
                            >
                                <Text style={styles.addButtonText}>
                                    Add to basket
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    product: {
        flex: 1,
        marginBottom: 20,
    },
    contentContainerStyle: {
        marginTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 150 : 180,
    },
    image: {
        width: '100%',
        borderRadius: 12,
        marginBottom: 12,
    },
    title: {
        fontWeight: '500',
        fontSize: 20,
        color: Colors.white,
        marginBottom: 4,
    },
    price: {
        fontSize: 17,
        fontWeight: '900',
        color: Colors.pink,
    },
    // Другие стили остаются прежними
    actionsContainer: {
        marginTop: 8,
        width: '100%',
    },
    addButton: {
        backgroundColor: Colors.pink,
        borderRadius: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        elevation: 3,
    },
    addButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: Colors.white,
    },
});

export default ProductList;
