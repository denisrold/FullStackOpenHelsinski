import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onClick = (event,reset=false)=>{
    if(reset === true){
        setValue('')
    }
  }

  return {
    type,
    value,
    onChange,
    onClick
  }
}
