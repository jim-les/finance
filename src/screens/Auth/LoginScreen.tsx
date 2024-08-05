import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import login from "../../assets/login.png";
import { UseAppContext } from "../../utils/UseAppContext";
import { base_url } from "../../utils/baseUrl";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(false);
  const { setIsAuthenticated, setUser } = UseAppContext();  

  const validateEmail = (emailL: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLogin(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${base_url}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // email to smallcase
        body: JSON.stringify({ email: email, password: password }),
        credentials: 'include', // Include cookies in the request
      });

      const data = await response.json();
      console.log(data);
      if (data.status === 'success') {
        setIsAuthenticated(true);
        setUser(data);
        // navigation.navigate('Home');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLogin(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={login} style={styles.logo} />
      <Text style={styles.title}>Welcome Back</Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor= "rgb(30, 20, 100)"

      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          placeholderTextColor= "rgb(30, 20, 100)"

        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePasswordContainer}>
          <Text style={styles.togglePassword}>{passwordVisible ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.link}>
        Forgot Password?
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {isLogin ? <ActivityIndicator size="small" color="white" /> : "Login"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.signupLink}  onPress={() => navigation.navigate('Register')}>
        Don’t have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
});

export default LoginScreen;
