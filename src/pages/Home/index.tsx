import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, FormContainer, StartCountButton, StopCountButton, DurationInput, TaskNameInput } from "./styles"
import { createContext, useEffect, useRef, useState } from "react"
import { Timer } from "./components/Timer/index"
import { TaskForm } from "./components/TaskForm";

interface CycleType {
    id: string;
    taskName: string;
    duration: number;
    startDate: Date | String;
    interruptDate?: Date | String;
    endDate?: Date | String;
}

interface CycleContextType {
    activeCycle: CycleType | null,
    handleFinishActiveCicle: () => void
}

export const cycleContext = createContext({} as CycleContextType)

export const Home = () => {
    // Variáveis de estado
    const [cycles, setCycles] = useState<CycleType[]>(() => JSON.parse(localStorage.getItem('cycles') || '[]'));
    const [activeCycle, setActiveCycle] = useState<CycleType | null>(() => JSON.parse(localStorage.getItem('activeCycle') || 'null'));

    // Inputs do usuário
    const taskNameInput = useRef<HTMLInputElement>(null);
    const durationInput = useRef<HTMLInputElement>(null);

    // Função submit do formuário
    const handleCreateNewCycle = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const taskName = taskNameInput.current?.value;
        const duration = durationInput.current?.value;
        const id = String(new Date().getTime());
        const newCycle: CycleType = {
            id,
            taskName: taskName || "Sem nome",
            duration: Number(duration),
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCycle(newCycle)
    }

    // Salva ciclos no localStorage
    useEffect(()=>localStorage.setItem('cycles', JSON.stringify(cycles)), [cycles]);

    // Salva ciclo ativo
    useEffect(()=>localStorage.setItem('activeCycle', JSON.stringify(activeCycle)), [activeCycle]);

    // Imterromper ciclo
    const handleInterruptActiveCicle = () => {
        if (activeCycle) {
            setCycles(state => state.map(cycle => {
                if (activeCycle.id === cycle.id) cycle.interruptDate = new Date();
                return cycle
            }))
            setActiveCycle(null)
        }
    }

    // Finalizar ciclo
    const handleFinishActiveCicle = () => {
        if (activeCycle) {
            setCycles(state => state.map(cycle => {
                if (activeCycle.id === cycle.id) cycle.endDate = new Date();
                return cycle
            }))
            setActiveCycle(null)
        }
    }

    // Renderização
    return (
        <HomeContainer>
            <cycleContext.Provider value={{ activeCycle, handleFinishActiveCicle }}>
                <form onSubmit={handleCreateNewCycle} action="">
                    <TaskForm refTaskName={taskNameInput} refDuration={durationInput} />
                    <Timer />
                    {activeCycle ? (
                        <StopCountButton onClick={handleInterruptActiveCicle} type="button">
                            <HandPalm size={30} />
                            Interromper
                        </StopCountButton>
                    ) : (
                        <StartCountButton type="submit">
                            <Play size={30} />
                            Começar
                        </StartCountButton>
                    )}

                </form>
            </cycleContext.Provider>
        </HomeContainer>
    )
}