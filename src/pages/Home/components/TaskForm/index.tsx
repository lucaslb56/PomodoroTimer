import { useContext } from "react"
import { DurationInput, FormContainer, TaskNameInput } from "../../styles"
import { cycleContext } from "../.."

interface TaskFormProps {
    refTaskName: React.RefObject<HTMLInputElement>
    refDuration: React.RefObject<HTMLInputElement>
}

export const TaskForm = ({refTaskName, refDuration}:TaskFormProps) => {
    const { activeCycle } = useContext(cycleContext)
    console.log(activeCycle)

    return (
        <FormContainer>
            <label htmlFor="taskName">Vou trabalhar em </label>
            <TaskNameInput defaultValue={activeCycle ? activeCycle.taskName : ""} disabled={Boolean(activeCycle)} ref={refTaskName} required list="task-suggestions" placeholder="Dê nome a sua tarefa" id="taskName" type="text" />
            <datalist id="task-suggestions">
                <option value="Estudar React JS" />
                <option value="Estudar C#" />
                <option value="Trabalhar no projeto Formapack" />
            </datalist>
            <label htmlFor="duration"> durante </label>
            <DurationInput defaultValue={activeCycle ? activeCycle.duration : ""} disabled={Boolean(activeCycle)} ref={refDuration} required min={5} max={60} step={5} placeholder="00" id="duration" type="number" />
            <label > minutos</label>
        </FormContainer>
    )

}