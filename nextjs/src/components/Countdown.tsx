import { useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export default function Countdown() {
    const { startNewChallenge } = useContext(ChallengeContext)

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge()
        }
    }, [isActive, time])

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
