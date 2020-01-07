
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
        var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
        
        var pages = ['home', 'contact', 'about', 'clients'];
        var grammer = '#JSGF V1.0; grammer pages; public <pages> = ' + pages.join(' | ') + ' ;'
        
        var recognition = new SpeechRecognition();
        var speechRecognitionList = new SpeechGrammarList();

        speechRecognitionList.addFromString(grammer, 1);
        
        recognition.grammers = speechRecognitionList;
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        
        var diagnostic = document.getElementById('word_box')
        pages.forEach((page, index) => {
            console.log(page, index)
        })
        
        document.getElementById('fab').onclick = function(){
            recognition.start();
            console.log('let\'s go');
        }

        recognition.onresult = function(event){
            var last = event.results.length - 1;
            var page = event.results[last][0].transcript;
            diagnostic.textContent = page;
            console.log(pages.indexOf(page));
            if(pages.indexOf(page) == -1){
                location.href = 'notfound.html';
            }else if(page == 'home'){
                location.href = 'index.html';
            }else{
                location.href = `${page}.html`;
            }
            //console.log('confidence: ', event.results[0][0].confidence);
        }

        recognition.onspeechend = function(){
            recognition.stop();
        }

        recognition.onnomatch = function(event){
            diagnostic.textContent = "Didn't get that, may be your accent :)";
            location.href = 'notfound.html';
        }

        recognition.onerror = function(event){
            diagnostic.textContent = "An error occured " + event.error;
        }

document.getElementById('fab').onclick = function(){
    var audio = new Audio('assets/pop.mp3');
    audio.play();
}
