import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/Home';
import { Screens } from './screens';
import { TodoDetails } from './screens/TodoDetails';
import { store } from './store';

const Stack = createNativeStackNavigator();

function App() {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={Screens.Home} component={Home} />
                    <Stack.Screen name={Screens.TodoDetails} component={TodoDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}


export default registerRootComponent(App);