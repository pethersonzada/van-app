import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MaskService } from 'react-native-masked-text';
import Input from "./Input";
import Title from "./Title";

export const VehicleCard = ({ onDataChange }: any) => {
    const [placa, setPlaca] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [ano, setAno] = useState("");
    const [capacidade, setCapacidade] = useState("");

    
    useEffect(() => {
        onDataChange({
            placa,
            marca,
            modelo,
            ano,
            capacidade
        });
    }, [placa, marca, modelo, ano, capacidade]);

    return (
        <View style={styles.container}>
            <Title style={styles.mainTitle} text="Informações da Van/ônibus" />

            <Title style={styles.subtitle} text="Placa" />
            <Input 
                placeholder="ABC1D23" 
                value={placa} 
                onChangeText={(text) => {
                    const formatada = text.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 7);
                    setPlaca(formatada);
                }}
                autoCapitalize="characters"
                maxLength={7} 
            />

            <Title style={styles.subtitle} text="Marca" />
            <Input 
                placeholder="Ex: Mercedes-benz" 
                value={marca} 
                onChangeText={setMarca}
                keyboardType="default"
                autoCapitalize="sentences"
            />

            <Title style={styles.subtitle} text="Modelo" />
            <Input 
                placeholder="Ex: Sprinter" 
                value={modelo} 
                onChangeText={setModelo}
                keyboardType="default"
                autoCapitalize="none"
            />

            <View style={styles.row}>
                <View style={{ width: "48%" }}>
                    <Title style={styles.subtitleSmall} text="Ano" />
                    <Input 
                        placeholder="Ex: 2020" 
                        value={ano} 
                        onChangeText={setAno}
                        keyboardType="numeric"
                        maxLength={4}
                    />
                </View>
                <View style={{ width: "48%" }}>
                    <Title style={styles.subtitleSmall} text="Capacidade" />
                    <Input 
                        placeholder="Ex: 20 passageiros" 
                        value={capacidade} 
                        onChangeText={setCapacidade}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        backgroundColor: "#9aafc2",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 15,
        padding: 15,
        gap: 15,
        marginTop:20,
    },
    mainTitle: {
        fontSize: 30,
        color: "#F0f9ff",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: "#f0f9ff",
        textAlign: "left",
        padding:5,
        marginBottom: -8,
    },
    subtitleSmall: {
        fontSize: 20,
        color: "#f0f9ff",
        textAlign: "left",
        marginBottom: 10,
        paddingHorizontal:5
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 5,
        marginBottom:8
    }
});