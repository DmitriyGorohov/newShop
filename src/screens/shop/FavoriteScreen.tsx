import React, { type FC } from 'react';
import {
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '@src/styles/Colors';
import Navigation from '@src/navigation/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
    addProductToBasket,
    decreaseProductQuantity,
    removeProductFromFavorites,
    shopSelector,
    toggleFavoriteProduct,
} from '@src/store/shop/shopSlice';
import Counter from '@src/components/Counter';

interface FavoriteScreenProps {}

const FavoriteScreen: FC<FavoriteScreenProps> = (): React.JSX.Element => {
    const { itemFavorites, itemBasket } = useSelector(shopSelector);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={styles.container}>
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
                        Favourites
                    </Text>
                </View>
                <FlatList
                    data={itemFavorites}
                    ListEmptyComponent={(
                        <Text style={{
                            color: Colors.white,
                            alignItems: 'center',
                            textAlign: 'center',
                            fontSize: 32,
                            paddingHorizontal: 50,
                        }}>
                            There's nothing here yet..
                        </Text>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 50,
                    }}
                    keyExtractor={(item) => item.product.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.product}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        if (item.product.favorites) {
                                            dispatch(
                                                removeProductFromFavorites(
                                                    item.product.id
                                                )
                                            );
                                        } else {
                                            dispatch(
                                                toggleFavoriteProduct(
                                                    item.product.id
                                                )
                                            );
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
                                    <Image
                                        source={require('@src/assets/img-main/favorites-true/mdi_heart.png')}
                                        resizeMode={'cover'}
                                    />
                                </TouchableOpacity>
                                <Image
                                    resizeMode="cover"
                                    source={item.product.image}
                                    style={styles.image}
                                />
                                <Text style={styles.title}>
                                    {item.product.title}
                                </Text>
                                <Text style={styles.price}>
                                    ${item.product.price}
                                </Text>
                                <View style={styles.actionsContainer}>
                                    {itemBasket.some(
                                        (basketItem) =>
                                            basketItem.product.id === item.id
                                    ) ? (
                                        <Counter
                                            quantity={
                                                itemBasket.find(
                                                    (basketItem) =>
                                                        basketItem.product
                                                            .id ===
                                                        item.product.id
                                                )?.quantity
                                            }
                                            onIncrement={() =>
                                                dispatch(
                                                    addProductToBasket(
                                                        item.product
                                                    )
                                                )
                                            }
                                            onDecrement={() =>
                                                dispatch(
                                                    decreaseProductQuantity(
                                                        item.product.id
                                                    )
                                                )
                                            }
                                        />
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() =>
                                                dispatch(
                                                    addProductToBasket(
                                                        item.product
                                                    )
                                                )
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
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purpleBlack,
    },
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
export default FavoriteScreen;
