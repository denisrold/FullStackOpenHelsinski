import { EnumType, RadioInputsProps } from "../../types"

const RadioInputs =<T extends EnumType> (props : RadioInputsProps<T>) => { 
  return(
    <div>
    {Object.values(props.selectedType).map((option) => (
      <label key={option}>
        <input
          type="radio"
          name={props.name}
          value={option} 
          onChange={props.inputHandle}
          checked={props.compare === option}
        />
        {option}
      </label>
    ))}
  </div>
  )
}

export default RadioInputs;