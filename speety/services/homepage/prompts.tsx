// prompts.tsx

import React from 'react';
import styles from '/styles/homepage/Prompt.module.css'; // Correct relative path
interface PromptProps {
    title: string;
    promptUrl: string;
}

const Prompts: React.FC<PromptProps> = ({ title, promptUrl }) => {
    return (
        <div className={styles.prompt}>
            <h1 className={styles.title}>{title}</h1>
            <img className={styles.image} src={promptUrl} alt={promptUrl} />
        </div>
    );
};

export default Prompts;
