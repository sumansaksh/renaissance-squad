import React, { useState, useRef, useEffect } from "react";
import AudioToTextInput from "./AudioTotextInput";
import { Modal } from "flowbite-react";
import MessageList from "./MessageList";
import useChat from "./UseChat";
import { Button, Spinner, Accordion } from "flowbite-react";
import SpeakingDiv from "./UseChat";
import { Card } from "flowbite-react";

const End = ({ assignmentFeedback }) => (
  <div className="p-2 m-10 gap-4">
    {console.log(assignmentFeedback, "assignmentFeedback")}
    <h1 className="font-bold font-[Poppins] text-3xl text-center"> The End</h1>

    <Accordion className="m-10">
      {/* {assignmentFeedback.map(() => {
        return (
          <>
            <Accordion.Panel>
              <Accordion.Title>First Exercise</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Total Marks: {assignmentFeedback[0].totalMarks}
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Marks: {assignmentFeedback[0].marks}
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Feedback: {assignmentFeedback[0].feedback}
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </>
        );
      })} */}
      <Accordion.Panel>
        <Accordion.Title>First Exercise</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Total Marks: {assignmentFeedback[0].totalMarks}
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Marks: {assignmentFeedback[0].marks}
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Feedback: {assignmentFeedback[0].feedback}
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>second Exercise</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Total Marks: {assignmentFeedback[1].totalMarks}
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Marks: {assignmentFeedback[1].marks}
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Feedback: {assignmentFeedback[1].feedback}
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Third Exercise</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Total Marks: {assignmentFeedback[2].totalMarks}
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Marks: {assignmentFeedback[2].marks}
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Feedback: {assignmentFeedback[2].feedback}
          </p>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  </div>
);

function parseFeedback(feedback) {
  let obj;

  try {
    obj = JSON.parse(feedback);
    if ("totalMarks" in obj && "marks" in obj && "feedback" in obj) {
      return {
        totalMarks: obj.totalMarks,
        marks: obj.marks,
        feedback: obj.feedback,
      };
    }
    throw new Error();
  } catch (error) {
    let totalMarks = feedback.match(/\b10\b/) || [10];
    let marks = feedback.match(/\b([1-9]|0?[1-9])\b/) || [0];
    return {
      totalMarks: Number(totalMarks[0]),
      marks: Number(marks[0]),
      feedback: feedback,
    };
  }
}

async function fetchChatCompletion(messages) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.log(error);
    throw new Error("Oops! Something went wrong. Please try again later.");
  }
}
let getPromptToCompareAndGenerateFeedback = function (
  originalPara,
  studentPara
) {
  return `
    You are an english proficiency examiner for software programming candidates. 

    A candidate was given the following paragraph to re-phrase:
    "${originalPara}"

    The candidate responded back with the following response:
    "${studentPara}"

    You need to Assess the candidates comprehension & verbal level of English. mark them out of 10. If the candidate repeats the exact sentence as you, there's a 75% penalty on the marks. They are expected. penalize them for wrong grammar. penalize them for wrong comprehension  
    provide output in the following json format text only. In the feedback, never provide any additional text outside of this format {totalMarks: 10, marks: <marks here>, feedback: <your very detailed feedback here.>}
  `;
};

let getPromptToGenerateAShortParagraph = function () {
  return `Please give me a short paragraph of 30 to 35 words. Use simple and everyday english. It should be an answer of some commonly asked web developer interview. Remember the paragraph should be an answer itself. dont worry about the question.`;
};
async function getTextCompletionResponse(newMessagesArray) {
  try {
    const chatbotMessage = await fetchChatCompletion(newMessagesArray);
    console.log(chatbotMessage);
    return chatbotMessage;
  } catch (error) {
    console.log(error);
  }
}
const ReadAndRephrase = ({ id, nextProblem, onFeedback }) => {
  const [originalPara, setOriginalPara] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studentPara, setStudentPara] = useState("");
  const [stage, setStage] = useState("initial");
  const [timer, setTimer] = useState(30);
  const [feedback, setFeedback] = useState("");

  const handleStart = async () => {
    setStage("generatingoriginal");

    try {
      let paraFromAI = await getTextCompletionResponse([
        { role: "user", content: getPromptToGenerateAShortParagraph() },
      ]);

      setOriginalPara(paraFromAI);

      setStage("read");

      // Start a 30-second timer
      const timerId = setInterval(() => {
        setTimer((oldTimer) => {
          if (oldTimer <= 1) {
            clearInterval(timerId);
            setStage("record");
            return 30; // Reset timer to 30 seconds for the next round
          } else {
            return oldTimer - 1; // Decrease the timer by 1 second
          }
        });
      }, 1000); // 1000 milliseconds = 1 second
    } catch (error) {
      setError(error);
    }
  };

  async function handleFeedback(originalText, studentText) {
    try {
      let feedbackFromAI = await getTextCompletionResponse([
        {
          role: "user",
          content: getPromptToCompareAndGenerateFeedback(
            originalText,
            studentText
          ),
        },
      ]);
      setStage("feedback");
      setFeedback(feedbackFromAI);
      return feedbackFromAI;
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="chatbot">
      <div className="modal-overlay">
        <div className="modal">
          {stage === "initial" && (
            <>
              <div className="flex justify-evenly items-center">
                <div className="flex flex-col items-center h-screen">
                  <h3 className="text-center text-2xl font-poppins font-bold mb-3">
                    {" "}
                    {id == 1 ? "First  Exercise" : ""}
                  </h3>
                  <Button
                    color=""
                    className="btn-start bg-[#04acf5]"
                    onClick={() => handleStart()}
                  >
                    Lets start
                  </Button>
                </div>
                <img src="/studentStudy.png" className="w-[35%] h-[35%]"></img>
              </div>
            </>
          )}

          {stage === "generatingoriginal" && (
            <>
              {/* <div className="flex justify-center items-center flex-col h-screen">
                <img
                  className="w-36 h-36"
                  src="https://media1.giphy.com/media/d3mlGIM8WBQbQfVC/giphy.gif?cid=ecf05e47uzo43f4crubcoj6tu3wevbm2ujq3ddx1rubru1tn&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                  alt="Smiley"
                />
                <h2>I am preparing a great sentence for you, please wait...</h2>
              </div> */}

              <Modal show={true} popup size="md">
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <img src="https://thumbs.dreamstime.com/b/blue-smiley-face-button-15880828.jpg"></img>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      <p>
                        I am preparing a great sentence for you, please wait...
                      </p>
                    </h3>
                    <span className="animate-pulse text-3xl">
                      .................
                    </span>
                  </div>
                </Modal.Body>
              </Modal>
            </>
          )}
          {/* have change it back to stage === "read" */}
          {stage === "read" && (
            <div className="">
              <div className="flex justify-center flex-col items-center">
                <h2 className="font-semibold font-[Poppins] text-3xl">
                  Read the Folowing paragraph
                </h2>
                <span className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">
                  you have {timer} seconds to read it.
                </span>
              </div>

              <SpeakingDiv
                className="original-para"
                autoPlay={true}
                allowPause={true}
                allowReplay={true}
              >
                {originalPara}
              </SpeakingDiv>
            </div>
          )}
          {stage === "record" && (
            <AudioToTextInput
              onRecordingStart={() => {}}
              onStopAndTranscriptionStart={() => {
                // setLoading(true);
              }}
              onVoiceTranscribed={async (msg) => {
                console.log("onVoiceTranscribed: ", msg);
                setStudentPara(msg);

                let aiFeedback = await handleFeedback(
                  originalPara,
                  studentPara
                );
                let parsedAiFeedback = parseFeedback(aiFeedback);
                onFeedback(parsedAiFeedback || "nothing recorded");

                // setLoading(false);
              }}
            />
          )}
          {stage === "feedback" && (
            <div className="flex justify-center items-center p-2 m-2 h-screen">
              <Card className="w-[40%] bg-[#d6e1f0]">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <p>Feedback</p>
                </h5>
                <div>{feedback}</div>
                Total Marks: {feedback.totalMarks} Marks Obtained:{" "}
                {feedback.marks}
                <Button
                  className="btn-continue bg-[#00a4f5]"
                  onClick={nextProblem}
                >
                  Continue
                </Button>
              </Card>
            </div>
          )}
          {error && <div className="error">{error}</div>}
        </div>
      </div>

      {loading && (
        <div className="loading-animation">
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
        </div>
      )}
    </div>
  );
};

export function Assignment() {
  const assignment = [
    { id: 1, problem: "ReadAndRephrase" },
    { id: 2, problem: "ReadAndRephrase" },
    { id: 3, problem: "ReadAndRephrase" },
  ];
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [assignmentFeedback, setAssignmentFeedback] = useState([]);

  const nextProblem = () => {
    if (currentProblemIndex < assignment.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      setCurrentProblemIndex(null); // Indicate that we've reached the end
    }
  };

  const renderProblem = () => {
    if (currentProblemIndex === null) {
      return <End assignmentFeedback={assignmentFeedback} />;
    }

    const currentProblem = assignment[currentProblemIndex];
    switch (currentProblem.problem) {
      case "ReadAndRephrase":
        return (
          <ReadAndRephrase
            key={currentProblem.id}
            id={currentProblem.id}
            nextProblem={nextProblem}
            onFeedback={(newFeedback) =>
              setAssignmentFeedback([...assignmentFeedback, newFeedback])
            }
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderProblem()}</div>;
}

export default function App() {
  return (
    <div className="assignment-container">
      <Assignment />
    </div>
  );
}
