class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length - 1; i ++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
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
      output.push(randomKey);
      randomKey = MarkovMachine.choose_random_el(this.chains.get(randomKey));
    }
    return output.join(" ");
  }
}


module.exports = {
  MarkovMachine,
};

