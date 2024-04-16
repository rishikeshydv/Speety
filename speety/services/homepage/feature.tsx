import styles from '/styles/homepage/Feature.module.css';

interface FeatProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatProps> = ({ imageSrc, title, description }) => {
  return (
    <div className={`${styles.card}`}>
      <img src={imageSrc} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={`${styles.description}`}>{description}</p>
    </div>
  );
};

export default Feature;
