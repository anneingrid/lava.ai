import React, { useState, useEffect, createContext, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [instanteAtual, setInstanteAtual] = useState(0);
    const [box1, setBox1] = useState([]);
    const [box2, setBox2] = useState([]);
    const [box3, setBox3] = useState([]);
    const [totalTimeBox1, setTotalTimeBox1] = useState(0);
    const [totalTimeBox2, setTotalTimeBox2] = useState(0);
    const [totalTimeBox3, setTotalTimeBox3] = useState(0);

    const TABELA_SERVICOS = [
        { nome: 'Lavagem simples (sem enceramento)', custo: 10, duracao: 10 },
        { nome: 'Lavagem completa (com enceramento)', custo: 30, duracao: 20 },
        { nome: 'Polimento de faróis', custo: 50, duracao: 100 },
        { nome: 'Cristalização de vidros', custo: 200, duracao: 100 },
        { nome: 'Limpeza técnica de motor', custo: 50, duracao: 100 },
        { nome: 'Higienização de ar-condicionado', custo: 10, duracao: 10 },
        { nome: 'Higienização interna', custo: 10, duracao: 20 },
        { nome: 'Limpeza e hidratação de couro', custo: 100, duracao: 200 },
        { nome: 'Oxi-sanitização', custo: 20, duracao: 50 },
    ];

    const calcularTempoTotal = (boxData) => {
        return boxData.reduce((accum, vehicle) => {
            const vehicleTime = vehicle.servicos.reduce((serviceSum, servico) => serviceSum + servico.duracao, 0);
            return accum + vehicleTime;
        }, 0);
    };

    useEffect(() => {
        setTotalTimeBox1(calcularTempoTotal(box1));
    }, [box1]);

    useEffect(() => {
        setTotalTimeBox2(calcularTempoTotal(box2));
    }, [box2]);

    useEffect(() => {
        setTotalTimeBox3(calcularTempoTotal(box3));
    }, [box3]);

    const decrementarPrimeiroServico = (boxData) => {
        if (boxData.length === 0) return boxData;

        const novoBox = [...boxData];
        const primeiroVeiculo = novoBox[0];
        const novosServicos = [...primeiroVeiculo.servicos];

        if (novosServicos.length > 0) {
            novosServicos[0] = { ...novosServicos[0], duracao: Math.max(novosServicos[0].duracao - 1, 0) };
            
            if (novosServicos[0].duracao === 0) {
                novosServicos.shift();
            }

            novoBox[0] = { ...primeiroVeiculo, servicos: novosServicos };
        }

        if (novoBox[0].servicos.length === 0) {
            novoBox.shift();
        }

        return novoBox;
    };

    const incrementarInstanteAtual = () => {
        setInstanteAtual(instanteAtual + 1);

        const novoBox1 = decrementarPrimeiroServico(box1);
        const novoBox2 = decrementarPrimeiroServico(box2);
        const novoBox3 = decrementarPrimeiroServico(box3);

        setBox1(novoBox1);
        setBox2(novoBox2);
        setBox3(novoBox3);

        setTotalTimeBox1(calcularTempoTotal(novoBox1));
        setTotalTimeBox2(calcularTempoTotal(novoBox2));
        setTotalTimeBox3(calcularTempoTotal(novoBox3));
    };

    const registrarPedidoAtendimento = (placa, servicos) => {
        const novoPedido = {
            placa,
            servicos: servicos.map(servico => ({
                ...TABELA_SERVICOS.find(item => item.nome === servico),
                tempoConclusao: 0 
            }))
        };

        let menorFila = box1.length;
        let boxEscolhido = 'box1';

        if (box2.length < menorFila) {
            menorFila = box2.length;
            boxEscolhido = 'box2';
        }

        if (box3.length < menorFila) {
            menorFila = box3.length;
            boxEscolhido = 'box3';
        }

        if (menorFila < 5) {
            switch (boxEscolhido) {
                case 'box1':
                    setBox1([...box1, novoPedido]);
                    break;
                case 'box2':
                    setBox2([...box2, novoPedido]);
                    break;
                case 'box3':
                    setBox3([...box3, novoPedido]);
                    break;
                default:
                    console.error('Box inválido:', boxEscolhido);
            }
            return boxEscolhido;
        } else {
            console.log('Atendimento não pode ser realizado neste momento por falta de espaço na fila.');
        }
    };

    return (
        <AppContext.Provider value={{
            instanteAtual,
            box1,
            box2,
            box3,
            totalTimeBox1,
            totalTimeBox2,
            totalTimeBox3,
            incrementarInstanteAtual,
            registrarPedidoAtendimento,
            TABELA_SERVICOS,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);
