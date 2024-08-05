import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../utils/Colors';
import { base_url } from '../utils/baseUrl';
import { UseAppContext } from '../utils/UseAppContext';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddIncomeModalProps {
    visible: boolean;
    onClose: () => void;
    onAddIncome: (income: any) => void;
}

const AddIncomeModal = ({ visible, onClose, onAddIncome }: AddIncomeModalProps) => {
    const { user } = UseAppContext();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState((new Date()));
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    

    const handleAddIncome = async () => {
        const incomeData = { name, amount: parseFloat(amount), date };
        setLoading(true);
        const response = await fetch(`${base_url}/api/incomes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify(incomeData),
        });

        if (response.ok) {
            const newIncome = await response.json();
            onAddIncome(newIncome);
            onClose();
        } else {
            console.error('Failed to add income');
        }
        setLoading(false);
    };

    const onDateChange = ( event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}

        >
                <View style={styles.modalView}>
                {loading ? (
                    <View>
                        <ActivityIndicator size="large" color={Colors.primary} /> 
                        <Text style={styles.modalTitle}>sending Data...</Text>  
                    </View>
                ) : (
                    <>
                    
                        <Text style={styles.modalTitle}>Add Income</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Income Name"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor={"gray"}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Amount"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholderTextColor={"gray"}

                        />
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={{color: 'blue'}}>{date.toDateString()}</Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                        )}
                        <TouchableOpacity style={styles.button} onPress={handleAddIncome}>
                            <Text style={styles.buttonText}>Add Income</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </>
                )}  
                </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: Colors.primary,
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 8,
        color: "blue"
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
});

export default AddIncomeModal;
