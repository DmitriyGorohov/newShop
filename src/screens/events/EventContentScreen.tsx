import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@src/styles/Colors';
import { useRoute } from '@react-navigation/native';
import { MainRouteProps } from '@src/types/stacks/MainStacksType';
import Navigation from '@src/navigation/navigation';

const EventContentScreen = (): React.JSX.Element => {
    const { params } = useRoute<MainRouteProps>();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => Navigation.pop()}
                activeOpacity={0.9}
                style={{
                    width: 65,
                    height: 65,
                    position: 'absolute',
                    top: 60,
                    left: 16,
                    zIndex: 999,
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
            <Image source={params.item.image} style={styles.image} />
            <Text style={styles.title}>{params.item.title}</Text>
            <Text style={styles.date}>{params.item.date}</Text>
            <Text style={styles.time}>{params.item.time}</Text>
            <Text style={styles.description}>{params.item.description}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purpleBlack,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 16,
        color: Colors.textBlack,
        marginLeft: 8,
    },
    title: {
        paddingHorizontal: 16,
        fontSize: 25,
        fontWeight: '600',
        color: Colors.white,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        borderRadius: 20,
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#666666',
        fontWeight: '400',
        paddingHorizontal: 16,
    },
    date: {
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
        fontSize: 13,
        color: Colors.pink,
        marginBottom: 10,
    },
    time: {
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
        fontSize: 13,
        color: Colors.pink,
        marginBottom: 10,
    },
});
export default EventContentScreen;
