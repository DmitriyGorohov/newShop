import React, { useEffect } from 'react';
import {
    FlatList,
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { KeyboardView } from '@src/components/base/KeyboardView';
import Colors from '@src/styles/Colors';
import Navigation from '@src/navigation/navigation';
import { Screens } from '@src/navigation/const';

const ReservationScreen = (): React.JSX.Element => {
    const [firstName, setFirstName] = React.useState('');
    const [arrayDate, setDateArray] = React.useState<
        | {
              day: number;
              name: string;
          }[]
        | null
    >(null);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [time, setTime] = React.useState('');
    const [date, setDate] = React.useState<{
        day: number;
        name: string;
    } | null>(null);

    useEffect(() => {
        const generateDaysInMonth = (
            monthIndex: number
        ): {
            day: number;
            name: string;
        }[] => {
            const months = [
                'JAN',
                'FEB',
                'MAR',
                'APR',
                'MAY',
                'JUN',
                'JUL',
                'AUG',
                'SEP',
                'OCT',
                'NOV',
                'DEC',
            ];

            // Получаем текущий год
            const year = new Date().getFullYear();

            // Определяем количество дней в месяце
            const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

            // Формируем массив объектов с днями
            return Array.from({ length: daysInMonth }, (_, i) => ({
                day: i + 1,
                name: months[monthIndex],
            }));
        };

        const now = new Date();
        const currentDay = now.getDate(); // Текущий день
        const currentMonthIndex = now.getMonth(); // Индекс текущего месяца (0-11)

        const daysArray = generateDaysInMonth(currentMonthIndex);

        // Устанавливаем массив всех дней месяца
        setDateArray(daysArray);

        const todayItem = { day: 1, name: daysArray[currentDay - 1].name };
        setDate(todayItem);
    }, []);

    const disabled =
        firstName === '' ||
        phoneNumber === '' ||
        time === '' ||
        date === null;
    const timesTime = [
        '10:00',
        '11:00',
        '13:00',
        '14:00',
        '14:50',
        '15:00',
        '15:15',
        '15:40',
        '16:00',
        '14:30',
        '16:45',
        '17:30',
    ];
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardView
                isScroll
                scrollViewStyle={{
                    paddingBottom: 50,
                    paddingTop: Platform.OS === 'ios' ? 0 : 50,
                }}
            >
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
                            Reservation
                        </Text>
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.input.placeholderColor}
                            placeholder={'Your name'}
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            keyboardType={'phone-pad'}
                            placeholderTextColor={Colors.input.placeholderColor}
                            placeholder={'Your phone number'}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                    <Text style={{ color: Colors.white, marginBottom: 12 }}>
                        Selected date
                    </Text>
                    <FlatList
                        horizontal
                        keyExtractor={(item) => item.day.toString()}
                        data={arrayDate}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    setDate(
                                        item as { day: number; name: string }
                                    )
                                }
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 22,
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            item.day === date.day
                                                ? Colors.pink
                                                : Colors.white,
                                        fontSize: 32,
                                    }}
                                >
                                    {item.day}
                                </Text>
                                <Text
                                    style={{
                                        color:
                                            date.day === item.day
                                                ? Colors.pink
                                                : Colors.white,
                                        marginTop: 10,
                                        fontSize: 22,
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={styles.grid}>
                        {timesTime.map((timeT, index) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setTime(timeT);
                                }}
                                key={index}
                                style={[styles.timeButton, {
                                    backgroundColor:
                                        time === timeT
                                            ? Colors.pink
                                            : Colors.button.second,
                                },]}
                            >
                                <Text
                                    style={[
                                        styles.timeText,
                                    ]}
                                >
                                    {timeT}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </KeyboardView>
            <Pressable
                onPress={
                    disabled
                        ? null
                        : () => Navigation.navigate(Screens.RESERVATION_TABLE)
                }
                style={{
                    backgroundColor: Colors.button.second,
                    alignItems: 'center',
                    alignSelf: 'center',
                    opacity: disabled ? 0.5 : 1,
                    justifyContent: 'center',
                    width: 100,
                    height: 100,
                    borderRadius: 100 / 2,
                    marginBottom: 10,
                }}
            >
                <Image
                    source={require('@src/assets/img-main/button-ok/material-symbols_done-rounded.png')}
                />
            </Pressable>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purpleBlack,
    },
    cartIcon: {
        width: 24,
        height: 24,
    },
    cartText: {
        color: 'white',
        fontWeight: 'bold',
    },
    form: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.textBlack,
        marginBottom: 4,
    },
    input: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '400',
        paddingHorizontal: 16,
        width: '100%',
        minHeight: 60,
        backgroundColor: Colors.purpleBlack,
        borderRadius: 32,
    },
    grid: {
        paddingTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    timeButton: {
        width: '30%', // Ширина одной кнопки (приблизительно 3 на строку)
        paddingVertical: 8,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    timeText: {
        color: '#FFFFFF', // Белый текст
        fontSize: 16,
        fontWeight: '600',
    },
});
export default ReservationScreen;
