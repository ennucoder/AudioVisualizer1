class Microphone {
    constructor(){
        this.initialized = false;
        navigator.mediaDevices.getUserMedia({audio:true})
        .then(function(stream){
            this.auduioContext = new AudioContext();
            this.microphone = this.auduioContext.createMediaStreamSource(stream);
            this.analyser = this.auduioContext.createAnalyser();
            this.analyser.fftSize = 512;
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);
            this.microphone.connect(this.analyser);
            this.initialized = true;


        }.bind(this)).catch(function(err){
            alert(err);
        });

    }
    getSamples(){
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e/128 -1);
        return normSamples;

    }
    getVolume(){

    }

}
const microphone = new Microphone();
console.log(microphone);