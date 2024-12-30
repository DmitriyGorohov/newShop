import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@src/styles/Colors';
import Navigation from '@src/navigation/navigation';

interface Item {
    id: string;
    date: string;
    time: string;
}

const BonusesScreen = (): React.JSX.Element => {
    const initialCards = Array(6).fill('');
    const [cards, setCards] = useState<string[]>(initialCards);
    const [items, setItems] = useState<Item[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState('');
    const allAre = cards.slice(0, 6).every((element) => element === '1111');

    useEffect(() => {
        const loadCards = async () => {
            const savedCards = await AsyncStorage.getItem('cards');
            if (savedCards.length > 0) {
                setCards(JSON.parse(savedCards));
            }
            const storedItems = await AsyncStorage.getItem('items');
            if (storedItems) {
                setItems(JSON.parse(storedItems));
            }
        };
        loadCards();
    }, []);

    const addItem = async () => {
        const now = new Date();

        // Форматирование даты
        const formattedDate = `${now.getDate()} ${now.toLocaleString('en-US', {
            month: 'long',
        })}`; // Пример: "22 June"

        // Форматирование времени
        const formattedTime = `${now.getHours()}:${String(
            now.getMinutes()
        ).padStart(2, '0')}`; // Пример: "13:20"

        const newItem: Item = {
            id: Math.random().toString(), // Уникальный ID
            date: formattedDate,
            time: formattedTime,
        };

        const updatedItems = [...items, newItem];

        try {
            // Сохраняем обновленный массив в AsyncStorage
            await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
            setItems(updatedItems); // Обновляем состояние
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
        }
    };

    // Сохранение состояния в AsyncStorage
    const saveCards = async (newCards: string[]) => {
        await AsyncStorage.setItem('cards', JSON.stringify(newCards));
        setCards(newCards);
    };

    // Очистка AsyncStorage и сброс состояния
    const resetCards = async () => {
        await AsyncStorage.removeItem('cards');
        await AsyncStorage.removeItem('items');
        setCards(initialCards);
        setItems([]);
    };

    // Открытие модалки
    const handleCardPress = (index: number) => {
        setSelectedCard(index);
        setModalVisible(true);
    };

    // Сохранение данных карточки
    const handleSave = () => {
        if (selectedCard !== null) {
            const newCards = [...cards];
            if (inputValue === '1111') {
                addItem();
                newCards[selectedCard] = inputValue;
                saveCards(newCards);
                setInputValue('');
                setSelectedCard(null);
                setModalVisible(false);
                setIsError(false);
            } else {
                setIsError(true);
            }
        }
    };

    const renderBonusItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (index + 1 !== 8) {
                        if (item !== '1111') {
                            handleCardPress(index);
                        }
                    }
                }}
                style={styles.bonusItem}
            >
                {item === '1111' && (
                    <Image
                        source={require('@src/assets/img-main/done/material-symbols_done-rounded.png')}
                        resizeMode={'cover'}
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                )}
            </TouchableOpacity>
        );
    };

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
                <Image
                    resizeMode={'cover'}
                    source={require('@src/assets/img-main/bonuses/image-1/image-1.png')}
                    style={{
                        position: 'absolute',

                        width: 200,
                        height: 200,
                        left: 100,
                        top: 120,
                    }}
                />
                <Image
                    resizeMode={'cover'}
                    source={require('@src/assets/img-main/bonuses/image-3/image-3.png')}
                    style={{
                        position: 'absolute',
                        top: 100,
                    }}
                />
                <Image
                    resizeMode={'cover'}
                    source={require('@src/assets/img-main/bonuses/image-4/image-4.png')}
                    style={{
                        position: 'absolute',
                        top: 150,
                        right: 0,
                    }}
                />
                <Image
                    resizeMode={'cover'}
                    source={require('@src/assets/img-main/bonuses/image-2/image-2.png')}
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 250,
                    }}
                />
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
                        Bonuses
                    </Text>
                </View>
                <Text
                    style={{
                        color: Colors.white,
                        fontSize: 16,
                        marginBottom: 12,
                        marginTop: 200,
                    }}
                >
                    Five desserts - The sixth as a gift
                </Text>
                <FlatList
                    data={cards}
                    renderItem={renderBonusItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.gridContainer}
                />
            </View>
            <Modal isVisible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter code</Text>
                        <TextInput
                            placeholderTextColor={Colors.textBlack}
                            style={[
                                styles.input,
                                isError && {
                                    borderWidth: 2,
                                    borderColor: Colors.button.buttonError,
                                },
                            ]}
                            maxLength={4}
                            value={inputValue}
                            onChangeText={(text) => {
                                setIsError(false);
                                setInputValue(text);
                            }}
                            placeholder="Enter code"
                            keyboardType="number-pad"
                        />
                        {isError && (
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '400',
                                    color: Colors.button.buttonError,
                                    marginBottom: 12,
                                }}
                            >
                                The code is not correct
                            </Text>
                        )}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={handleSave}
                                style={{
                                    backgroundColor: Colors.purpleBackground,
                                    padding: 16,
                                    flex: 1,
                                    marginRight: 10,
                                    borderRadius: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                        fontWeight: '400',
                                        color: Colors.white,
                                    }}
                                >
                                    Save
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setInputValue('');
                                    setSelectedCard(null);
                                    setModalVisible(false);
                                    setIsError(false);
                                }}
                                style={{
                                    flex: 1,
                                    backgroundColor: Colors.purpleBackground,
                                    padding: 16,
                                    borderRadius: 12,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: Colors.white,
                                        fontSize: 18,
                                        fontWeight: '400',
                                    }}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View
                style={{
                    paddingHorizontal: 16,
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 40,
                    width: '100%',
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        if (!allAre) {
                            Navigation.pop();
                        } else {
                            resetCards();
                        }
                    }}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.purpleBackground,
                        borderRadius: 30,
                        paddingVertical: 12,
                    }}
                >
                    <Text
                        style={{
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: '700',
                        }}
                    >
                        {allAre ? 'Reset' : 'Back to menu'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purpleBlack,
    },
    title: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 24,
    },
    gridContainer: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    bonusItem: {
        width: '28%',
        backgroundColor: Colors.purpleBlack,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        borderRadius: 8,
    },
    completedItem: {
        backgroundColor: Colors.button.buttonGreen,
    },
    incompleteItem: {
        backgroundColor: '#F5F5F5',
    },
    checkmarkContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 350,
        padding: 20,
        backgroundColor: Colors.purpleBlack,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.white,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        fontSize: 20,
        borderRadius: 30,
        paddingVertical: 12,
        color: Colors.white,
        backgroundColor: Colors.purpleBackground,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
});
export default BonusesScreen;
