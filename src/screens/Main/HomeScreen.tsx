// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../../assets/logo.png';

// import components
import Topbar from '../../components/Topbar';
import HomeDashboard from '../../components/HomeDashboard';
import CategoriesWidget from '../../components/CategoriesWidget';
import ExpenseListWidget from '../../components/ExpenseListWidget';

const HomeScreen: React.FC = () => {
    
    return (
        <View style={styles.container}>
            <Topbar userName="Jimleston" />

            {/* dashboard widget */}
            <HomeDashboard />

            {/* categories widget */}
            <CategoriesWidget />
                
            {/* expenses list widget */}
            <ExpenseListWidget />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
});

export default HomeScreen;
