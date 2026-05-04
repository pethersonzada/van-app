import { Stack } from 'expo-router';
import { useFonts} from "expo-font";

export default function Layout() {
    const [fontsLoaded]= useFonts({
        DMSansBold: require("../../assets/fonts/DMSans-Bold.ttf"),
        Lato: require("../../assets/fonts/Lato-Regular.ttf"),
    });
    if(!fontsLoaded){
        return null;
    }
    return <Stack screenOptions={{ headerShown: false }}/>

}
