import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Timer } from "../common";
import './TimerComponent.css';

export type TimerProps = Timer & {
    timerDefault: number
    notifyOnTimeout: (timerId: string) => any
    notifyOntimerReset: (timerId: string) => any
}

const cookies = new Cookies();

export function TimerComponent(props: TimerProps) {
    const { initTime,
        timerId,
        timerDefault,
        notifyOnTimeout,
        notifyOntimerReset } = props

    const [time, setTime] = useState(initTime)


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (time === 0) {
                notifyOnTimeout(timerId)
                return
            }

            setTime((prevState) => {
                return prevState - 1;
            });
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    })

    useEffect(() => {
        cookies.set(timerId, time)
    }, [time])

    const resetHandle = () => {
        setTime(timerDefault)
        notifyOntimerReset(timerId)
    }

    const seconds = time % 60
    const minutes = Math.floor(time / 60)

    return (
        <div className="timer-container">
            <div className="timer-row">Countdown to lift off:</div>
            <div className="clock-container timer-row">
                <div className="number clock-row">{minutes < 10 ? '0' : ''}{minutes}</div>
                <div className="clock-row">:</div>
                <div className="number clock-row">{seconds < 10 ? '0' : ''}{seconds}</div>
            </div>
            <button className="reset-button timer-row" onClick={resetHandle}>Reset timer</button>
        </div>
    )
}