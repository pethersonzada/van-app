import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';

const API_URL = 'http://10.0.2.2:8080';
const MOTORISTA_ID = 4;

type Passageiro = {
    id: number;
    nome: string;
    latitude: number;
    longitude: number;
    enderecoCompleto: string;
};

export default function Mapa() {
    const [localizacao, setLocalizacao] = useState<{ latitude: number; longitude: number } | null>(null);
    const [rota, setRota] = useState<Passageiro[]>([]);
    const [loading, setLoading] = useState(true);
    const [pausado, setPausado] = useState(false);
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        inicializar();
    }, []);

    async function inicializar() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão de localização negada');
            return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocalizacao({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });

        await carregarRota();
        setLoading(false);

        Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 3000, distanceInterval: 5 },
            (loc) => {
                setLocalizacao({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
            }
        );
    }

    async function carregarRota() {
        try {
            const response = await fetch(`${API_URL}/rota/otimizar/${MOTORISTA_ID}`);
            const data = await response.json();
            setRota(data);
        } catch (error) {
            console.error('Erro ao carregar rota:', error);
        }
    }

    async function recalcularRota() {
        setLoading(true);
        await carregarRota();
        setLoading(false);
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.loadingText}>Calculando rota...</Text>
            </View>
        );
    }

    const coordenadasRota = localizacao
        ? [localizacao, ...rota.map(p => ({ latitude: p.latitude, longitude: p.longitude }))]
        : rota.map(p => ({ latitude: p.latitude, longitude: p.longitude }));

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_DEFAULT}
                showsUserLocation
                followsUserLocation
                initialRegion={{
                    latitude: localizacao?.latitude ?? -8.2331383,
                    longitude: localizacao?.longitude ?? -35.7475651,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {rota.map((passageiro, index) => (
                    <Marker
                        key={passageiro.id}
                        coordinate={{ latitude: passageiro.latitude, longitude: passageiro.longitude }}
                        title={`${index + 1}. ${passageiro.nome}`}
                        description={passageiro.enderecoCompleto}
                        pinColor="black"
                    />
                ))}

                {coordenadasRota.length > 1 && (
                    <Polyline
                        coordinates={coordenadasRota}
                        strokeColor="black"
                        strokeWidth={4}
                    />
                )}
            </MapView>

            <View style={styles.botoesContainer}>
                <TouchableOpacity
                    style={[styles.botao, pausado && styles.botaoPausado]}
                    onPress={() => setPausado(!pausado)}
                >
                    <Text style={styles.botaoTexto}>{pausado ? 'Retomar Rota' : 'Pausar Rota'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoRecalcular} onPress={recalcularRota}>
                    <Text style={styles.botaoTexto}>Recalcular Rota</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', gap: 15 },
    loadingText: { color: 'white', fontSize: 18 },
    botoesContainer: { position: 'absolute', bottom: 40, left: 20, right: 20, gap: 10 },
    botao: { backgroundColor: 'black', padding: 15, borderRadius: 15, alignItems: 'center' },
    botaoPausado: { backgroundColor: '#444' },
    botaoRecalcular: { backgroundColor: '#222', padding: 15, borderRadius: 15, alignItems: 'center' },
    botaoTexto: { color: 'white', fontSize: 16, fontWeight: '600' },
});