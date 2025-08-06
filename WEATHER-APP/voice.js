function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    document.getElementById("cityInput").value = event.results[0][0].transcript;
    getWeather();
  };
}
