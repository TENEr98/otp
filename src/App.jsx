import { createRef, useEffect, useRef, useState } from "react";

const INPUT_QUANTITY = 6;

const emptyArray = Array.from({ length: INPUT_QUANTITY });

const createInputList = (
  changeCodeNumber,
  handleKeyDown,
  codeNumber,
  focus
) => {
  return emptyArray.map((_, index) => {
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
  const [formData, setFormData] = useState(emptyArray.fill(""));
  const focus = useRef(emptyArray.map(() => createRef()));

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
    switch (event.code) {
      case "Backspace": {
        handleSetForm(index);
        if (index <= 0) return;
        handleFocusInput(index - 1);
        break;
      }
      case "Delete": {
        handleSetForm(index);
        if (index >= INPUT_QUANTITY - 1) return;
        handleFocusInput(index + 1);
        break;
      }
      case "ArrowLeft": {
        if (index <= 0) return;
        handleFocusInput(index - 1);
        break;
      }
      case "ArrowRight": {
        if (index >= INPUT_QUANTITY - 1) return;
        handleFocusInput(index + 1);
        break;
      }
    }
  };

  const handleChangeForm = (event, index) => {
    if (event.nativeEvent.inputType === "deleteContentBackward") return;
    let temp = event.target.value;
    temp = temp.replace(/[^\d]/g, "").slice(0, 1);
    handleSetForm(index, temp);
    if (
      index < INPUT_QUANTITY - 1 &&
      event.nativeEvent.inputType === "insertText"
    )
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
          {createInputList(handleChangeForm, handleKeyDown, formData, focus)}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
