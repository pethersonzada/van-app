import { TouchableOpacity, Text, StyleSheet } from 'react-native'

type Props = {
    label: string
    onPress: () => void
}

export default function Button({ label, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.mainButton} onPress={onPress}>
            <Text style={styles.mainButtonText}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        height: 60,
        width: 300,
        backgroundColor: 'black',
    },
    mainButtonText: {
        fontSize: 20,
        color: 'white',
    },
})