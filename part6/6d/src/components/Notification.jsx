import { useEffect } from "react"
import { useAnecdoteDispatch, useAnecdoteValue } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const message = useAnecdoteValue()
  const dispatch = useAnecdoteDispatch()
  useEffect(() => {
    if (message !== '') {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR' });
      }, 5000);

      
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
