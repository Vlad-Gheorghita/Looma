import { Button, Input } from "@components";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "state/AuthContext";
import GoogleIcon from "@icons/google-icon.svg";
import { usePopOutAnimation } from "@hooks";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Formik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const { scale, opacity } = usePopOutAnimation();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleLogin = async (values: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      await login({
        loginType: "email_and_password",
        email: values.email,
        password: values.password,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      await login({ loginType: "google" });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.loginContainer}>
        <Animated.Image
          source={require("@icons/login-icon.png")}
          style={[styles.loginIconStyle, animatedStyle]}
        />

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
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

              <View style={{ alignSelf: "flex-end", marginRight: "10%" }}>
                <Text>Forgot your password?</Text>
              </View>

              <View style={styles.buttonContainerStyle}>
                <Button
                  styling={{ button: styles.buttonStyle }}
                  title="Log In"
                  onPress={handleSubmit}
                />
                <Button
                  icon={<GoogleIcon />}
                  styling={{ button: [styles.buttonStyle, { width: "15%" }] }}
                  onPress={handleGoogleLogin}
                />
              </View>
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
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  input: {
    width: "80%",
    height: 50,
  },
  buttonContainerStyle: {
    flexDirection: "row",
    gap: 15,
  },
  buttonStyle: {
    width: "40%",
  },
  loginIconStyle: {
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

export default LoginScreen;
