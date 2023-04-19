import React from 'react'

const MessageNavItem = (props) => {
    const onClickMessage = (  ) => {
        props.onClickMessage(props.id)
    }
  return (
    <div key={props.id} onClick={onClickMessage}>{props.name}</div>
  )
}

export default MessageNavItem