import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { base_url } from '../../utils/baseUrl';


const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation();
    const [isRegister, setIsRegister] = useState(false);

    const validateEmail = (emailL: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleRegister = async () => {
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        
        setErrorMessage('');
        setIsRegister(true);
        
        try {
            const response = await fetch(`${base_url}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
                credentials: 'include', // Include cookies in the request
            });

            const data = await response.json();

            if (data.status === 'success') {
                // No need to store token as cookies handle session
                setErrorMessage('Registration successful!');
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setIsRegister(false);
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={ styles.title }>Create Account</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor= "rgb(30, 20, 100)"
                    placeholder="Enter your name"
                />

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor= "rgb(30, 20, 100)"
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        secureTextEntry={!passwordVisible}
                        placeholderTextColor= "rgb(30, 20, 100)"
                    />

                    <TouchableOpacity style={styles.togglePasswordContainer} onPress={togglePasswordVisibility}>
                        <Text style={styles.togglePassword}>{passwordVisible ? "Hide" : "Show"}</Text>
                    </TouchableOpacity>
                </View>

                {/* password rules list */}
                <View style={styles.passwordRules}>
                    <Text style={styles.passwordRule}>- At least 6 characters long</Text>
                    <Text style={styles.passwordRule}>- At least one letter and one number</Text>
                    <Text style={styles.passwordRule}>- At least one special character</Text>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm your password"
                        secureTextEntry={!passwordVisible}
                        placeholderTextColor= "rgb(30, 20, 100)"
                    />
                </View>

                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text>{isRegister ? <ActivityIndicator size="small" color="white" /> : "Register"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signupLink}>Already have an account? Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    inputContainer: {
        width: "85%",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "rgb(30, 20, 100)",
    },
    label: {
        color: "rgb(30, 20, 100)",
        marginBottom: 10,

    },
    input: {
        height: 60,
        borderColor: "gray",
        borderWidth: 0,
        marginBottom: 25,
        paddingHorizontal: 25,
        borderRadius: 30,
        color: "blue",
        backgroundColor: "white",
        shadowColor: "rgba(0, 0, 0, .7)",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 30,
        elevation: 10,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
        position: "relative",
    },
    passwordInput: {
        flex: 1,
        height: 60,
        borderColor: "gray",
        borderWidth: 0,
        paddingHorizontal: 25,
        borderRadius: 30,
        color: 'rgb(30, 20, 100)',
        backgroundColor: "white",
        shadowColor: "rgba(0, 0, 0, .7)",
        shadowOffset: {
        width: 5,
        height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 30,
        elevation: 10,
    },
    togglePasswordContainer: {
        position: "absolute",
        right: 25,
    },
    togglePassword: {
        marginHorizontal: 10,
        color: "rgb(30, 20, 100)",
    },
    error: {
        color: "red",
        marginBottom: 20,
        textAlign: "center",
    },
    button: {
        backgroundColor: "rgb(30, 20, 100)",
        paddingVertical: 17,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    link: {
        marginVertical: 20,
        color: "rgb(30, 20, 100)",
        textAlign: "right",
    },
    signupLink: {
        marginTop: 15,
        color: "rgb(30, 20, 100)",
        textAlign: "center",
    },

    passwordRules: {
        marginBottom: 25,
        width: "100%",
        paddingLeft:20,
    },
    passwordRule: {
        color: 'rgb(30, 20, 100)',
        marginBottom: 10,
    },
});

export default RegisterScreen