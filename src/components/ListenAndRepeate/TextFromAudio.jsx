const fetchTextFromAudio = async (blob) => {
  try {
    const file = new File([blob], "recording.webm", { type: "audio/webm" });
    const formData = new FormData();
    formData.append("model", "whisper-1");
    formData.append("file", file);
    formData.append("language", "en");

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Oops! Something went wrong while transcribing the audio. Please try again later."
    );
  }
};
export default fetchTextFromAudio;
