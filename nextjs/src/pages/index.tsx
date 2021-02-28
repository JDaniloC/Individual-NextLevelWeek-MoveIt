import CompletedChallenges from '../components/CompletedChallenges';
import { ChallengesProvider } from '../contexts/ChallengeContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import ExperienceBar from '../components/ExperienceBar'
import Countdown from '../components/Countdown';
import Profile from '../components/Profile'

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import styles from "../styles/pages/Home.module.css";
import ChallengeBox from '../components/ChallengeBox';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {  
  return (
    <ChallengesProvider level = {props.level}
      currentExperience = {props.currentExperience}
      challengesCompleted = {props.challengesCompleted}
      >
      <div className={styles.container}>
        <Head>
          <title> Início | move.it </title>
        </Head>

        <ExperienceBar />
        
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}
export const getServerSideProps:GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}