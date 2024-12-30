import { KeyboardView } from '@src/components/base/KeyboardView';
import React, { useState } from 'react';
import {
    Image, Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '@src/styles/Colors';
import Navigation from '@src/navigation/navigation';

const ContactsScreen = (): React.JSX.Element => {
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [taskIndex, setTaskIndex] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardView isScroll scrollViewStyle={{ paddingBottom: 50, paddingTop: Platform.OS === 'ios' ? 0 : 50 }}>
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
                            Contacts
                        </Text>
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.input.placeholderColor}
                            placeholder={'Phone number'}
                            value={phone}
                            keyboardType={'phone-pad'}
                            onChangeText={setPhone}
                        />
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.input.placeholderColor}
                            placeholder={'Address'}
                            value={address}
                            onChangeText={setAddress}
                        />
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.input.placeholderColor}
                            placeholder={'Data'}
                            value={comment}
                            onChangeText={setComment}
                        />
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={Colors.input.placeholderColor}
                            placeholder={'Table'}
                            value={taskIndex}
                            onChangeText={setTaskIndex}
                        />
                    </View>
                </View>
            </KeyboardView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purpleBlack,
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
});
export default ContactsScreen;
