import { useContext, useEffect, useState } from "react";
import { CountdownContainer, Separetor } from "../../styles"
import { cycleContext } from "../..";

export const Timer = () => {
    const { activeCycle, handleFinishActiveCicle } = useContext(cycleContext);

    const [currentSeconds, setCurrentSeconds] = useState<number>(() => {
        if (activeCycle){
            const startTime = typeof activeCycle.startDate === 'string' ? new Date(activeCycle.startDate).getTime() : activeCycle.startDate.getTime()
            const AmountSeconds = Math.floor((new Date().getTime() - new Date(activeCycle.startDate).getTime()) / 1000)
            const durationSeconds = activeCycle.duration * 60
            return durationSeconds - AmountSeconds
        } else return 0
    })

    // Inicializa timer 
    useEffect(()=>{
        if (activeCycle) setCurrentSeconds(activeCycle.duration * 60)
        else setCurrentSeconds(0)
    }, [activeCycle]);

    // Atualização do timer na UI
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;
    const minuteView = String(minutesAmount).padStart(2, "0");
    const secondView = String(secondsAmount).padStart(2, "0");
    // Atualização timer no titulo
    document.title = `${minuteView}:${secondView}`

    // Controle do timer
    useEffect(() => {
        let timerControl: number

        if (activeCycle) {
            timerControl = setInterval(() => { 
                const AmountSeconds = Math.floor((new Date().getTime() - activeCycle.startDate.getTime()) / 1000)
                const durationSeconds = activeCycle.duration * 60
                setCurrentSeconds(durationSeconds - AmountSeconds)
                console.log(AmountSeconds)
                if (AmountSeconds === durationSeconds) {
                    clearInterval(timerControl)
                    handleFinishActiveCicle()
                    setCurrentSeconds(0)
                }
            }, 1000);
        }

        return () => {
            if (!activeCycle) clearInterval(timerControl);
        }

    }, [activeCycle, handleFinishActiveCicle]);


    // Renderização
    return (
        <CountdownContainer>
            <span>{minuteView[0]}</span>
            <span>{minuteView[1]}</span>
            <Separetor>:</Separetor>
            <span>{secondView[0]}</span>
            <span>{secondView[1]}</span>
        </CountdownContainer>
    )
}