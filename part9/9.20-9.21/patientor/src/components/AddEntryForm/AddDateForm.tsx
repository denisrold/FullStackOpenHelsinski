interface ChildComponentProps {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement >) => void;
}

const AddDateForm: React.FC<ChildComponentProps> = ({ handleOnChange }) => {
  

  const dateToday = () => {
    const today :string = new Date().toISOString().split('T')[0];
    return today
  }
  return(
    <div className="inputsContainer">
    <label htmlFor="date">
      date:
    </label>
    <input onChange={handleOnChange} name='date' type="date" max={dateToday()} />
    </div>
  )
}

export default AddDateForm;