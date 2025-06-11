/* eslint-disable @typescript-eslint/no-explicit-any */
export const startVoiceRecognition = (
  onResult: (transcript: string) => void,
  onError: (error: string) => void,
) => {
  if (!("webkitSpeechRecognition" in window)) {
    onError(
      "La reconnaissance vocale n'est pas prise en charge par ce navigateur.",
    );
    return;
  }

  const recognition = new (window as any).webkitSpeechRecognition();
  recognition.lang = "fr-FR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    onError(event.error);
  };

  recognition.start();
};
