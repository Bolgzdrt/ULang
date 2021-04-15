<template>
  <div class="recordCard">
    <div class="word">
      <p>{{ word }}</p>
      <p>{{ phonetic }}</p>
    </div>
    <div class="entry">
      <div>
        <img :src="img_path" alt="recording microphone" class="microphone" @click="startButton($event)">
      </div>
      <p class="error" v-if="entryErr">{{info_message}}</p>
    </div>
    <transition name="modalFade" v-if="resultModal">
      <div class="modalBackdrop">
        <div class="modal">
          <p class="correct" v-if="correct">Correct!</p>
          <div class="incorrect" v-if="!correct">
            <p class="result">Incorrect</p>
          </div>
          <div class="buttonBox">
            <button class="submitButton" @click="cont">Continue</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AccentButtons from '@/components/AccentButtons.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'RecordCard',
  components: { AccentButtons },
  props: ['word'],
  data() {
    return {
      phonetic: '',
      correct: false,
      entryErr: false,
      resultModal: false,
      recognition: {},
      recognizing: false,
      final_transcript: '',
      ignore_onend: false,
      start_timestamp: '',
      info_message: '',
      img_path: require('@/assets/pngs/Mic.png')
    }
  },
  methods: {
    ...mapGetters('settings', ['getLanguage']),
    //TODO: Update to check recording correctness
    correctCheck() {
      if (this.final_transcript) {
        if (this.final_transcript === this.$props.word) {
          this.correct = true
        } else {
          this.correct = false
        }
        console.log(this.correct)
        this.resultModal = true
        if (this.entryErr) {this.entryErr = false}
      } else {
        this.entryErr = true
      }
    },
    cont() {
      this.resultModal = false
      this.final_transcript = ''
      this.$emit('nextCard', this.correct)
    },
    startButton(event) {
      // If listening, turn off listening
      if (this.recognizing) {
        this.recognition.stop()
        return
      }
      console.log(this.recognition)
      const langs = [
        ['Deutsch', 'de-DE'],
        ['English', 'en-US'],
        ['Spanish', 'es-MX'],
        ['French', 'fr-FR'],
        ['Italian', 'it-IT'],
        ['Dutch', 'nl-NL'],
        ['Polish', 'pl-PL'],
        ['Portuguese', 'pt-PT'],
        ['Romanian', 'ro-RO'],
        // TODO: Find Swedish
      ]
      this.showInfo("")
      this.final_transcript = ''
      this.recognition.lang = langs.find(entry => { return entry[0] == this.getLanguage()})
      this.recognition.start()
      this.ignore_onend = false
      console.log("mic slash?")
      this.start_timestamp = event.timeStamp
    },
    linebreak(s) {
      const two_line = /\n\n/g
      const one_line = /\n/g
      return s.replace(two_line, '<p></p>').replace(one_line, '<br>')
    },
    capitalize(s) {
        const first_char = /\S/
      return s.replace(first_char, function (m) {
        return m.toUpperCase()
      })
    },
    showInfo(s) {
      this.entryErr = true;
      this.img_path = require('@/assets/pngs/Mic_grey.png')
      switch(s) {
        case "info_no_speech":
          this.info_message = "No speech was detected. You may need to adjust your microphone settings";
          break;
        case "info_no_microphone":
          this.info_message = " No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly.";
          break;
        case "info_allow":
          this.info_message = "Click the 'Allow' button above to enable your microphone";
          break;
        case "info_denied":
          this.info_message = "Permission to use microphone was denied.";
          break;
        case "info_blocked":
          this.info_message = "Permission to use microphone is blocked.";
          break;
        case "info_upgrade":
          this.info_message = "Web Speech API is not supported by this browser.";
          break;
        case "":
          this.info_message = "";
          this.img_path = require('@/assets/pngs/Mic_grey.png')
          this.entryErr = false;
          break;
      }
    },
  },
  created() {
    //TODO: get phonetic spelling somehow
    //this.phonetic = "phonetic spelling goes here"
    if (!('webkitSpeechRecognition' in window)) {
      // Tell the user that they need to upgrade their browser
      console.log("gotta blur the mic")
      this.showInfo('info_upgrade')
    } else {
      console.log("mic unblur")
      this.recognition = new webkitSpeechRecognition()
      this.recognition.continuous = true
      var pronunciations = this
      this.recognition.onstart = function () {
        pronunciations.recognizing = true
        pronunciations.img_path = require('@/assets/pngs/Mic_orange.png')
      }
      // Error handling
      this.recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
          pronunciations.img_path = require('@/assets/pngs/Mic.png')
          pronunciations.showInfo('info_no_speech')
          pronunciations.ignore_onend = true
        }
        if (event.error == 'audio-capture') {
          pronunciations.img_path = require('@/assets/pngs/Mic.png')
          pronunciations.showInfo('info_no_microphone')
          pronunciations.ignore_onend = true
        }
        if (event.error == 'not-allowed') {
          if (event.timeStamp - pronunciations.start_timestamp < 100) {
            pronunciations.showInfo('info_blocked')
          } else {
            pronunciations.showInfo('info_denied')
          }
          pronunciations.ignore_onend = true
        }
      }
      this.recognition.onend = function () {
        pronunciations.recognizing = false
        if (pronunciations.ignore_onend) {
          return
        }
        // Go back to base mic image
        pronunciations.img_path = require('@/assets/pngs/Mic.png')
        // If no words were picked up
        if (!pronunciations.final_transcript) {
          return
        }
        // No info to show
        pronunciations.showInfo('')
      }
      this.recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            pronunciations.final_transcript += event.results[i][0].transcript
          } 
        }
        pronunciations.final_transcript = pronunciations.capitalize(pronunciations.final_transcript)
        if (pronunciations.final_transcript) {
          console.log(pronunciations.final_transcript)
          this.stop()
          pronunciations.correctCheck()
        }
      }
    }
  }
}
</script>

<style scoped>
.recordCard {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  height: 35em;
  width: 50em;
}
.word > p {
  font-size: 4em;
}
.textBox {
  width: 20em;
  border: 0px solid #000000;
  border-bottom-width: 1px;
  background-color: transparent;
  font-size: 2em;
  outline: none;
  margin-bottom: 20px;
}
button {
  height: 43px;
  width: 145px;
  border-radius: 5px;
  font-size: 120%;
  transition: 0.1s;
  outline: none;
  border: none;
  filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.3));
}
button:hover {
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
  cursor: pointer;
}
.submitButton {
  background: var(--purple);
  color: white;
}
.submitButton:hover {
  background: #5b49d0;
}
.error {
  color: red;
  font-size: 2em;
  padding-top: 20px;
}
.modalBackdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  border-radius: 5px;
  width: 12em;
  min-width: 400px;
  height: 5em;
  min-height: 220px;
}
.modal > .buttonBox {
  margin-top: 20px;
}
.correct {
  font-size: 2em;
  color: green;
}
.incorrect {
  font-size: 2em;
}
.incorrect > .result {
  color: red;
}
.microphone:hover {
  cursor: pointer;
}
</style>
