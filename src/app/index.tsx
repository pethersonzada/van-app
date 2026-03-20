import React from 'react';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { mockUser } from '../mock/user';

export default function Index() {

    const [textMail, onChangeMail] = React.useState('')
    const [textPass, onChangePass] = React.useState('')
    const [showPass, setShowPass] = React.useState(false)

    function handleLogin() {
        if (textMail === mockUser.email && textPass === mockUser.password) {
            Alert.alert('Sucesso', 'Login Realizado')
        }
        else {
            Alert.alert('Erro', 'Email ou Senha Incorretos')
        }
    }

    return (
        <View style={style.wrapper}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Image style={style.appLogo} source={require('../../assets/images/logo-app.png')} />

            </View>

            <View style={style.container}>

                <Text style={style.subtitle}>Entre ou crie sua conta!</Text>

                <View style={{ gap: 40 }}>

                    <View style={style.fieldContainer}>

                        <Text style={style.fieldText}>Email</Text>

                        <View style={style.inputWrapper}>
                            <Ionicons name='mail' size={20} color='black' style={style.inputIcon} />

                            <TextInput style={style.textInputField} onChangeText={onChangeMail} value={textMail} placeholder={'Insira aqui o seu Email'}></TextInput>
                        </View>


                    </View>

                    <View style={style.fieldContainer}>

                        <Text style={style.fieldText}>Senha</Text>

                        <View style={style.inputWrapper}>

                            <Ionicons name='lock-closed' size={20} color='black' style={style.inputIcon} />
                            <TextInput style={style.textInputField} onChangeText={onChangePass} value={textPass} placeholder={'Insira aqui a sua Senha'} secureTextEntry={!showPass}></TextInput>

                            <TouchableOpacity style={style.eyeIcon} onPress={() => setShowPass(!showPass)}>
                                <Ionicons name={showPass ? 'eye-off' : 'eye'} size={24} color="black"
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'space-between' }}>
                    <Button label="Log In" onPress={handleLogin} />
                    <Text style={{ textAlign: 'center', margin: 15 }}>Ainda não tem uma conta? Crie uma!</Text>
                </View>


            </View>
        </View>
    )
}

const style = StyleSheet.create({

    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center'
    },

    appLogo: {
        height: 100,
        width: 150
    },

    /**
 
    title: {
        fontSize: 40,
        fontWeight: '600',
        color: 'white',
        top: 80,
        alignSelf: 'center'
    },

    **/

    container: {
        backgroundColor: '#f5f5f5',
        height: '79%',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'space-between',
        paddingTop: 80,
        paddingBottom: 80,
        alignItems: 'center',
        gap: 30
    },

    subtitle: {
        fontSize: 40,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },

    fieldText: {
        alignSelf: 'flex-start',
        fontSize: 20,
        marginBottom: 15
    },

    textInputField: {
        width: '85%',
        height: 55,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingLeft: 45
    },

    fieldContainer: {
        alignItems: 'center',
        width: '85%'
    },

    inputWrapper: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },

    eyeIcon: {
        position: 'absolute',
        right: 15,
    },

    inputIcon: {
        position: 'absolute',
        left: 15,
        zIndex: 1
    }

})