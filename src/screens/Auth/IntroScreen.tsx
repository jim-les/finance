// elcome screen.tsx
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import bg from '../../assets/bg.png';
// interface introProp {
//     navigation: string
// }

const IntroScreen = () => {
    const navigation = useNavigation();
    
    const handleGetStarted = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Image source={bg} style={{width: "100%", height: "100%", position: "absolute"}} />
            <View style={styles.topContainer}>
                {/* welcome note */}
                <Text style={{fontSize: 30, color: "black", textAlign: "center", marginTop: 100}}>Welcome to</Text>
                <Text style={{fontSize: 50, color: "black", textAlign: "center", fontWeight: "bold"}}>Fin Track</Text>

            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}> Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 9
    },
    bottomContainer:{
        flex: 1,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: "rgb(30, 20, 100)",
        paddingVertical: 17,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
})

export default IntroScreen