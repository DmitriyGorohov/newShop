import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import { Screens } from '@src/navigation/const';
import React from 'react';
import EnabledScreen from '@src/screens/enabled/EnabledScreen';

const Stack = createStackNavigator();

const EnabledStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={
                Screens.MAIN_ENABLED_SCREEN
            }
        >
            <Stack.Screen
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
                name={Screens.MAIN_ENABLED_SCREEN}
                component={EnabledScreen}
            />
        </Stack.Navigator>
    );
};

export default EnabledStack;
