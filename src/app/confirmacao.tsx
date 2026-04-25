import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';

const API_URL = 'http://10.0.2.2:8080';

type Passageiro = {
    id: number;
    nome: string;
    tipo: string;
    confirmado: boolean;
};

export default function Confirmacao() {
    const [passageiros, setPassageiros] = useState<Passageiro[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarPassageiros();
    }, []);

    async function carregarPassageiros() {
        try {
            const response = await fetch(`${API_URL}/usuarios/passageiros`);
            const data = await response.json();
            const comConfirmacao = data.map((p: Passageiro) => ({ ...p, confirmado: false }));
            setPassageiros(comConfirmacao);
        } catch (error) {
            console.error('Erro ao carregar passageiros:', error);
        } finally {
            setLoading(false);
        }
    }

    function toggleConfirmacao(id: number) {
        setPassageiros(prev =>
            prev.map(p => p.id === id ? { ...p, confirmado: !p.confirmado } : p)
        );
    }

    const todosConfirmados = passageiros.length > 0 && passageiros.every(p => p.confirmado);

    function iniciarRota() {
        router.push('/mapa');
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Passageiros de Hoje</Text>
                <Text style={styles.subtitulo}>Confirme quem vai</Text>
            </View>

            <View style={styles.container}>
                <FlatList
                    data={passageiros}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ gap: 15, paddingVertical: 20 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.card, item.confirmado && styles.cardConfirmado]}
                            onPress={() => toggleConfirmacao(item.id)}
                        >
                            <View style={styles.cardInfo}>
                                <Ionicons
                                    name="person-circle"
                                    size={40}
                                    color={item.confirmado ? 'white' : 'black'}
                                />
                                <Text style={[styles.nomePassageiro, item.confirmado && styles.textoConfirmado]}>
                                    {item.nome}
                                </Text>
                            </View>
                            <Ionicons
                                name={item.confirmado ? 'checkmark-circle' : 'ellipse-outline'}
                                size={28}
                                color={item.confirmado ? 'white' : 'gray'}
                            />
                        </TouchableOpacity>
                    )}
                />

                <Button
                    label={todosConfirmados ? "Iniciar Rota" : "Aguardando confirmações..."}
                    onPress={todosConfirmados ? iniciarRota : () => {}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: 'black' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
    header: { flex: 0.25, justifyContent: 'center', alignItems: 'center', gap: 8 },
    titulo: { fontSize: 32, fontWeight: '700', color: 'white' },
    subtitulo: { fontSize: 16, color: '#aaaaaa' },
    container: { flex: 0.75, backgroundColor: '#f5f5f5', borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingHorizontal: 25, paddingBottom: 40, alignItems: 'center' },
    card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, padding: 15, width: '100%', elevation: 3 },
    cardConfirmado: { backgroundColor: 'black' },
    cardInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    nomePassageiro: { fontSize: 18, fontWeight: '500', color: 'black' },
    textoConfirmado: { color: 'white' },
});