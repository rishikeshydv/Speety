// components/RoundedImage.js

import React from 'react';
import styles from '/styles/homepage/Image.module.css';

interface Props {
    src: string;
    alt: string;
}

const Image: React.FC<Props> = ({ src, alt }) => {
    return (
      <div className={styles.container}>
        <img src={src} alt={alt} className={`${styles.image}`} />
      </div>
    );
  };

export default Image;
