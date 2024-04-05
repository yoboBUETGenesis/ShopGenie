<script>
    // @ts-ignore
    let recognition;
  
    function startRecognition() {
      // @ts-ignore
      recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US'; // Set the language for speech recognition
  
      // @ts-ignore
      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        console.log('Transcript:', transcript);
        // You can process the transcript further (e.g., send it to a search function)
      };
  
      // @ts-ignore
      recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
      };
  
      recognition.onend = function() {
        console.log('Speech recognition ended');
      };
  
      recognition.start();
    }
  
    function stopRecognition() {
      // @ts-ignore
      if (recognition) {
        recognition.stop();
      }
    }
  </script>
  
  <button on:click={startRecognition}>Start Voice Search</button>
  <button on:click={stopRecognition}>Stop Voice Search</button>