import React, { type FC } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '@src/styles/Colors';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Counter from '@src/components/Counter';
import {
    addProductToBasket,
    decreaseProductQuantity,
    removeProductFromBasket,
} from '@src/store/shop/shopSlice';
import { useDispatch } from 'react-redux';
import { Product } from '@src/utils/common';

interface SwipeListProps
    extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    item: { product: Product; quantity: number };
}

const TRANSLATE_X_THRESHOLD = Dimensions.get('window').width * 0.2;
const SwipeList: FC<SwipeListProps> = ({
    item,
    simultaneousHandlers,
}): React.JSX.Element => {
    const dispatch = useDispatch();
    const translateX = useSharedValue(0);

    const changeSwipe = () => {
        dispatch(removeProductFromBasket(item.product.id));
    };

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
        {
            onActive: (event) => {
                if (event.translationX < 0) {
                    translateX.value = event.translationX;
                }
            },
            onEnd: () => {
                const show = translateX.value < -TRANSLATE_X_THRESHOLD;
                if (show) {
                    translateX.value = withTiming(-TRANSLATE_X_THRESHOLD);
                } else {
                    translateX.value = withTiming(0, { duration: 200 });
                }
            },
        }
    );

    const translateStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));
    return (
        <View style={{ flex: 1, width: '100%', paddingBottom: 20 }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={changeSwipe}
                style={{
                    height: 100,
                    width: 320,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    borderRadius: 12,
                    position: 'absolute',
                    right: 0,
                }}
            >
                <Image
                    source={require('@src/assets/img-main/remove/material-symbols_delete.png')}
                    resizeMode={'cover'}
                    style={{ position: 'absolute', right: 10, top: 35 }}
                />
            </TouchableOpacity>
            <PanGestureHandler
                simultaneousHandlers={simultaneousHandlers}
                onGestureEvent={panGesture}
            >
                <Animated.View style={[styles.cartItem, translateStyle]}>
                    <Image
                        source={item.product.image}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.infoContainer}>
                        <Text numberOfLines={2} style={styles.title}>
                            {item.product.title}
                        </Text>
                        <Text style={styles.price}>
                            $ {item.product.price}
                        </Text>
                        <View style={styles.detailsContainer}>
                            <Counter
                                width={150}
                                quantity={item.quantity}
                                onIncrement={() =>
                                    dispatch(addProductToBasket(item.product))
                                }
                                onDecrement={() =>
                                    dispatch(decreaseProductQuantity(item.product.id))
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.detailsContainer} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};
const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: Colors.purpleBlack,
        borderColor: Colors.white,
        marginBottom: 16,
        borderRadius: 20,
        width: '100%',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 12,
    },
    infoContainer: {
        alignItems: 'flex-start',
        width: 200,
        height: 100,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'left',
        color: Colors.white,
        // marginBottom: 4,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.white,
        marginRight: 8,
    },
});
export default SwipeList;
