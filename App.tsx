import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigations/MainNavigation';
import AuthNavigation from './src/navigations/AuthNavigation';
import { AppProvider, UseAppContext } from './src/utils/UseAppContext';

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
          <AuthHandler />
      </NavigationContainer>
    </AppProvider>
  );
};

const AuthHandler = () => {
  const { isAuthenticated } = UseAppContext();

  return isAuthenticated ? <MainNavigation /> : <AuthNavigation />;
};

export default App;
