class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length - 1; i ++) {
      let bigram = this.words[i] + " " + this.words[i + 1];
      let nextWord = this.words[i + 2] || null;

      if (chains.has(bigram)) chains.get(bigram).push(nextWord);
      else chains.set(bigram, [nextWord]);
    }

    this.chains = chains;
  }

  static choose_random_el(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let randomKey = MarkovMachine.choose_random_el(keys);
    let output = [];
    
    while (output.length < numWords && randomKey !== null) {
      let [word1, word2] = randomKey.split(" ");
      output.push(word1);
      
      let possibleNextWords = this.chains.get(randomKey);
      
      if (possibleNextWords) {

        let nextWord = MarkovMachine.choose_random_el(possibleNextWords);
        randomKey = word2 + " " + nextWord;
      } else {

        randomKey = null;
      }
    }
    return output.join(" ");
  }
}


module.exports = {
  MarkovMachine,
};

