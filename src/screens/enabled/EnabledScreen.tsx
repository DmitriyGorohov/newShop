import React, { type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@src/styles/Colors';
import { useSelector } from 'react-redux';
import { shopSelector } from '@src/store/shop/shopSlice';

interface EnabledScreenProps {}

const EnabledScreen: FC<EnabledScreenProps> = (): React.JSX.Element => {
    const { path } = useSelector(shopSelector);
    return (
        <View style={styles.container}>
            <Text
                style={{ fontSize: 28, fontWeight: '500', color: Colors.white }}
            >
                {path}
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        backgroundColor: Colors.purpleBlack,
    },
});
export default EnabledScreen;
