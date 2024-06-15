import React, { useState } from 'react';
import { View, Text, TextInput, CheckBox, Button, ScrollView, Alert } from 'react-native';
import { useAppContext } from '@/components/provider';

const TelaBoxAtendimento = () => {
  const { TABELA_SERVICOS, registrarPedidoAtendimento } = useAppContext();

  const [placa, setPlaca] = useState('');
  const [servicosSelecionados, setServicosSelecionados] = useState([]);

  const handleCheckboxChange = (index) => {
    const newServicos = [...servicosSelecionados];
    if (newServicos.includes(index)) {
      newServicos.splice(newServicos.indexOf(index), 1);
    } else {
      newServicos.push(index);
    }
    setServicosSelecionados(newServicos);
  };

  const handleSubmit = () => {
    const servicosNomes = servicosSelecionados.map(index => TABELA_SERVICOS[index].nome);
    const boxInserido = registrarPedidoAtendimento(placa, servicosNomes);

    if (boxInserido) {
      console.log( `O pedido foi inserido no ${boxInserido.toUpperCase()} com sucesso!`)
      alert(
        `O pedido foi inserido no ${boxInserido.toUpperCase()} com sucesso!`
      )
    } else {
      alert(
        "Pedido Não Registrado, Não há espaço disponível nos boxes no momento.",
      )
    }
    setPlaca('');
    setServicosSelecionados([]);

    
  };

  return (
    <ScrollView contentContainerStyle={{ }}>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Digite a placa do veículo:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
          value={placa}
          onChangeText={text => setPlaca(text)}
          placeholder="Digite a placa"
        />

        <Text style={{ fontSize: 20, marginBottom: 10 }}>Selecione os serviços desejados:</Text>
        {TABELA_SERVICOS.map((servico, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <CheckBox
              value={servicosSelecionados.includes(index)}
              onValueChange={() => handleCheckboxChange(index)}
            />
            <Text style={{ marginLeft: 8 }}>{servico.nome} - R$ {servico.custo.toFixed(2)}</Text>
          </View>
        ))}

        <Button
          title="Enviar"
          onPress={handleSubmit}
          disabled={placa === '' || servicosSelecionados.length === 0}
        />
      </View>
    </ScrollView>
  );
};

export default TelaBoxAtendimento;
