import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react';
import Logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    setTimeout(() => {
        navigation.navigate('Intro');
    }, 5000);
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgb(5, 5, 30.9)"
    },
    logo: {
        width: 250,
        height: 250,
        borderRadius: 1000,
        borderWidth: 5,
        borderColor: "white",
    }
});

export default WelcomeScreen;