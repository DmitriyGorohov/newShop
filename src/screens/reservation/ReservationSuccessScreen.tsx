import { type FC } from 'react';
import { Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@src/styles/Colors';
import React from 'react';
import Navigation from '@src/navigation/navigation';
import {Screens} from '@src/navigation/const';

interface ReservationSuccessScreenProps {}

const ReservationSuccessScreen: FC<
    ReservationSuccessScreenProps
> = (): React.JSX.Element => {
    return (
        <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'ios' ? 0 : 60 }]}>
            <View
                style={{
                    paddingHorizontal: 16,
                    backgroundColor: Colors.purpleBackground,
                    borderRadius: 20,
                    paddingVertical: 20,
                    marginBottom: 40,

                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        marginBottom: 120,
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
                <Text style={{ color: 'white', fontSize: 35, textAlign: 'center' }}>
                    Your reservation has been successfully placed
                </Text>
            </View>
            <Image
                source={require('@src/assets/img-main/qr-code-success/qr-code-success.png')}
                resizeMode={'cover'}
                style={{
                    alignSelf: 'center',
                }}
            />
            <Pressable
                onPress={() => Navigation.navigate(Screens.MAIN_SCREEN)}
                style={{
                    backgroundColor: Colors.button.second,
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 20,
                    alignSelf: 'center',
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
        paddingHorizontal: 16,
        backgroundColor: Colors.purpleBlack,
    },
});
export default ReservationSuccessScreen;
