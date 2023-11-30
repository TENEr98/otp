import { createRef, useEffect, useRef, useState } from "react";

const createInputList = (
  inputList = 6,
  changeCodeNumber,
  handleKeyDown,
  codeNumber,
  focus
) => {
  return Array.from({ length: inputList }).map((_, index) => {
    return (
      <input
        key={index}
        name={`input ${index}`}
        value={codeNumber[index]}
        onChange={(event) => changeCodeNumber(event, index)}
        onKeyDown={(event) => handleKeyDown(event, index)}
        ref={focus.current[index]}
        className="otp-number"
        type="number"
        autoComplete="off"
      />
    );
  });
};

const App = () => {
  const [formData, setFormData] = useState(["", "", "", "", "", ""]);
  const focus = useRef(Array.from({ length: 6 }).map(() => createRef()));

  useEffect(() => {
    if (focus.current[0]) {
      focus.current[0].current.focus();
    }
  }, []);

  const handleFocusInput = (index) => focus.current[index].current.focus();

  const handleSetForm = (index, temp = "") => {
    const tempForm = [...formData];
    tempForm.splice(index, 1, temp);
    setFormData(tempForm);
  };

  const handleKeyDown = (event, index) => {
    if (index <= 0) return;
    handleSetForm(index);
    if (formData[index].length !== 0) return;
    switch (event.code) {
      case "Backspace": {
        return handleFocusInput(index - 1);
      }
      case "Delete": {
        return handleFocusInput(index + 1);
      }
    }
  };

  const handleChangeForm = (event, index) => {
    let temp = event.target.value;
    temp = temp.replace(/[^\d]/g, "").slice(0, 1);
    handleSetForm(index, temp);
    if (index < 5 && event.nativeEvent.inputType === "insertText")
      handleFocusInput(index + 1);
  };

  return (
    <div className="wrapper">
      <div className="heading">
        <h2>OTP Verification</h2>
        <p>Please enter the code we have sent you.</p>
      </div>
      <form>
        <div id="otp-container">
          {createInputList(6, handleChangeForm, handleKeyDown, formData, focus)}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
