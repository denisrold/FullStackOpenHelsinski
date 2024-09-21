interface ChildComponentProps {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement >) => void;
  name:string
  required:boolean;
  objectName:string;
}

const AddDateForm: React.FC<ChildComponentProps> = ({ handleOnChange, name, required,objectName }) => {
  const dateToday = () => {
    const today :string = new Date().toISOString().split('T')[0];
    return today
  }
  return(
    <div className="inputsContainer">
      <label htmlFor={objectName}>
       {name}
      </label>
      <input required={required} onChange={handleOnChange} name={objectName} type="date" max={dateToday()} />
    </div>
  )
}

export default AddDateForm;