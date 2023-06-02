import { Button } from "flowbite-react";
import { BsArrowRepeat } from "react-icons/bs";
const ButtonGroup = ({ onOptionClick, onStartClick }) => {
  const handleOptionClick = (option) => {
    onOptionClick(option);
  };

  return (
    <div className="buttons-container">
      <Button
        className=""
        onClick={() => handleOptionClick("Please repeat the sentence again.")}
      >
        <BsArrowRepeat />
      </Button>
    </div>
  );
};
export default ButtonGroup;
