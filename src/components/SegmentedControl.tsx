import React from 'react';
import { type FC } from 'react';
import {StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import Colors from '@src/styles/Colors';

type SegmentedControlProps = {
    options: string[];
    selectedOption: string;
    onOptionPress?: (option: string) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
    ({ options, selectedOption, onOptionPress }) => {
        const { width: windowWidth } = useWindowDimensions();

        const internalPadding = 0;
        const segmentedControlWidth = windowWidth - 40;

        const itemWidth =
            (segmentedControlWidth - internalPadding) / options.length;

        const rStyle = useAnimatedStyle(() => {
            return {
                left: withTiming(
                    itemWidth * options.indexOf(selectedOption) + internalPadding / 2
                ),
            };
        }, [selectedOption, options, itemWidth]);

        return (
            <View
                style={[
                    styles.container,
                    {
                        width: segmentedControlWidth,
                        borderRadius: 12,
                        paddingLeft: internalPadding / 2,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        {
                            width: itemWidth,
                        },
                        rStyle,
                        styles.activeBox,
                    ]}
                />
                {options.map((option) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                onOptionPress?.(option);
                            }}
                            key={option}
                            style={[
                                {
                                    width: itemWidth,
                                },
                                styles.labelContainer,
                            ]}
                        >
                            <Text style={styles.label}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
);
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 36,
        width: '100%',
        backgroundColor: Colors.gray,
    },
    activeBox: {
        position: 'absolute',
        borderRadius: 12,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        elevation: 3,
        height: '95%',
        top: '3%',
        backgroundColor: Colors.white,
    },
    labelContainer: { justifyContent: 'center', alignItems: 'center' },
    label: {
        fontSize: 12,
    },
});
export default SegmentedControl;
