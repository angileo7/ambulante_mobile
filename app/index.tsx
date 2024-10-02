import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';
import {  useNavigation } from 'expo-router';

import { colors } from '../Components/colors';
const { primary } = colors;

// custom components
import MainContainer from '../Components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../Components/Containers/KeyboardAvoidingContainer';
import RegularText from '../Components/Texts/RegularText';
import StyledTextInput from '../Components/Inputs/StyledTextInput';
import MsgBox from '../Components/Texts/MsgBox';
import RegularButton from '../Components/Buttons/RegularButton';
import PressableText from '../Components/Texts/PressableText';
import RowContainer from '../Components/Containers/RowContainer';
import { showMessage } from 'react-native-flash-message';
import { useAuthFacade } from '../store/auth/useAuthFacade';

const Login = () => {
  const navigation = useNavigation()
  const { login, loading, success, error, resetStore } = useAuthFacade();
  const [message, setMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  useEffect(() => {
    resetStore();

    if (success) {
        showMessage({ message: 'User Registered Successfully', type: 'success' });
       // setTimeout(() => navigation.replace('LoginScreen'), 2000);
    }

    if (error) {
        showMessage({ message: error, type: 'success' });
    }
}, [error, navigation, resetStore, success])

  const moveTo = (screen, payload) => {
    navigation.navigate(screen, { ...payload });
  };

  const handleLogin = async (credentials, setSubmitting) => {
    try {
      setMessage(null);
      // call backend
       login(credentials); 
      // move to next page
        //moveTo('order');
   //     navigation.navigate('dashboard');
      setSubmitting(false);
    } catch (error) {
      setMessage('Login failed: ' + error.message);
      setSubmitting(false);
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <RegularText style={{ marginBottom: 25 }}>Enter your account credentials</RegularText>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            if (values.email == '' || values.password == '') {
              setMessage('Please fill in all fields');
              setSubmitting(false);
            } else {
              handleLogin(values, setSubmitting);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
            <>
              <StyledTextInput
                label="Email Address"
                icon="email-variant"
                placeholder="walt14@gmail.com"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={{ marginBottom: 25 }}
              />

              <StyledTextInput
                label="Password"
                icon="lock-open"
                placeholder="* * * * * * * *"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                isPassword={true}
                style={{ marginBottom: 25 }}
              />

              <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                {message || ' '}
              </MsgBox>
              {!isSubmitting && <RegularButton onPress={handleSubmit}>Login</RegularButton>}
              {isSubmitting && (
                <RegularButton disabled={true}>
                  <ActivityIndicator size="small" color={primary} />
                </RegularButton>
              )}

              <RowContainer>
                <PressableText onPress={() => {moveTo('Signup')}}>New account sign up</PressableText>
                <PressableText onPress={() => {moveTo('ForgotPassword')}}>Forgot Password</PressableText>
              </RowContainer>
            </>
          )}
        </Formik>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default Login;
