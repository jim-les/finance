import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import Colors from '../../utils/Colors';
import { Picker } from '@react-native-picker/picker';
import Topbar from '../../components/Topbar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UseAppContext } from "../../utils/UseAppContext";
import {base_url} from '../../utils/baseUrl';

const categories = [
    'Recurring',
    'Groceries',
    'Food',
    'Fuel',
    'Travel',
    'Shopping',
    'Banking',
    'Others'
];

const AddExpenseScreen = () => {
    const { user } = UseAppContext();
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(user);
        
    }, []);

    const handleAddExpense = async () => {
        // Validate form inputs
        if (!amount || !category || !name || !date || !time) {
            Alert.alert('Please fill out all fields.');
            return;
        }
    
        try {
            setLoading(true);
            console.log(`${base_url}/api/expenses`);
            console.log(`Adding expense: ${name}, ${category}, ${amount}, ${date}`);
            const response = await fetch(`${base_url}/api/expenses`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, category, amount, date }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add expense');
            }
    
            // Clear form inputs upon successful submission
            setAmount('');
            setCategory('');
            setName('');
            setDate(new Date());
            setTime(new Date());
    
            Alert.alert('Expense added successfully!');
        } catch (error) {
            console.error('Error adding expense:', error);
            Alert.alert('An error occurred while adding expense. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(false);
        setTime(currentTime);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Topbar userName="Jimleston" />

            <Text style={styles.title}>Add Expense</Text>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Enter Amount</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    placeholderTextColor= "rgb(30, 20, 100)"

                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Select Category</Text>
                <Picker
                    style={styles.input}
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    <Picker.Item label="Select Category" value="" />
                    {categories.map((value, index) => (
                        <Picker.Item label={value} value={value} key={index} style={styles.input } />
                    ))}
                </Picker>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Enter Item</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter item"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor= "rgb(30, 20, 100)"

                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Select Date</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={{color: Colors.accent}}>{date.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="calendar"
                        onChange={onDateChange}
                        style={styles.input}
                    />
                )}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Select Time</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowTimePicker(true)}
                >
                    <Text style={{color: Colors.accent}}>{time.toLocaleTimeString()}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        display="default"
                        onChange={onTimeChange}
                        textColor='black'
                    />
                )}
            </View>

            <View style={styles.formGroup}>
                <TouchableOpacity onPress={handleAddExpense} style={styles.button}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>
                        {loading ? <ActivityIndicator color="#fff" /> : 'Add Expense'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        paddingBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.secondary,
        textAlign: 'center',
        marginVertical: 10,
    },
    formGroup: {
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 5,
    },
    input: {
        height: 60,
        borderColor: "gray",
        borderWidth: 0,
        marginBottom: 25,
        paddingHorizontal: 25,
        color: Colors.accent,
        tintColor: Colors.accent,
        backgroundColor: "white",
        shadowColor: "rgba(0, 0, 0, .7)",
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 8,
        elevation: 10,
    },
    picker: {
        backgroundColor: Colors.card,
        borderRadius: 5,
        height: 50,
    },
    button: {
        backgroundColor: Colors.secondary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default AddExpenseScreen;
