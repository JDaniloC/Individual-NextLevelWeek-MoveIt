import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export default function Countdown() {
    const { minutes, seconds, resetCountdown, 
        startCountdown, isActive, hasFinished 
    } = useContext(CountdownContext);

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
            { hasFinished ? (
                <button disabled className = {styles.countdownButton}>
                    Ciclo encerrado <img src="./icons/check.svg" alt="positive img"/>
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button type = "button" onClick = {resetCountdown}
                            className = {`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button type = "button" onClick = {startCountdown}
                            className = {styles.countdownButton}>
                            Iniciar um ciclo
                        </button>
                    ) }
                </>
            )}
        </div>
    );
}
