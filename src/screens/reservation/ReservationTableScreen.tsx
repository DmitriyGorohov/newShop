import React, { type FC, useState } from 'react';
import {
    Image, Platform, Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '@src/styles/Colors';
import Navigation from '@src/navigation/navigation';
import { Screens } from '@src/navigation/const';

interface ReservationTableScreenProps {}

const ReservationTableScreen: FC<
    ReservationTableScreenProps
> = (): React.JSX.Element => {
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
        null
    );

    const handleCellPress = (rowIndex: number, cellIndex: number) => {
        // Если нажали на пустую ячейку (0), ничего не делаем
        if (gridLayout[rowIndex][cellIndex] === 0) return;

        // Устанавливаем выбранную ячейку
        setSelectedCell([rowIndex, cellIndex]);
    };

    const gridLayout = [
        [1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    return (
        <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'ios' ? 0 : 60 }]}>
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
                <Text style={{ color: Colors.white, opacity: 0.7, fontSize: 16, marginBottom: 20, }}>Choose table</Text>
                {gridLayout.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, cellIndex) => {
                            const isSelected =
                                selectedCell?.[0] === rowIndex &&
                                selectedCell?.[1] === cellIndex;

                            return (
                                <TouchableOpacity
                                    key={cellIndex}
                                    style={[
                                        styles.cell,
                                        cell === 0 && styles.emptyCell,
                                        isSelected && styles.selectedCell,
                                    ]}
                                    onPress={() =>
                                        handleCellPress(rowIndex, cellIndex)
                                    }
                                />
                            )
                        })}
                    </View>
                ))}
            </View>
            <Pressable
                onPress={
                    selectedCell === null
                        ? null
                        : () => Navigation.navigate(Screens.RESERVATION_SUCCESS)
                }
                style={{
                    backgroundColor: Colors.button.second,
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 20,
                    alignSelf: 'center',
                    opacity: selectedCell === null ? 0.5 : 1,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
    },
    cell: {
        width: 40, // Ширина ячейки
        height: 40, // Высота ячейки
        // backgroundColor: '#A68BD2', // Цвет ячейки
        borderRadius: 8, // Скругление углов
        marginHorizontal: 10, // Расстояние между ячейками
        borderWidth: 2,
        borderColor: Colors.pink, // Цвет рамки
    },
    emptyCell: {
        backgroundColor: 'transparent', // Пустая ячейка (пробел)
        borderWidth: 0,
    },
    selectedCell: {
        backgroundColor: Colors.pink, // Цвет ячейки при выборе
    },
});
export default ReservationTableScreen;
