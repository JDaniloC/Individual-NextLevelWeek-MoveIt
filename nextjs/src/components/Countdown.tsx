import { useEffect, useState } from 'react';
import { start } from 'repl';
import styles from '../styles/components/Countdown.module.css';

export default function Countdown() {
    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setActive(true);
    }

    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        }
    }, [active, time])

    return (
        <div>
            <div className = {styles.countdownContainer}>
                <div>
                    <span> {Math.floor(minutes / 10)} </span>
                    <span> {minutes % 10} </span>
                </div>
                <span> : </span>
                <div>
                    <span> {Math.floor(seconds / 10)} </span>
                    <span> {seconds % 10} </span>
                </div>
            </div>
            <button type = "button" onClick = {startCountdown}
                className = {styles.countdownButton}>
                Iniciar um ciclo
            </button>
        </div>
    );
}
