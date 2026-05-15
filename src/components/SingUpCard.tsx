import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { MaskService } from 'react-native-masked-text';
import Input from "./Input";
import Title from "./Title";
export const SingUpCard = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [telefone, setTelefone] = useState("");

    const handleSignUp = () => {

    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha || !dataNasc || !telefone) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        Alert.alert("Erro", "O e-mail digitado não é válido.");
        return;
    }
    if (senha.length < 8) {
        Alert.alert("Erro", "A senha precisa ter no mínimo 8 caracteres.");
        return;
    }
    if (senha !== confirmarSenha) {
        Alert.alert("Erro", "As senhas não coincidem.");
        return;
    }

    if (dataNasc.length < 10) {
        Alert.alert("Erro", "Preencha a data de nascimento completa.");
        return;
    }

    if (telefone.length < 14) {
        Alert.alert("Erro", "Preencha o telefone completo.");
        return;
    }

    const [dia, mes, ano] = dataNasc.split('/');
    const dataFormatadaBanco = `${ano}-${mes}-${dia}`;
    const telefoneNumeros = telefone.replace(/\D/g, '');
    const usuarioFinal = {
        nome: nome.trim(),
        email: email.toLowerCase().trim(),
        senha: senha, // Enviando a senha
        data_nascimento: dataFormatadaBanco,
        telefone: telefoneNumeros,
        data_cadastro: new Date().toISOString()
        
    };
    console.log("Enviando tudo para o banco:", usuarioFinal);
    Alert.alert("Sucesso", "Dados prontos para o envio!");
};


    return (
        <View style={styles.container}>
            <Title style={styles.title} text="Informações Pessoais" />
            <Title style={styles.subtitle}text="Nome Completo"/>
            <Input 
                placeholder="Ex:João Silva" 
                value={nome} 
                onChangeText={setNome} 
            />
            <Title style={styles.subtitle}text="E-mail"/>
            <Input 
                placeholder="Ex:Seuemail@email.com" 
                value={email} 
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Title style={styles.subtitle}text="Senha"/>
            <Input 
                placeholder="Mínimo 8 caracteres" 
                value={senha} 
                onChangeText={setSenha}
                secureTextEntry={true} 
            />
            <Title style={styles.subtitle}text="Confirme sua senha"/>
            <Input 
                placeholder="Repita sua senha" 
                value={confirmarSenha} 
                onChangeText={setConfirmarSenha}
                secureTextEntry={true} 
            />
            <View style={styles.rowtitle}><Title style={styles.subtitlerow}text="Data de nascimento"/>
            <Title style={styles.subtitlerow}text="Telefone"/></View>
            
            <View style={styles.row}>
                <View style={styles.halfInput}>
                    <Input 
                        placeholder="DD/MM/AAAA" 
                        value={dataNasc} 
                        onChangeText={(text) => {
                            const masked = MaskService.toMask('datetime', text, { format: 'DD/MM/YYYY' });
                            setDataNasc(masked);
                        }}
                        keyboardType="numeric"
                        maxLength={10}
                    />
                </View>

                <View style={styles.halfInput}>
                    <Input 
                        placeholder="(xx) xxxx-xxxx" 
                        value={telefone} 
                        onChangeText={(text) => {
                            
                            const masked = MaskService.toMask('cel-phone', text, {
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            });
                            setTelefone(masked);
                        }}
                        keyboardType="phone-pad"
                        maxLength={15}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        backgroundColor: "#354d62",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        padding: 15,
        gap: 15,
    },
    title: {
        fontSize: 24,
        color: "#FFF",
        marginBottom: 10,
    },
    subtitle:{
        fontSize:20,
        textAlign:"left",
        padding:5,
        margin:-15
    },
    subtitlerow: {
    fontSize: 16,
    color: "#FFF",
    width: "50%", // Mesma largura do halfInput
    textAlign: "left",
    marginBottom:-5
},
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    rowtitle: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        gap:2
    },
    halfInput: {
        width: "48%",
    }
});