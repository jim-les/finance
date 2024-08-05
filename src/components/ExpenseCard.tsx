import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react';
import Color from '../utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Recuring from '../assets/recuring.png';
import Groceries from '../assets/groceries.png';
import Food from '../assets/food2.png';
import Fuel from '../assets/fuel2.png';
import Travel from '../assets/travel2.png';
import Shopping from '../assets/shopping.png';
import Banking from '../assets/banking.png';
import Others from '../assets/others.png';


interface Expense {
    expense: { 
        name: string,
        date: string,
        amount: number,
        category: any,
    },
}
    

const ExpenseCard = ({expense}: Expense) => {
    const [image, setImage] = React.useState(Recuring);

    // switch between the images as per the category
    React.useEffect(() => {
        switch (expense.category) {
            case 'Recurring':
                setImage(Recuring);
                break;
            case 'Groceries':
                setImage(Groceries);
                break;
            case 'Food':
                setImage(Food);
                break;
            case 'Fuel':
                setImage(Fuel);
                break;
            case 'Travel':
                setImage(Travel);
                break;
            case 'Shopping':
                setImage(Shopping);
                break;
            case 'Banking':
                setImage(Banking);
                break;
            case 'Others':
                setImage(Others);
                break;
            default:
                setImage(Others);
        }
    }, [expense.category]);


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.card_left_side}>
                    <View style={styles.icon}>
                        <Image source={image} style={{width: 30, height: 30}} />
                    </View>

                    <View style={styles.details}>
                        <Text style={styles.title}>{expense.name}</Text>
                        <Text style={styles.date}>{expense.date}</Text>
                    </View>
                </View>

                <View style={styles.card_right_side}>
                    <Text style={styles.amount}>{expense.amount}</Text>
                    <Icon name="edit" size={20} color={Color.primary} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: 100,
        // padding: 20,
        // marginBottom: 20,
        color: '#000',
        borderRadius: 10,
        paddingVertical: 3,
    },
    card: {
        backgroundColor: Color.card,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        elevation: 2,
        borderRadius: 10,
    },

    card_left_side: {
        flexDirection: 'row',
        gap: 20,
    },

    icon: {
        width: 50,
        height: 50,
        backgroundColor: Color.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(30, 20, 100)',
        paddingBottom: 10,
    },

    card_right_side: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    },

    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(30, 20, 100)',
        marginVertical: 10,

    },
    date: {
        fontSize: 14,
        color: '#000',
    },
    category: {
        fontSize: 14,
        color: '#000',
    },
})

export default ExpenseCard