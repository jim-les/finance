import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Colors from '../utils/Colors';
import ExpenseCard from './ExpenseCard';
import { base_url } from '../utils/baseUrl'; // Make sure you have base_url defined
import { UseAppContext } from '../utils/UseAppContext';

const ExpenseListWidget = () => {
    const { user } = UseAppContext();
    const [expenses, setExpenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            if (!user || !user.token) {
                setError('User is not authenticated.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${base_url}/api/expenses`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        // Handle unauthorized (e.g., token expired)
                        Alert.alert('Session expired', 'Please log in again.');
                        // Navigate to login if necessary
                    } else {
                        throw new Error('Failed to fetch expenses');
                    }
                }

                const data = await response.json();
                setExpenses(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching expenses:', error);
                setError('Failed to load expenses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
        const interval = setInterval(() => {
            console.log("Fetching transactions at interval");
            fetchExpenses();
        }, 10000); // fetch every 10 seconds
    }, [user]); // Include user in the dependency array to refetch when user changes

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ display: 'flex', justifyContent: 'center' }}>
                <Text style={styles.title}>Recent Expenses</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <ScrollView style={styles.scrollView}>
                    {expenses.length > 0 ? (
                        expenses.map((expense, index) => (
                            <ExpenseCard key={index} expense={expense} />
                        ))
                    ) : (
                        <Text style={styles.noExpenses}>No expenses found.</Text>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 320,
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fff', // Ensure background color for better readability
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollView: {
        marginTop: 10,
        width: '100%',
        maxHeight: 190,
        paddingBottom: 100,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    noExpenses: {
        textAlign: 'center',
        color: Colors.text,
        marginTop: 20,
    },
});

export default ExpenseListWidget;
