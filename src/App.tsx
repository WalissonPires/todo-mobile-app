import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Home } from './screens/Home';
import { Screens } from './screens';
import { TodoDetails } from './screens/TodoDetails';
import { store } from './store';
import { colors } from './styles/colors';

const Stack = createNativeStackNavigator();
const nativatorOptions: NativeStackNavigationOptions = {
    headerShadowVisible: false,
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.textInPrimary,
};

function App() {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={nativatorOptions} >
                    <Stack.Screen name={Screens.Home} component={Home}  />
                    <Stack.Screen name={Screens.Details} component={TodoDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}


export default registerRootComponent(App);