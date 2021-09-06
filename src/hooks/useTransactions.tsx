import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';


type Transaction = {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionsProviderProps = {
    children: ReactNode;
}

type TransactionsContextData = {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData //FORÇA A TIPAGEM NO VALOR INICIAL DO CONTEXTO
);

type TransactionInput = Omit<Transaction, 'id'| 'createdAt'> // Tipagem igual ao Transaction, porém sem o ID e CREATEDAT


export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);


    useEffect(() => {
        api.get('transactions')
        .then((response) => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput){

       const response =  await api.post('/transactions', {...transactionInput, createdAt: new Date()})
       const { transaction: newTransaction } = response.data;

       setTransactions([...transactions, newTransaction])

    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions () {
    const context = useContext(TransactionsContext);

    return context;
}