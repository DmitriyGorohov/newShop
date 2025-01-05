import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Platform,
} from 'react-native';
import Colors from '@src/styles/Colors';
import { eventsCommon, EventType } from '@src/utils/common';
import Navigation from '@src/navigation/navigation';
import { Screens } from '@src/navigation/const';
import { useSelector } from 'react-redux';
import { shopSelector } from '@src/store/shop/shopSlice';
import { EventTypeApi } from '@src/api/axiosApi';

const EventsList = () => {
    const { events } = useSelector(shopSelector);
    const [eventList, setEventList] = useState<EventTypeApi[]>([]);

    useEffect(() => {
        // Объединяем events и eventsCommon
        const mergedEvents = [...events, ...eventsCommon];
        setEventList(mergedEvents);
    }, [events]);

    const onPress = (item: EventType) => {
        const mocItem = {
            id: Math.random(),
            title: 'Theme of the Night: Italian Celebration',
            description:
                'Immerse yourself in the atmosphere of Italy at our themed evening with live music, traditional dishes, and dances that will transport you to the heart of Rome.',
            date: item.date,
            time: '6:00 PM – 11:00 PM',
            image: require('@src/assets/img/event-3/event-3.png'),
        };

        if (item.title) {
            Navigation.navigate(Screens.EVENTS_CONTENT, { item });
        } else {
            Navigation.navigate(Screens.EVENTS_CONTENT, { item: mocItem });
        }
    };

    return (
        <SafeAreaView
            style={[
                styles.container,
                { paddingTop: Platform.OS === 'ios' ? 0 : 60 },
            ]}
        >
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
                    data={eventList}
                    keyExtractor={(item, index) => `${item.id}_${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => onPress(item)}
                            style={styles.eventCard}
                        >
                            {item.image ? (
                                <Image
                                    source={item.image}
                                    resizeMode={'cover'}
                                />
                            ) : (
                                <Image
                                    source={require('@src/assets/img/event-3/event-3.png')}
                                    resizeMode={'cover'}
                                />
                            )}
                            <View style={styles.textContainer}>
                                {item.title ? (
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                ) : (
                                    <Text style={styles.title}>
                                        Dinner Under the Stars
                                    </Text>
                                )}

                                <Text style={styles.date}>{item.date}</Text>
                                {item.time && (
                                    <Text style={styles.time}>{item.time}</Text>
                                )}
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
