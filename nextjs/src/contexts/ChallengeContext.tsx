import { createContext, ReactNode, useState } from 'react';
import challenges from "../../challenges.json";

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
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengeProviderProps ) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    return (
        <ChallengeContext.Provider value = {{ 
            level, currentExperience, 
            experienceToNextLevel,
            challengesCompleted, 
            activeChallenge, levelUp, 
            startNewChallenge, resetChallenge }}>
            {children}
        </ChallengeContext.Provider>
    )
}