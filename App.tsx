import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import StackNavigation from './src/navigations/StackNavigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}
