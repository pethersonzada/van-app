import React, { useState } from "react";
import { View, Text, StyleSheet, Image ,ScrollView, TouchableOpacity,KeyboardAvoidingView, Platform} from "react-native";
import Title from "../components/Title";
import { SegmentedControl } from "../components/segmentedcontrol";
import {SingUpCard} from "../components/SingUpCard";
import { AddressCard } from "../components/AddressCard";
const SingUp=()=>{

    const [tipo, setTipo] = useState("Passageiro");

    return(
        <KeyboardAvoidingView style={styles.keyboardavoiding} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView><View style={styles.container}>
            <Title style={styles.title} text=" Cadastro "/>
            <Title style={styles.subTitle} text=" Quem é você na van? "/>
            <SegmentedControl 
                opcoes={["Passageiro", "Motorista"]} 
                selecionado={tipo} 
                onChange={setTipo} 
            />

            {tipo === "Passageiro" ? (
                <>
                <SingUpCard />
                <AddressCard />
                </>
            ) : (
                <Text>Campos do Motorista (Placa, Van, etc)...</Text>
            )}
        </View>
        </ScrollView>
        </KeyboardAvoidingView>

    );
}
const styles=StyleSheet.create({
    keyboardavoiding:{
        flex:1
    },
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