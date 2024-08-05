import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import home from '../assets/home.png';
import transactionImage from '../assets/transaction.png';
import PlusImage from '../assets/plus.png';
import statisticsImage from '../assets/statistics.jpg';
import profileImag from '../assets/user.png';

// Screen imports
import WelcomeScreen from '../screens/Main/WelcomeScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import AddExpenseScreen from '../screens/Main/AddExpenseScreen';
import TransactionScreen from '../screens/Main/TransactionScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import StatisticsScreen from '../screens/Main/StatisticsScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow
            }}
            onPress={onPress}
        >
            <View
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: Colors.card,
                    borderWidth: 4,
                    borderColor: Colors.primary,
                }}>
                {children}
            </View>
        </TouchableOpacity>
    );
}

const MainNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.secondary,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#fff', // Ensure background color for better readability
                    height: 60,
                    elevation: 0,
                    borderWidth: 0,
                    paddingBottom: 10,
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.bottomTabView}>
                            <Image source={home} style={{ width: 30, height: 30 }} />
                            <Text style={{
                                ...styles.bottomTabText,
                                color: focused ? Colors.primary : Colors.secondary
                            }}>
                                Home
                            </Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen name="Transaction" component={TransactionScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.bottomTabView}>
                            <Image source={transactionImage} style={{ width: 30, height: 30 }} />
                            <Text style={{
                                ...styles.bottomTabText,
                                color: focused ? Colors.primary : Colors.secondary
                            }}>
                                Transaction
                            </Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen name="AddExpense" component={AddExpenseScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image source={PlusImage} style={{ width: 30, height: 30 }} />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }}
            />

            <Tab.Screen name="Statistics" component={StatisticsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.bottomTabView}>
                            <Image source={statisticsImage} style={{ width: 30, height: 30 }} />
                            <Text style={{
                                ...styles.bottomTabText,
                                color: focused ? Colors.primary : Colors.secondary
                            }}>
                                Statistics
                            </Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.bottomTabView}>
                            <Image source={profileImag} style={{ width: 30, height: 30 }} />
                            <Text style={{
                                ...styles.bottomTabText,
                                color: focused ? Colors.primary : Colors.secondary
                            }}>
                                My account
                            </Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    bottomTabView: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
    },
    bottomTabText: {
        fontSize: 12,
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
});

export default MainNavigation;
