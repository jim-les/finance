import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Topbar from '../../components/Topbar';
import Colors from '../../utils/Colors';
import ExpenseCard from '../../components/ExpenseCard';
import expense from '../../assets/expense.png';
import { base_url } from '../../utils/baseUrl';
import { UseAppContext } from "../../utils/UseAppContext";



// Define the Transaction type
type Transaction = {
    name: string;
    category: string;
    amount: number;
    date: string;
};

// Categories and sample transactions
const categories = [
    'All', 'Recurring', 'Groceries', 'Food', 'Fuel', 'Travel',
    'Shopping', 'Banking', 'Others'
];

const TransactionScreen = () => {
    const { user } = UseAppContext();
    console.log("Fetching transactions for user: ", user);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredTransactions = transactions.filter(
        transaction => selectedCategory === 'All' || transaction.category === selectedCategory
    );

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${base_url}/api/expenses`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }

                const data = await response.json();
                console.log(data);
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching Transactions:', error);
                Alert.alert('Error', 'Failed to fetch transactions. Please try again later.');
            }
        };

        fetchTransactions();
        // Set up polling
        const interval = setInterval(() => {
            console.log("Fetching transactions at interval");
            fetchTransactions();
        }, 10000); // fetch every 10 seconds

        // Clear interval on component unmount
        return () => clearInterval(interval);
        
    }, [user]); // Include token in dependency array to re-fetch transactions on token change


    return (
        <View style={styles.container}>
            <Topbar userName="Jimleston" />

            <View style={styles.calendarWidget}>
                <Image source={expense} style={{width: '100%', height: '100%'}}/>
            </View>

            {/* Horizontal ScrollView for categories */}
            <ScrollView 
                horizontal={true} 
                style={styles.scrollView} 
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}  
            >
                {categories.map((category, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[
                            styles.categoryBox, 
                            selectedCategory === category && styles.selectedCategoryBox
                        ]}
                        onPress={() => handleCategoryPress(category)}
                    >
                        <Text style={[
                            styles.categoryText, 
                            selectedCategory === category && styles.selectedCategoryText
                        ]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.transactionsContainer}>
                <Text style={styles.transactionTitle}>Transactions</Text>
                <ScrollView style={{minHeight: '75%', maxHeight: '76%'}}>
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction, index) => (
                            <ExpenseCard key={index} expense={transaction} />
                        ))
                    ) : (
                        <Text style={styles.noTransactionText}>No transactions available</Text>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: Colors.background,
    },
    calendarWidget: {
        width: '100%',
        height: 150,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        marginVertical: 10,
    },
    scrollView: {
        flexDirection: 'row',
        height: 40,
    },
    categoryBox: {
        paddingHorizontal: 20,
        marginHorizontal: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginVertical: 10,
    },
    selectedCategoryBox: {
        // backgroundColor: Colors.primary,
    },
    categoryText: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    selectedCategoryText: {
        color: Colors.primary,
    },
    transactionsContainer: {
        marginTop: 20,
        minHeight: 440,
    },
    transactionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.accent,
        marginBottom: 10,
    },
    transaction: {
        padding: 10,
        backgroundColor: Colors.card,
        borderRadius: 10,
        marginBottom: 10,
    },
    transactionText: {
        fontSize: 14,
        color: 'black',
    },
    noTransactionText: {
        textAlign: 'center',
        fontSize: 14,
        color: 'grey',
    },
});

export default TransactionScreen;
