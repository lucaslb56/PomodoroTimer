import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, FormContainer, StartCountButton, StopCountButton, DurationInput, TaskNameInput } from "./styles"
import { createContext, useRef, useState } from "react"
import { Timer } from "./components/Timer/index"

interface Cycle {
    id: string;
    taskName: string;
    duration: number;
    startDate: Date;
    interruptDate?: Date;
    endDate?: Date;
}

interface CycleContextType {
    activeCycle: Cycle | null,
    handleFinishActiveCicle: () => void
}

export const cycleContext = createContext({} as CycleContextType)

export const Home = () => {
    // Variáveis de estado
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycle, setActiveCycle] = useState<Cycle | null>(null)

    // Inputs do usuário
    const taskNameInput = useRef<HTMLInputElement>(null);
    const durationInput = useRef<HTMLInputElement>(null);

    // Função submit do formuário
    const handleCreateNewCycle = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const taskName = taskNameInput.current?.value;
        const duration = durationInput.current?.value;
        const id = String(new Date().getTime());
        console.log(cycles)
        const newCycle: Cycle = {
            id,
            taskName: taskName || "Sem nome",
            duration: Number(duration),
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCycle(newCycle)

    }

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
                    <FormContainer>
                        <label htmlFor="taskName">Vou trabalhar em </label>
                        <TaskNameInput disabled={Boolean(activeCycle)} ref={taskNameInput} required list="task-suggestions" placeholder="Dê nome a sua tarefa" id="taskName" type="text" />
                        <datalist id="task-suggestions">
                            <option value="Estudar React JS" />
                            <option value="Estudar C#" />
                            <option value="Trabalhar no projeto Formapack" />
                        </datalist>
                        <label htmlFor="duration"> durante </label>
                        <DurationInput disabled={Boolean(activeCycle)} ref={durationInput} required min={1} max={60} step={5} placeholder="00" id="duration" type="number" />
                        <label > minutos</label>
                    </FormContainer>
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