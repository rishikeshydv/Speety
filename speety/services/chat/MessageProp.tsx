import React from 'react'

interface MsgProp {
    message:string;
    msgTime:string;
}
const MessageProp:React.FC<MsgProp> = ({message,msgTime}) => {
  return (
    <div>
            <h1>{message}</h1>
            <p>{msgTime}</p>
    </div>
  )
}
export default MessageProp
