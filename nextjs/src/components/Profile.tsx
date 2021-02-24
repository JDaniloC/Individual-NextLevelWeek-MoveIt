import styles from '../styles/components/Profile.module.css';

export default function Profile() {
    return (
        <div className = {styles.profileContainer}>
            <img src="https://github.com/jdaniloc.png" alt="Profile img"/>
            <div>
                <strong> JDaniloC </strong>
                <p> 
                    <img src="icons/level.svg" alt="level img"/>    
                    Level 1 
                </p>
            </div>
        </div>
    );
}
