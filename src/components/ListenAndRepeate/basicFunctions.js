import { speaks } from "./SpeekersName";
export async function handleAssistantResponse(
  response,
  IsBrowserTalking,
  setIsBrowserTalking
) {
  // The response from the assistant
  let assistantResponseText = response;

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  // Create a new SpeechSynthesisUtterance instance
  const msg = new SpeechSynthesisUtterance();
  msg.volume = 1; // 0 to 1
  msg.rate = 1; // 0.1 to 10
  msg.pitch = 1; // 0 to 2
  msg.text = assistantResponseText;

  // Set the voice and language
  const desiredVoiceName = speaks[0].name; // or any other number based on the voice you want

  let voices = speechSynthesis.getVoices();
  let desiredVoice = voices.find((voice) => voice.name === desiredVoiceName);

  // If the desired voice is found, use it; otherwise, use the first available voice
  msg.voice = desiredVoice ? desiredVoice : voices[0];
  msg.onstart = () => {
    setIsBrowserTalking("chat-bot");
  };

  msg.onend = () => {
    setIsBrowserTalking(null);
  };
  speechSynthesis.speak(msg);
}

export async function fetchChatCompletion(messages) {
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
