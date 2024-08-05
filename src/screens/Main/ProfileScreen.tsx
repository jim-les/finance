import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../utils/Colors';
import { UseAppContext } from '../../utils/UseAppContext';
import userImg from '../../assets/user.png';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const { user, logout } = UseAppContext();
    const navigation = useNavigation();

    const handleLogout = () => {
        logout();
        navigation.navigate('Login');
    };

    if (!user) {
        // Redirect to login screen
        navigation.navigate('Login');
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHeader}>
                <Image source={userImg} style={styles.profileImage} />
                <Text style={styles.userName}>{user.name}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.label}>Email: {user.email}</Text>
                <Text style={styles.label}>Account Balance: KES {user.balance}</Text>
                {/* Add more user information here as needed */}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About the Finance Manager</Text>
                <Text style={styles.sectionContent}>
                    This app helps you manage your finances by tracking your income and expenses. 
                    You can categorize your expenses, set budgets, and view detailed reports to understand your financial habits.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Features</Text>
                <Text style={styles.sectionContent}>
                    - Track Income and Expenses\n
                    - Set Budgets\n
                    - Generate Financial Reports\n
                    - Categorize Transactions\n
                    - Secure Data Encryption\n
                    - Cloud Backup and Restore
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Developers</Text>
                <Text style={styles.sectionContent}>
                    Developed by the Finance Manager team. For support, contact us at support@financemanager.com.
                </Text>
            </View>


            <View style={styles.section}>
                <Text style={styles.sectionTitle}>License</Text>
                <Text style={styles.sectionContent}>
                    This app is licensed under the MIT License. You can freely use, modify, and distribute the code.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>More Information</Text>
                <Text style={styles.sectionContent}>
                    For more information, visit our website or contact support.
                </Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background,
        padding: 20,
        paddingBottom: 100,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent,
    },
    userInfo: {
        marginBottom: 20,
        alignItems: 'center',
        width: '100%',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 5,
    },
    section: {
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        color: Colors.text,
        textAlign: 'justify',
    },
    logoutButton: {
        backgroundColor: Colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProfileScreen;
