const { MarkovMachine } = require("./markov");


describe('markov machine', function () {
  test('makes chains of words that follow each word', function () {
    let mm = new MarkovMachine("a b c a d a");
    expect(mm.chains).toEqual(new Map([
      ["a", ["b", "d", null]],
      ["b", ["c"]],
      ["c", ["a"]],
      ["d", ["a"]]]));
  });

  test('choose_random_el selects random element from array', function () {
    expect(MarkovMachine.choose_random_el([1, 1, 1, 1])).toEqual(1);
    expect([1, 2, 3, 4]).toContain(MarkovMachine.choose_random_el([1, 2, 3, 4]));
  });

  test('makeText output follows chain pattern', function () {
    let mm = new MarkovMachine("a b c d");
    let text = mm.makeText();
    expect(["a b c d", "b c d", "c d", "d"]).toContain(text);
  });

  test('makeText output falls below maximum numWords', function () {
    let mm = new MarkovMachine("a b c d");
    let text = mm.makeText(2);
    expect(["a b", "b c", "c d", "d"]).toContain(text);
  });

});