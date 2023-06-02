import { TiMicrophone } from "react-icons/ti";
import Styles from "./animated.module.css";
function AnimatedSpeaker({ speaking, Paused }) {
  return (
    <>
      <div
        class={`h-36 w-36 bg-[#04acf5] rounded-full   flex justify-center items-center  ${
          speaking && Paused ? Styles.animationPulse : ""
        }`}
      >
        <TiMicrophone color="white" className="text-xl" />
      </div>
    </>
  );
}

export default AnimatedSpeaker;
