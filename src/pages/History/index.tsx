import { useEffect, useState } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles"


interface CycleType {
    id: string;
    taskName: string;
    duration: number;
    startDate: string;
    interruptDate?: string;
    endDate?: string;
}

export const History = () => {
    // Variáveis de estado
    const [cycles, setCycles] = useState<CycleType[]>(() => {
        const cyclesJSON = localStorage.getItem('cycles');
        if (cyclesJSON) return JSON.parse(cyclesJSON)
        else return []
    });

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
            <HistoryList>
            <table>
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Inicio</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {cycles.map(cycle => {
                        let status
                        if (cycle.interruptDate) status = <Status statusColor="red">Interrompido</Status>
                        else if (cycle.endDate) status = <Status statusColor="green">Concluído</Status> 
                        else status = <Status statusColor="yellow">Em andamento</Status>
                        return (
                            <tr key={cycle.id}>
                                <td>{cycle.taskName}</td>
                                <td>{cycle.duration} minutos</td>
                                <td>{cycle.startDate}</td>
                                <td>{status}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            </HistoryList>
            
        </HistoryContainer>
    )
}