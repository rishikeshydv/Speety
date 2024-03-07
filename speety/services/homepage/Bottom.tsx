import React from 'react'
import styles from "/styles/homepage/Bottom.module.css"
interface Props {
    title:string,
    opt1:string,
    opt2:string,
    opt3:string
}
const Bottom:React.FC<Props> = ({title,opt1,opt2,opt3}) => {
  return (
    <div>
        <h1 className={styles.topic}>{title}</h1>
        <p className={styles.opts}>{opt1}</p>
        <p className={styles.opts}>{opt2}</p>
        <p className={styles.opts}>{opt3}</p>
    </div>
  )
}

export default Bottom;
