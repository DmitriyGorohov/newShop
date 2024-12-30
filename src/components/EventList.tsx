import React from 'react';
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView, Platform,
} from 'react-native';
import Colors from '@src/styles/Colors';
import { events, EventType } from '@src/utils/common';
import Navigation from '@src/navigation/navigation';
import { Screens } from '@src/navigation/const';

const EventsList = () => {
    const onPress = (item: EventType) => {
        Navigation.navigate(Screens.EVENTS_CONTENT, { item });
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'ios' ? 0 : 60 }]}>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 6,
                    backgroundColor: Colors.purpleBackground,
                    borderRadius: 20,
                    paddingTop: 20,
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        marginBottom: 20,
                        paddingHorizontal: 16,
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
                        Events
                    </Text>
                </View>
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => onPress(item)}
                            style={styles.eventCard}
                        >
                            <Image source={item.image} resizeMode={'cover'} />
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>

                                <Text style={styles.date}>{item.date}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purpleBlack,
        paddingHorizontal: 16,
    },
    eventCard: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    textContainer: {
        marginTop: 12,
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
    },
    title: {
        alignSelf: 'flex-start',
        fontSize: 20,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 8,
    },
    date: {
        alignSelf: 'flex-start',
        fontSize: 13,
        color: Colors.pink,
    },
    time: {
        alignSelf: 'flex-start',
        fontSize: 13,
        color: Colors.pink,
    },
});

export default EventsList;
