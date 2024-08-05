import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import Topbar from '../../components/Topbar';
import { base_url } from '../../utils/baseUrl'; // Make sure to import your base_url
import { UseAppContext } from '../../utils/UseAppContext'; // Import your context hook

const categories = [
    'All', 'Recurring', 'Groceries', 'Food', 'Fuel', 'Travel',
    'Shopping', 'Banking', 'Others'
];

const StatisticsScreen = () => {
    const { user } = UseAppContext(); // Use your app context to get the user token
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`${base_url}/api/expenses`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setExpenses(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchExpenses();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{color: "gray"}}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    }

    // Filter and summarize expenses
    const filteredExpenses = selectedCategory === 'All'
        ? expenses
        : expenses.filter(expense => expense.category === selectedCategory);

    const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const pieData = categories.map(category => {
        const total = expenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
        return {
            name: category,
            value: total,
            color: getColorForCategory(category),
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        };
    }).filter(data => data.value > 0);

    const barData = {
        labels: categories,
        datasets: [
            {
                data: categories.map(category => {
                    return expenses
                        .filter(expense => expense.category === category)
                        .reduce((sum, expense) => sum + expense.amount, 0);
                })
            }
        ]
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Topbar userName="Statistics" />
            <Text style={styles.title}>Expense Statistics</Text>
            <View style={styles.pickerContainer}>
                <Text style={{color: 'gray'}}>Select Category:</Text>
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                    {categories.map((category) => (
                        <Picker.Item label={category} value={category} key={category} />
                    ))}
                </Picker>
            </View>
            <Text>Total Expenses: {totalAmount}</Text>
            <Text style={styles.chartTitle}>Pie Chart</Text>
            <PieChart
                data={pieData}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={chartConfig}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
            <Text style={styles.chartTitle}>Bar Chart</Text>

            <ScrollView horizontal style={{paddingHorizontal: 20}}>
                <BarChart
                    data={barData}
                    width={750}
                    height={300}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    fromZero
                    yAxisLabel="Ksh"
                    yAxisSuffix="k"
                />
            </ScrollView>
        </ScrollView>
    );
};

// Utility function to get color for each category
const getColorForCategory = (category: string): string => {
    switch (category) {
        case 'Groceries': return '#FF6384';
        case 'Food': return '#36A2EB';
        case 'Fuel': return '#FFCE56';
        case 'Travel': return '#4BC0C0';
        case 'Shopping': return '#9966FF';
        case 'Banking': return '#FF9F40';
        case 'Recurring': return '#C9CBCF';
        case 'Others': return '#F3A4B5';
        default: return '#000000';
    }
};

// Chart configuration
const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
    },
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        paddingBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    picker: {
        height: 60,
        width: 100,
        marginHorizontal: 20,
        borderColor: 'gray',
        borderWidth: 0,
        paddingHorizontal: 1,
        borderRadius: 30,
        color: 'blue',
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, .7)',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 30,
        elevation: 10,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default StatisticsScreen;
