import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { useAppContext } from '@/components/provider';
import { Divider } from 'react-native-paper';

export default function DetalhesBox() {
    const { box } = useLocalSearchParams();
    const {
        instanteAtual,
        box1,
        box2,
        box3,
        totalTimeBox1,
        totalTimeBox2,
        totalTimeBox3
    } = useAppContext();

    let boxData = [];
    let boxTitle = "";
    let totalTime = 0;

    switch (box) {
        case 'box1':
            boxData = box1;
            boxTitle = "Box 1";
            totalTime = totalTimeBox1;
            break;
        case 'box2':
            boxData = box2;
            boxTitle = "Box 2";
            totalTime = totalTimeBox2;
            break;
        case 'box3':
            boxData = box3;
            boxTitle = "Box 3";
            totalTime = totalTimeBox3;
            break;
        default:
            console.error("Box inválido:", box);
            return null;
    }

    const isAttending = boxData.length > 0;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{boxTitle}</Text>
            <Divider />
            <Text style={styles.subtitle}>Instante Atual: {instanteAtual}</Text>
            <Text style={styles.attending}>
                {isAttending ? `Atendendo no instante ${instanteAtual}` : "Nenhum atendimento no momento"}
            </Text>
            <Text style={styles.subtitle}>Tempo Total de Atendimento: {totalTime} minutos</Text>
            <Divider />

            <Text style={styles.subtitle}>Veículos na Fila:</Text>
            
            <FlatList
                data={boxData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.vehicleContainer}>
                        <Text style={[styles.vehicleText, styles.vehicleNumber]}>Posição: {index + 1}</Text>
                        
                        {item.servicos.map((servico, idx) => (
                            <View key={idx} style={styles.serviceContainer}>
                                <Text style={[styles.vehicleText, {fontWeight:'bold'}]}>Placa: {item.placa}</Text>
                                <Text style={styles.serviceText}>Serviço: {servico.nome}</Text>
                                <Text style={styles.serviceText}>Custo: R$ {servico.custo.toFixed(2)}</Text>
                                <Text style={styles.serviceText}>Duração: {servico.duracao} minutos</Text>
                            </View>
                        ))}
                    </View>
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    attending: {
        fontSize: 20,
        color: 'green',
        marginBottom: 20,
    },
    vehicleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    vehicleText: {
        fontSize: 18,
    },
    vehicleNumber: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    serviceContainer: {
        paddingLeft: 20,
    },
    serviceText: {
        fontSize: 16,
    },
});
