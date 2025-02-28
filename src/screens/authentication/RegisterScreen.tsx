import { Button, Input } from "@components";
import { usePopOutAnimation } from "@hooks";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useAuth } from "state/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const { scale, opacity } = usePopOutAnimation();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleRegister = async (values: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      await register(values.email, values.password, values.username);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.registerContainer}>
        <Animated.Image
          source={require("@icons/register-icon.png")}
          style={[styles.registerIconStyle, animatedStyle]}
        />

        <Formik
          initialValues={{ email: "", password: "", username: "" }}
          validationSchema={registerSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Input
                style={[
                  styles.input,
                  errors.email && touched.email && styles.inputErrorStyle,
                ]}
                placeholder="Email"
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorTextStyle}>{errors.email}</Text>
              )}

              <Input
                style={[
                  styles.input,
                  errors.username && touched.username && styles.inputErrorStyle,
                ]}
                placeholder="Username"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
              />
              {errors.username && touched.username && (
                <Text style={styles.errorTextStyle}>{errors.username}</Text>
              )}

              <Input
                style={[
                  styles.input,
                  errors.password && touched.password && styles.inputErrorStyle,
                ]}
                placeholder="Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorTextStyle}>{errors.password}</Text>
              )}

              <Button
                styling={{ button: styles.buttonStyle }}
                title="Sign Up"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#f8f9fa",
  },
  registerContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  input: {
    width: "80%",
    height: 50,
  },
  buttonStyle: {
    width: "80%",
  },
  registerIconStyle: {
    height: "20%",
    marginBottom: "5%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  inputErrorStyle: {
    borderColor: "red",
  },
  errorTextStyle: {
    color: "red",
    fontSize: 14,
    marginTop: "-2.5%",
    alignSelf: "flex-start",
    marginLeft: "10%",
  },
});

export default RegisterScreen;
