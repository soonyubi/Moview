const request = require('request');
const cheerio = require('cheerio');

const url = 'https://m.kinolights.com/title/102750';

request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const title = $('h3.title-kr').text();
    console.log(`Movie title: ${title}`);
  }else{
    console.log("error",error);
  }
});