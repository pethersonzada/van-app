import React, { useState } from "react";
import { View, Text, StyleSheet, Image ,ScrollView, TouchableOpacity,KeyboardAvoidingView, Platform} from "react-native";
import Title from "../components/Title";
import { SegmentedControl } from "../components/segmentedcontrol";
import Input from "../components/Input";
import {Button} from "../components/Buttonn";
import {SocialButton} from "../components/SocialButton";
import {useRouter} from "expo-router";

const SingUp=()=>{

    const [tipo, setTipo] = useState('Passageiro');

    return(
        <View style={styles.container}>
            <Title style={styles.title} text=" Cadastro "/>
            <Title style={styles.subTitle} text=" Quem é você na van? "/>
            <SegmentedControl 
                opcoes={['Passageiro', 'Motorista']} 
                selecionado={tipo} 
                onChange={setTipo} 
            />

            {tipo === 'Passageiro' ? (
                <Text>Campos do Passageiro...</Text>
            ) : (
                <Text>Campos do Motorista (Placa, Van, etc)...</Text>
            )}
        </View>

    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#9AAFC2",
        alignItems:"center",

    },
    title:{
        marginTop:80,
    },
    subTitle:{
        marginVertical:15,
        fontSize:24,
    }

});
export default SingUp;