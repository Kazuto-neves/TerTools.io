export const morseDictionary = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 
    'Z': '--..', '0': '-----', '1': '.----', '2': '..---', 
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', 
    '7': '--...', '8': '---..', '9': '----.', ' ': '/'
  };
  
  export const textDictionary = Object.entries(morseDictionary).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});
  
  export function textToMorse(text) {
    return text.toUpperCase().split('').map(char => morseDictionary[char] || '').join(' ');
  }
  
  export function morseToText(morse) {
    return morse.split(' ').map(code => textDictionary[code] || '').join('');
  }
  
  export function autoConvert(input) {
    if (/^[\.\- \/]+$/.test(input)) {
      return morseToText(input);
    } else {
      return textToMorse(input);
    }
  }
  