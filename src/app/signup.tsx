import React, { useState } from "react";
import { View, Text, StyleSheet, Image ,ScrollView, KeyboardAvoidingView, Platform, Alert} from "react-native";
import Title from "../components/Title";
import { Button } from "../components/Buttonn";
import { SegmentedControl } from "../components/segmentedcontrol";
import {SingUpCard} from "../components/SingUpCard";
import { AddressCard } from "../components/AddressCard";
import { VehicleCard } from "../components/VehicleCard";
import {router} from "expo-router";
const SingUp=()=>{
    const [dadosPessoais, setDadosPessoais] = useState<any>({});
    const [dadosEndereco, setDadosEndereco] = useState<any>({});
    const [dadosVeiculo, setDadosVeiculo] = useState<any>({});

    const handleSignUp = () => {
    
    const { nome, email, senha, confirmarSenha, dataNasc, telefone } = dadosPessoais;
    const { cep, logradouro, numero, bairro, cidade, uf } = dadosEndereco;

    
    if (!nome?.trim() || !email?.trim() || !senha || !confirmarSenha || !dataNasc || !telefone) {
        Alert.alert("Erro", "Preencha todas as Informações Pessoais.");
        return;
    }

    if (senha !== confirmarSenha) {
        Alert.alert("Erro", "As senhas não coincidem.");
        return;
    }

    if (senha.length < 8) {
        Alert.alert("Erro", "A senha deve ter no mínimo 8 caracteres.");
        return;
    }

    if (!cep?.trim() || !logradouro?.trim() || !numero?.trim() || !bairro?.trim() || !cidade?.trim() || !uf) {
        Alert.alert("Erro", "Preencha todos os campos do Endereço.");
        return;
    }

    if (cep.length < 9) {
        Alert.alert("Erro", "O CEP está incompleto.");
        return;
    }
    if (tipo === "Motorista") {
    const { placa, marca, modelo } = dadosVeiculo;
    if (!placa || !marca || !modelo) {
        Alert.alert("Erro", "Preencha as informações do veículo.");
        return;
        }
    }

  
    
   
    const [dia, mes, ano] = dataNasc.split('/');
    const dataNascBanco = `${ano}-${mes}-${dia}`;

    const usuarioFinal = {
        tipo_usuario: tipo,
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        senha: senha,
        data_nascimento: dataNascBanco,
        telefone: telefone.replace(/\D/g, ''),
        endereco: {
            cep: cep.replace(/\D/g, ''), 
            logradouro: logradouro.trim(),
            numero: numero.trim(),
            complemento: dadosEndereco.complemento?.trim() || "",
            bairro: bairro.trim(),
            cidade: cidade.trim(),
            uf: uf
        },
        data_cadastro: new Date().toISOString()
    };

    console.log("CADASTRO COMPLETO PARA O BANCO:", usuarioFinal);
    Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    
    router.push("/home");
};
    
    

    const [tipo, setTipo] = useState("Passageiro");

    return(
        <KeyboardAvoidingView style={styles.keyboardavoiding} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView>
            <View style={styles.container}>
            <Title style={styles.title} text=" Cadastro "/>
            <Title style={styles.subTitle} text=" Quem é você na van? "/>
            <SegmentedControl 
                opcoes={["Passageiro", "Motorista"]} 
                selecionado={tipo} 
                onChange={setTipo} 
            />

            {tipo === "Passageiro" ? (
                
                <>
                <SingUpCard onDataChange={setDadosPessoais} />
                <AddressCard onDataChange={setDadosEndereco} />
                <Button style={styles.button}title="Finalizar cadastro" onPress={handleSignUp}/>
                </>
            ) : (
                <>
                <SingUpCard onDataChange={setDadosPessoais} />
                <AddressCard onDataChange={setDadosEndereco} />
                <VehicleCard onDataChange={setDadosVeiculo}/>
                <Button style={styles.button}title="Finalizar cadastro" onPress={handleSignUp}/>
                </>
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
        backgroundColor:"#ffffff",
        alignItems:"center",

    },
    title:{
        marginTop:80,
        color:"#f0f9ff",
        
    },
    subTitle:{
        marginVertical:15,
        fontSize:24,
        color:"#f0f9ff"
    },
    button:{
        marginTop:20,
        width:380,
        marginBottom:50

    }

});
export default SingUp;