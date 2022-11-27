import {useContext} from 'react'
import { GlobalContext } from "./App";
export const Operation = (props) => {
     const { dispatch } = useContext(GlobalContext);
  return (
      <button className='operation' onClick={()=>{
        dispatch({type:"OPERATION",payload:props.operation})
      }
      }>{props.operation}</button>
  )
}
