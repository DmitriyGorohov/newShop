import React, { type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@src/styles/Colors';

interface NotInternetProps {
}

const NotInternet: FC<NotInternetProps> = (): React.JSX.Element => {
    return (
        <View style={styles.container}>
            <Text
                style={{ fontSize: 28, fontWeight: '500', color: Colors.white }}
            >
                Not Internet
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.purpleBlack,
    },
});
export default NotInternet;
