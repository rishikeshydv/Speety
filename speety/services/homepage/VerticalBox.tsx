// VerticalBox.tsx

import React from 'react';
import styles from '/styles/homepage/Vbox.module.css'; // Correct relative path

interface VerticalBoxProps {
    title: string;
    promptUrl: string;
    point1: string;
    point2: string;
    point3: string;
}

const VerticalBox: React.FC<VerticalBoxProps> = ({ title, promptUrl, point1, point2, point3 }) => {
    return (
        <div className={`${styles.verticalBox}`}>
            <img className={styles.image} src={promptUrl} alt={title} />
            <h1 className={styles.title}>{title}</h1>
            <ul className={styles.points}>
                <li>{point1}</li>
                <li>{point2}</li>
                <li>{point3}</li>
            </ul>
        </div>
    );
};

export default VerticalBox;
