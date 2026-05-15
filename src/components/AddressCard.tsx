import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { MaskService } from 'react-native-masked-text';
import Input from "./Input";
import Title from "./Title";

export const AddressCard = () => {
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState(""); // Aqui depois você pode usar um Picker/Select

    return (
        <View style={styles.container}>
            <Title style={styles.mainTitle} text="Endereço" />

            {/* CEP */}
            <Title style={styles.subtitle} text="Cep" />
            <Input 
                placeholder="00000-000" 
                value={cep} 
                onChangeText={(text) => {
                    const masked = MaskService.toMask('zip-code', text);
                    setCep(masked);
                }}
                keyboardType="numeric"
                maxLength={9}
            />

            {/* Logradouro */}
            <Title style={styles.subtitle} text="Logradouro" />
            <Input 
                placeholder="Ex: Rua das flores" 
                value={logradouro} 
                onChangeText={setLogradouro} 
            />

            {/* Número e Complemento Lado a Lado */}
            <View style={styles.row}>
                <View style={{ width: "30%" }}>
                    <Title style={styles.subtitle} text="número" />
                    <Input 
                        placeholder="Ex: 12" 
                        value={numero} 
                        onChangeText={setNumero} 
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ width: "65%" }}>
                    <Title style={styles.subtitle} text="Complemento" />
                    <Input 
                        placeholder="Ex: casa, bloco..." 
                        value={complemento} 
                        onChangeText={setComplemento} 
                    />
                </View>
            </View>

            {/* Bairro */}
            <Title style={styles.subtitle} text="Bairro" />
            <Input 
                placeholder="Ex: Centro" 
                value={bairro} 
                onChangeText={setBairro} 
            />

            {/* Cidade e UF Lado a Lado */}
            <View style={styles.row}>
                <View style={{ width: "70%" }}>
                    <Title style={styles.subtitle} text="Cidade" />
                    <Input 
                        placeholder="Ex: Caruaru" 
                        value={cidade} 
                        onChangeText={setCidade} 
                    />
                </View>
                <View style={{ width: "25%" }}>
                    <Title style={styles.subtitle} text="UF" />
                    {/* Por enquanto um input simples, depois você troca por um Select */}
                    <Input 
                        placeholder="UF" 
                        value={uf} 
                        onChangeText={setUf} 
                        maxLength={2}
                        autoCapitalize="characters"
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
        borderRadius: 15,
        padding: 20,
        gap: 10,
        marginTop: 20, // Espaço entre o card de cima e este
    },
    mainTitle: {
        fontSize: 24,
        color: "#FFF",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#f0f9ff",
        textAlign: "left",
        marginBottom: -5,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 5,
    }
});