const { MarkovMachine } = require("./bigramMarkov");

describe('markov machine', function () {
  test('makes chains for bigram keys correctly', function () {
    let mm = new MarkovMachine("a b c a b d");

    expect(mm.chains).toEqual(new Map([
      ["a b", ["c", "d"]],
      ["b c", ["a"]],
      ["c a", ["b"]],
      ["b d", [null]]
      ]));
  });

  test('choose_random_el selects random element from array', function () {
    expect(MarkovMachine.choose_random_el([1, 1, 1, 1])).toEqual(1);
    expect([1, 2, 3, 4]).toContain(MarkovMachine.choose_random_el([1, 2, 3, 4]));
  });

  test('makeText output follows bigram chain pattern', function () {
    let mm = new MarkovMachine("a b c d");
    let text = mm.makeText();
    expect(["a b c d", "b c d", "c d", "d"]).toContain(text);
  });

  test('makeText output falls below maximum numWords', function () {
    let mm = new MarkovMachine("a b c d");
    let text = mm.makeText(2);
    expect(["a b", "b c", "c d", "d"]).toContain(text);
  });

  test('generates valid text', function () {
    let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "];
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.makeText();
    expect(output.endsWith('hat')).toBe(true);

    let outputWords = mm.makeText().split(/[ \r\n]+/);

    for (let i = 0; i < outputWords.length - 1; i++) {
      expect(bigrams).toContain(outputWords[i] + " " + outputWords[i + 1]);
    }
  });

  test('cuts off at length', function () {
    let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "];
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.makeText(2);

    let outputWords = output.split(/[ \r\n]+/);
    expect([1, 2]).toContain(outputWords.length);
  });
});