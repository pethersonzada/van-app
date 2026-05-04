import React, { useState } from "react";
import { View, Text, StyleSheet, Image ,ScrollView, TextInput} from "react-native";
import Title from "../components/Title";
import Input from "../components/Input";

const Login= ()=>{

    const[email, setemail]=useState("");
    const[senha, setsenha]=useState("");

    return(
        <View style={styles.container}>

            <Image style={styles.logo} source={require("@/assets/images/logo.png")}/>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.containerCor}>
                <Title style={styles.login} text="Login"/>

                <Input placeholder={"E-mail"} value={email} onChangeText={(text)=>setemail(text)} keyboardType="email-address"/>

                <Input style={styles.senha} placeholder={"Senha"} value={senha} onChangeText={(text)=>setsenha(text)} keyboardType="default"/>



            </View>
            </ScrollView>
        </View>
    )


};
const styles=StyleSheet.create({
container:{
    flex: 1,
    paddingTop:50,
    backgroundColor:"#ffffff",
    alignItems:"center",
},
logo:{
    width:200,
    height:200,
    marginTop: 100,
},
scroll:{
    width:"100%"
},
containerCor:{
    flex: 1,
    alignItems:"center",
    width:"100%",
    height:"100%",
    backgroundColor:"#9AAFC2",
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    padding: 30,
},
login:{
    marginBottom:40

},
senha:{
    marginTop:30,
}

});
export default Login