const fs = require('fs');
const process = require('process');
const axios = require('axios');
const cheerio = require('cheerio');
const { MarkovMachine } = require('./markov');

function generateMarkovText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

function generateTextFromFile(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      generateMarkovText(data);
    }
  }
)}

async function generateTextFromUrl(url) {
  try {
    let resp = await axios.get(url);

    const $ = cheerio.load(resp.data);

    const text = $('body').text();

    return generateMarkovText(text);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}


let [method, path] = process.argv.slice(2);

if (method === "file") {
  generateTextFromFile(path);
}

else if (method === "url") {
  generateTextFromUrl(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
