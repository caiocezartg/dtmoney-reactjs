import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import { FormEvent, useState } from 'react'

import fecharImg from '../../assets/fechar.svg'
import entradaImg from '../../assets/entradas.svg'
import saidaImg from '../../assets/saidas.svg'
import { useTransactions } from '../../hooks/useTransactions'
type NewTransactionModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){

    const { createTransaction } = useTransactions();

    const [type, setType] = useState('deposit'); //deposit da API
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category, 
            type,
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return (
        
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        
        <button type="button">
            <img 
            src={fecharImg} 
            alt="Fechar modal" 
            onClick={onRequestClose} 
            className="react-modal-close" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}> 
            <h2>Cadastrar transação</h2>

            <input placeholder="Título" value={title} onChange={({target}) => setTitle(target.value)} />

            <input placeholder="Valor" type="number" value={amount} onChange={({target}) => setAmount(Number(target.value))}/>

            <TransactionTypeContainer>
                <RadioBox 
                    type="button" 
                    onClick={() => {setType('deposit')}} 
                    isActive={type === 'deposit'}
                    activeColor="green"
                >
                    <img src={entradaImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox 
                    type="button" 
                    onClick={() => {setType('withdraw')}} 
                    isActive={type === 'withdraw'}
                    activeColor="red"
                >
                    <img src={saidaImg} alt="Saída" />
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeContainer>

            <input placeholder="Categoria" value={category} onChange={({target}) => setCategory(target.value)}/>

            <button type="submit">
                Cadastrar
            </button>

        </Container>

        </Modal>

    );
}