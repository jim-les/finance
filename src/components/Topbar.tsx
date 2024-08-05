// TopBar.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import menu from '../assets/menu.png';
import setting from '../assets/setting.png';

const Topbar = ({ userName }) => {
    const [isProfilePic, setIsProfilePic] = React.useState(true);



    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                {isProfilePic && (
                    <Image
                    source= {menu}
                    style={styles.profileImage}
                    />
                )}
                {!isProfilePic && (
                    
                    <Icon name="person" size={32} color="#000" style={{ marginRight: 8 }} />
                )}

                <View style={styles.profileText}>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>
            <Image source={setting} style={styles.profileImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 10,
        shadowColor: '#000', // Adds a shadow effect on iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        width: '100%',
        backgroundColor: '#fff', // Ensure background color for better readability

    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 32,
        height: 32,
        marginRight: 8,
    },
    profileText: {
        flexDirection: 'column',
    },
    welcomeText: {
        fontSize: 16,
        color: '#333', // Adjust text color as needed
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // Adjust text color as needed
    },
});

export default Topbar;
