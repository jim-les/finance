import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../utils/Colors';
import { base_url } from '../utils/baseUrl';
import { UseAppContext } from '../utils/UseAppContext';

import angleRight from '../assets/angle-right-circle.png';
import AddIncomeModal from './AddIncomeModal';
import plus from '../assets/plus.png';

const MonthNavigation = () => {
    const monthList = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

    


    const handlePrevMonth = () => {
        setCurrentMonthIndex((prevIndex) => (prevIndex === 0 ? 11 : prevIndex - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonthIndex((prevIndex) => (prevIndex === 11 ? 0 : prevIndex + 1));
    };

    return (
        <View style={styles.mv_container}>
            <TouchableOpacity style={styles.mv_buttons} onPress={handlePrevMonth}>
                <Image source={angleRight} style={{ width: 34, height: 34, transform: [{ rotate: '180deg' }],  }} />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 14 }}>{monthList[currentMonthIndex]}</Text>
            <TouchableOpacity style={styles.mv_buttons} onPress={handleNextMonth}>
                <Image source={angleRight} style={{ width: 34, height: 34, transform: [{ rotate: '0deg' }] }} />
            </TouchableOpacity>
        </View>
    );
};

const ExpenseBalanceWidget = () => {
    const { user } = UseAppContext();
    const [ totalExpense, setTotalExpense ] = useState<string | null>('0.00');
    const [ totalIncome, setTotalIncome ] = useState<string | null>('0.00');


    useEffect(() => {
        try{
            const fetchCurrentMonth = async () => {
                const response = await fetch(`${base_url}/api/expenses`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
    
                const data = await response.json();
                setTotalExpense(data.reduce((acc: number, expense: any) => {
                    return acc + parseFloat(expense.amount);
                }, 0).toFixed(2));
            }
            fetchCurrentMonth();
            const interval = setInterval(() => {
                console.log("Fetching transactions at interval");
                fetchCurrentMonth();
            }, 100); // fetch every 10 seconds
    
            // Clear interval on component unmount
            return () => clearInterval(interval);
            
        } catch (error) {
            console.log(error);
        } finally {
            console.log('Done fetching');
        }
    }, []);

    useEffect(() => {
        try{
            const fetchIncome = async () => {
                const response = await fetch(`${base_url}/api/incomes`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
    
                const Incomedata = await response.json();
                console.log(Incomedata);
                setTotalIncome(Incomedata.reduce((acc: number, expense: any) => {
                    return acc + parseFloat(expense.amount);
                }, 0).toFixed(2));
            }
            fetchIncome();
            const interval = setInterval(() => {
                console.log("Fetching transactions at interval");
                fetchIncome();
            }, 100); // fetch every 10 seconds
    
            // Clear interval on component unmount
            return () => clearInterval(interval);
            
        } catch (error) {
            console.log(error);
        } finally {
            console.log('Done fetching');
        }
    }, []);

    return (
        <View style={styles.EBW_container}>
            <View style={styles.EBW_balance}>
                <Text style={styles.EBW_balanceLabel}>Balance</Text>
                <Text style={styles.EBW_balanceText}>{totalIncome}</Text>
            </View>
            <View style={styles.EBW_balance}>
                <Text style={styles.EBW_balanceLabel}>Expense</Text>
                <Text style={styles.EBW_balanceText}>{totalExpense}</Text>
            </View>
        </View>
    );
};

const HomeDashboard = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const [incomes, setIncomes] = useState<string | null>('0.00');
    
    const handleAddIncome = (newIncome) => {
        setIncomes([...incomes, newIncome]);
    };

    return (
        <View style={styles.container}>
        <View style={styles.DashboardWidget}>
            <Text style={{ fontSize: 18, color: '#fff' }}>Total Amount</Text>
            {/* <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Shs 3000</Text> */}
            <MonthNavigation />
            <ExpenseBalanceWidget />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={plus} style={{ width: 40, height: 40, borderWidth: 3, borderColor: 'white', borderRadius: 100, backgroundColor: "white"}} />
            </TouchableOpacity>
            <AddIncomeModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onAddIncome={handleAddIncome}
            />
        </View>
    </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 240,
        padding: 20,
        // backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Ensure background color for better readability

    },
    DashboardWidget: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 20,
        borderColor: Colors.primary,
        borderWidth: 3,
        position: 'relative',
    },
    mv_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        marginTop: 10,
        padding: 10,
    },
    mv_buttons: {
        backgroundColor: Colors.card,
        borderRadius: 8,
        paddingVertical: 0,
        paddingHorizontal: 10,
    },
    EBW_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        backgroundColor: Colors.primary,
        position: 'absolute',
        bottom: -35, // Adjusted position
        borderRadius: 12,
        elevation: 10,
    },
    EBW_balance: {
        alignItems: 'center',
        width: '50%',
    },
    EBW_balanceLabel: {
        color: '#fff',
        fontSize: 16,
    },
    EBW_balanceText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default HomeDashboard;
