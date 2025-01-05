import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navigation from './navigation';
import { Stacks } from './const';
import { MainStack } from '@src/navigation/stacks';
import { useSelector } from 'react-redux';
import { shopSelector } from '@src/store/shop/shopSlice';
import EnabledStack from '@src/navigation/stacks/EnabledStack';

const Stack = createStackNavigator();

const NavigatorContainerTemplate = (): React.JSX.Element => {
    const { enabledApi } = useSelector(shopSelector);

    return (
        <NavigationContainer
            ref={Navigation.navigationRef}
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                },
            }}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {!enabledApi ? (
                    <Stack.Screen
                        name={Stacks.ENABLED}
                        component={EnabledStack}
                    />
                ) : (
                    <Stack.Screen name={Stacks.MAIN} component={MainStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigatorContainerTemplate;
