import { useState } from "react";
import fetchTextFromAudio from "./TextFromAudio";
import { ReactMic } from "react-mic";
import { Button, Spinner } from "flowbite-react";
import { BsSkipStartCircle, BsStopCircle } from "react-icons/bs";
function AudioToTextInput({
  onRecordingStart,
  onStopAndTranscriptionStart,
  onVoiceTranscribed,
}) {
  const [record, setRecord] = useState(false);
  const [status, setStatus] = useState("Press start to record your voice");
  const [inputValue, setInputValue] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [dirty, setDirty] = useState(false);

  const startRecording = () => {
    setRecord(true);
    setDirty(true);
    setStatus("Recording is in progress. Press stop button once you are done.");
    setShowSubmit(false);
    onRecordingStart();
  };

  const stopRecording = () => {
    setRecord(false);
    setStatus("Please wait while we are transcribing your voice to text.");
    onStopAndTranscriptionStart();
  };

  const onData = (recordedBlob) => {
    // console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = async (recordedBlob) => {
    console.log(`onStop invoked`);
    // console.log("recordedBlob is: ", recordedBlob);
    setTranscribing(true);
    const txt = await fetchTextFromAudio(recordedBlob.blob);
    console.log("txt : ", txt);
    setInputValue(txt.text);
    setTranscribing(false);
    setStatus("Please wait while we are evaluating your response.");
    setShowSubmit(true);
    setDirty(true);
    onVoiceTranscribed(txt.text);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <img src="/personSpeaking2.png" className="w-[25%] h-[25%] m-2"></img>
      <div className="sound-wave-wrapper">
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#04acf5"
          backgroundColor="#ffffff"
          echoCancellation={true}
          noiseSuppression={true}
        />
        <div className="flex flex-col justify-center items-center">
          <p>{status}</p>

          <div className="flex gap-1">
            <Button
              size="small"
              onClick={startRecording}
              className="p-2 bg-[#04acf5]"
            >
              Start
            </Button>

            {true && (
              <Button
                size="small"
                onClick={stopRecording}
                className="p-2 bg-[#04acf5]"
              >
                Stop
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioToTextInput;
