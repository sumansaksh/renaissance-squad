// import { useState } from "react";
// import { speaks } from "./SpeekersName";
// import { handleAssistantResponse, fetchChatCompletion } from "./basicFunctions";
// function useChat() {
//   const [loading, setLoading] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [error, setError] = useState(null);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isBrowserTalking, setIsBrowserTalking] = useState(null);
//   const handleNewMessages = async (newMessagesArray) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const newChatHistory = [...chatHistory, ...newMessagesArray];
//       setChatHistory(newChatHistory);

//       const chatbotMessage = await fetchChatCompletion(newChatHistory);

//       // Read the message aloud
//       // console.log("trying to speak", chatbotMessage);
//       await handleAssistantResponse(
//         chatbotMessage,
//         isBrowserTalking,
//         setIsBrowserTalking
//       );

//       const updatedChatHistory = [
//         ...newChatHistory,
//         { role: "assistant", content: chatbotMessage },
//       ];
//       setChatHistory(updatedChatHistory);
//       setInputValue("");
//     } catch (error) {
//       setError("Oops! Something went wrong. Please try again later.");
//       console.log(error);
//     }

//     setLoading(false);
//   };

//   const sendMessageAsync = async (message, role = "user") => {
//     const newMessage = { role, content: message };
//     await handleNewMessages([newMessage]);
//   };

//   const sendMessage = (message, role = "user") => {
//     const newMessage = { role, content: message };
//     handleNewMessages([newMessage]);
//   };

//   const sendMessages = (newMessagesArray) => {
//     handleNewMessages(newMessagesArray);
//   };

//   return {
//     loading,
//     inputValue,
//     error,
//     chatHistory,
//     isBrowserTalking,
//     setInputValue,
//     sendMessage,
//     sendMessages,
//     sendMessageAsync,
//   };
// }
// export default useChat;

import React, { useState, useRef, useEffect } from "react";
import { speaks } from "./SpeekersName";
import { ReactMic } from "react-mic";
import { MdPlayArrow, MdVolumeOff, MdReplayCircleFilled } from "react-icons/md";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { Button } from "flowbite-react";
import AnimatedSpeaker from "./AnimatedSpeaker";
let speechSynthesisInstance = window.speechSynthesis;
function SpeakingDiv({ autoPlay, allowPause, allowReplay, children }) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [text, setText] = useState("");
  const speechRef = useRef();
  function handleAssistantResponse(text, voice) {
    // Cancel any ongoing speech
    speechSynthesisInstance.cancel();

    // Create a new SpeechSynthesisUtterance instance
    const msg = new SpeechSynthesisUtterance();
    msg.volume = 1; // 0 to 1
    msg.rate = 0.8; // 0.1 to 10
    msg.pitch = 0.9; // 0 to 2
    msg.text = text;
    msg.voice = voice;

    speechSynthesisInstance.speak(msg);
    console.log(msg, "message");
    return msg;
  }

  function getTextContent(children) {
    if (typeof children === "string") {
      return children;
    }

    if (Array.isArray(children)) {
      return children.map(getTextContent).join("");
    }

    if (React.isValidElement(children)) {
      return getTextContent(children.props.children);
    }

    return "some default text";
  }

  useEffect(() => {
    if (autoPlay && !paused && !speaking && children) {
      const newMessage = getTextContent(children);
      setText(newMessage);
      handlePlay();
    }
  });

  const handlePlay = async () => {
    // if (!speaking || paused) {
    let voices = speechSynthesisInstance.getVoices();
    let desiredVoice = voices.find((voice) => voice.name === speaks[0].name);
    console.log("desiredVoice", desiredVoice);
    console.log("text", text);

    speechRef.current = await handleAssistantResponse(text, desiredVoice);
    setSpeaking(true);
    setPaused(false);
    // }
  };

  const handlePause = () => {
    // if (speaking && !paused) {
    if (paused) {
      speechSynthesisInstance.resume();
      setPaused(false);
    } else {
      speechSynthesisInstance.pause();
      setPaused(true);
    }

    // }
  };

  const handleReplay = () => {
    speechSynthesisInstance.cancel();
    setSpeaking(false);
    setPaused(false);
    handlePlay();
  };

  return (
    <>
      <div className="grid grid-cols-2 m-10 mt-20">
        <div className="flex justify-center flex-col items-center bg-[#e1f0fb] p-10 m-10">
          <AnimatedSpeaker speaking={speaking} paused={paused} />
          <div className="flex gap-1 mt-20 ">
            <Button
              size="md"
              className="rounded-full  bg-[#04acf5] hover:bg-[#0789c0]"
            >
              <MdPlayArrow className="text-xl" />
            </Button>
            {allowPause && (
              <Button
                size="md"
                className=" bg-[#04acf5] hover:bg-[#0789c0]"
                onClick={handlePause}
              >
                <AiOutlinePauseCircle className="text-xl" />
              </Button>
            )}
            {allowReplay && (
              <Button size="md" className=" bg-[#04acf5] hover:bg-[#0789c0]">
                <MdReplayCircleFilled
                  className="text-xl"
                  onClick={handleReplay}
                />
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-center flex-col items-center bg-[#e1f0fb] p-10 m-10">
          <div>{children}</div>

          <div>speaking state value: {speaking ? "true" : "false"}</div>
          <div>paused state value: {paused ? "true" : "false"}</div>
        </div>
      </div>
    </>
  );
}

export default SpeakingDiv;
