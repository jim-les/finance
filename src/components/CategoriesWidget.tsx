import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Pressable, Alert, ActivityIndicator } from 'react-native';
import Colors from '../utils/Colors';
import { UseAppContext } from '../utils/UseAppContext';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';

// assets import
import recuring from '../assets/recuring.png';
import groceries from '../assets/groceries.png';
import food from '../assets/food2.png';
import fuel from '../assets/fuel2.png';
import travel from '../assets/travel2.png';
import shopping from '../assets/shopping.png';
import banking from '../assets/banking.png';
import others from '../assets/others.png';

const expenceApi = 'api/expense';

const foodIcons = [
    [recuring, "Recurring"],
    [groceries, "Groceries"],
    [food, 'Food'],
    [fuel, 'Fuel'],
    [travel, 'Travel'],
    [shopping, 'Shopping'],
    [banking, 'Banking'],
    [others, 'Others']
];

const CategoriesWidget = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [expenseSum, setExpenseSum] = useState<string | null>(null);
    const { user } = UseAppContext();

    // loader
    const [loading, setLoading] = useState(false);

    const handleNavigation = async (icon) => {
        const category = icon[1];
        setModalVisible(true);
        setSelectedCategory(category);
        setLoading(true);
        
        try {
            const response = await fetch(`${base_url}/api/expenses`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setExpenseSum( data.reduce((acc, expense) => {
                if (expense.category === category) {
                    return acc + parseFloat(expense.amount);
                }
                return acc;
            }, 0).toFixed(2));

        } catch (error) {
            console.error('Error fetching expense sum:', error);
        } finally{
            setLoading(false);
        }

    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedCategory(null);
        setExpenseSum(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            {/* First Row */}
            <View style={styles.row}>
                {foodIcons.slice(0, 4).map((icon, index) => (
                    <TouchableOpacity key={index} style={styles.item} onPress={() => handleNavigation(icon)}>
                        <Image source={icon[0]} style={{ width: 50, height: 50 }} />
                        <Text style={{ color: Colors.text, fontSize: 12 }}>{icon[1]}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* Second Row */}
            <View style={styles.row}>
                {foodIcons.slice(4, 8).map((icon, index) => (
                    <TouchableOpacity key={index} style={styles.item} onPress={() => handleNavigation(icon)}>
                        <Image source={icon[0]} style={{ width: 50, height: 50 }} />
                        <Text style={{ color: Colors.text, fontSize: 12 }}>{icon[1]}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        {selectedCategory && (
                            <>
                                <Image source={foodIcons.find(icon => icon[1] === selectedCategory)[0]} style={styles.modalIcon} />
                                <Text style={styles.modalText}>{selectedCategory}</Text>
                                { loading ? (
                                    <> 
                                        <ActivityIndicator size="large" color={Colors.primary} />
                                        <Text style={styles.modalAmount}>Loading...</Text>
                                    </>
                                ) : (
                                    <Text style={styles.modalAmount}>Total Expenses: {expenseSum !== null ? `kSh${expenseSum}` : 'Loading...'}</Text>

                                )}
                            </>
                        )}
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={handleCloseModal}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 170,
        maxHeight: 200,
        padding: 20,
        // marginBottom: 40,
        color: '#000',
        backgroundColor: '#fff', // Ensure background color for better readability

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.accent,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    item: {
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        width: '22%',
        aspectRatio: 1,
        borderRadius: 10,
        padding: 3,
        paddingVertical: 3,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalIcon: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        color: Colors.primary,
    },
    modalAmount: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: Colors.accent,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CategoriesWidget;
