import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import {Shadow} from "react-native-shadow-2";
type InputProps={
    placeholder:string;
    value:string;
    onChangeText:(text:string)=>void;
    secureTextEntry?:boolean;
    style?:any;
    keyboardType?:"default"|"email-address"|"numeric";
    autoCapitalize?:"none"|"sentences"|"words"|"characters";
    onSubmitEditing?:()=>void;
};
const Input=({placeholder, value, onChangeText, secureTextEntry, keyboardType,autoCapitalize,onSubmitEditing, style}: InputProps)=>{
    return (
        <Shadow distance={8}
                startColor={"#59748c90"} 
                offset={[0,4]} 
                stretch={true} 
                containerStyle={[{width:"100%"}, style]}>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder} placeholderTextColor={"#59748c"}
                    value={value} 
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onSubmitEditing={onSubmitEditing}
                />
            </View>
        </Shadow>
    );
};

const styles=StyleSheet.create({

    container:{
        width: "100%",
        height: 50,
        backgroundColor:"#f0f9ff",
        borderRadius:15,
        paddingHorizontal:10,
        justifyContent:"center",
    },
    input:{
        fontFamily:"Lato",
        padding:10,
        fontSize:20,
        color:"#59748c",
        width:"100%", 
    },
});

export default Input;