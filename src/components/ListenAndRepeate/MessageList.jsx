import { Avatar } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { TiMicrophone } from "react-icons/ti";
import ButtonGroup from "./ButtonGroup";
import { Tabs } from "flowbite-react";
const MessageList = ({
  chatHistory,
  isBrowserTalking,
  sendMessage,
  handleStart,
}) => {
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
  }, [chatHistory]);

  return (
    <>
      <div className="flex justify-center items-center flex-col mt-40">
        <div
          class={`h-20 w-20 bg-red-600 rounded-full   flex justify-center items-center  ${
            true ? "animate-pulse" : ""
          }`}
        >
          <TiMicrophone color="white" />
        </div>
        <div className="m-2">
          <ButtonGroup
            onOptionClick={sendMessage} // Pass the function as a prop
            onStartClick={handleStart}
          />
        </div>

        <div className="hidden" ref={chatHistoryRef}>
          {console.log(chatHistory, "chathistory")}
          {chatHistory.map((message, index) => (
            <code
              key={index}
              className={`${
                message.role === "system" || index === 1 ? "hidden" : ""
              } message-${message.role}-${index}`}
            >
              {<pre>{false ? message.content : "Audio clip..."}</pre>}
              <Avatar img={TiMicrophone} rounded>
                <div className="space-y-1 font-medium dark:text-white">
                  <div>Jese Leos</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Joined in August 2014
                  </div>
                </div>
              </Avatar>
            </code>
          ))}
        </div>
      </div>
    </>
  );
};
export default MessageList;
