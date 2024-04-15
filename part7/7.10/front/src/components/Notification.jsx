import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  
  const message = useSelector(state => {
    console.log(state.notification)
    return state.notification.message
  });

  const style = useSelector(state => state.notification.style)
  console.log(style)
  if (!message) return null; 

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, backgroundColor: `${style === 'success'?'lightgreen':'red'}`, padding: 10 }}>
      {message}
    </div>
  );
};

export default Notification;
