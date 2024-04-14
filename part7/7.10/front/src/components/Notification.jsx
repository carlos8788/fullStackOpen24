import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  
  const message = useSelector(state => state.notification.message);

  if (!message) return null; 

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, backgroundColor: 'lightgreen', padding: 10 }}>
      {message}
    </div>
  );
};

export default Notification;
