import React from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index(){

    const [textMail, onChangeMail] = React.useState('')
    const [textPass, onChangePass] = React.useState('')
    const [showPass, setShowPass] = React.useState(false)
    
    const mockUser = {
        email: 'teste@gmail.com',
        password: 'teste123'
    }

    function handleLogin() {
        if(textMail === mockUser.email && textPass === mockUser.password) {
            Alert.alert('Sucesso', 'Login Realizado')
        }
        else {
            Alert.alert('Erro', 'Email ou Senha Incorretos')
        }
    }

    return (
        <View style={style.wrapper}>
            <View>

                <Image style={style.appLogo} source={require('../../assets/images/logo-app.png')}></Image>

            </View>

            <View style={style.container}>

                <Text style={style.subtitle}>Entre ou Crie sua Conta!</Text>

                <View style={style.emailField}>

                    <Text style={style.fieldText}>Email</Text>

                    <TextInput style={style.textInputField} onChangeText={onChangeMail} value={textMail} placeholder={'Insira aqui o seu Email'}></TextInput>

                </View>
                
                <View style={style.passwordField}>

                    <Text style={style.fieldText}>Senha</Text>

                    <View style={style.passwordView}>

                        <TextInput style={style.textInputField} onChangeText={onChangePass} value={textPass} placeholder={'Insira aqui a sua Senha'} secureTextEntry={!showPass}></TextInput>

                        <TouchableOpacity onPress={() => setShowPass(!showPass)} style={{marginTop: 15}}>
                            <Text>{showPass ? 'Ocultar Senha' : 'Ver Senha'}</Text>
                        </TouchableOpacity>

                    </View>
                    
                </View>
                
                <TouchableOpacity style={style.mainButton} onPress={handleLogin}>

                    <Text style={style.mainButtonText}>Log in</Text>

                </TouchableOpacity>

                <Text>Ainda não tem uma conta? Crie uma!</Text>

            </View>
        </View>
    )
}

const style = StyleSheet.create({

    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'black'
    },

    appLogo: {
        top: 30,
        alignSelf: 'center',
        height: 150,
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
        backgroundColor: '#f9f9f9',
        height: '79%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    subtitle: {
        fontSize: 38,
        fontWeight: '600',
        color: 'black',
        top: -80,
        textAlign: 'center'
    },

    fieldText: {
        alignSelf: 'flex-start',
        fontSize: 30,
        paddingBottom: 10
    },

    textInputField: {
        width: 300,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
    },

    emailField: {
        marginTop: -50,
        alignItems: 'center',
    },

    passwordField: {
        marginTop: 50,
        alignItems: 'center',
        marginBottom: 80
    },

    mainButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        height: 60,
        width: 300,
        backgroundColor: 'black',
        bottom: 30
    },

    mainButtonText: {
        fontSize: 20,
        color: 'white'
    },

    passwordView: {
        flexDirection: 'column',
        alignItems: 'center',
    }

})