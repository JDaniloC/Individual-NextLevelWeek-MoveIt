import React, { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from "../../challenges.json";
import { LevelUpModal } from '../components/LevelUpModal';

interface challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelModal: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ 
        children, ...rest 
    }: ChallengeProviderProps ) {
    const [level, setLevel] = useState(rest.level);
    const [currentExperience, setCurrentExperience] = useState(
        rest.currentExperience);
    const [challengesCompleted, setChallengesCompleted] = useState(
        rest.challengesCompleted);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

    useEffect(() => {
        Cookies.set("level", String(level));
        Cookies.set("currentExperience", String(currentExperience));
        Cookies.set("challengesCompleted", String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelModalOpen(true);
    }

    function closeLevelModal() {
        setIsLevelModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        } else {
            console.log("Não permitido")
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience > experienceToNextLevel) {
            finalExperience -= experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengeContext.Provider value = {{ 
            currentExperience, level, 
            experienceToNextLevel,
            challengesCompleted, 
            activeChallenge, 
            resetChallenge, levelUp, 
            startNewChallenge, 
            completeChallenge,
            closeLevelModal }}>
            {children}

            { isLevelModalOpen && <LevelUpModal /> }
        </ChallengeContext.Provider>
    )
}