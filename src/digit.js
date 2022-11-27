import {useContext} from 'react';
import { GlobalContext } from './App';
export const Digit = (props) => {
    const {dispatch}=useContext(GlobalContext);
  return (
     <button className='number' onClick={()=>{dispatch({type:'ADD_DIGIT',payload:props.digit})}}>{props.digit}</button>
  )
}
