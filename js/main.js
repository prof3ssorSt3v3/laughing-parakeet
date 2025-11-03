/*
URL
  hash, host, hostname, protocol, origin, href, port, pathname, searchParams
URLSearchParams
  get() set() append() delete() has() entries() size
Request
  GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD methods
Headers
  get() set() append() delete() has() entries() 
Response
  .ok .status .headers, .statusText, .url, .type (basic cors error opaque)
  .json() - the JS object from the JSON
  .text() - the string from the body (text, yaml, css, html, xml, js)
  .blob() - binary large object (img, video, audio)
*/

document.addEventListener('DOMContentLoaded', init);
const log = console.log;

const BASEURL = 'https://dummyjson.com/';

async function init() {
  //when the html has been read
  startLoad();

  const quotes = await getData();
  //wait for the fetch.then chain to resolve before assigning results to quotes
  buildCards(quotes);
}

function startLoad() {
  const content = document.querySelector('.content');
  content.innerHTML = `<p>Loading data....</p>`;
}

function getData() {
  // ?name=bob&type=guest
  //retrieve an array of data from the API
  // fetch(Request)
  // Request(URL, options)
  // URL (string)
  // options (settings and Headers)
  // Headers (name: value) pairs
  // Response (body and Headers)
  // body: string, FormData, Blob, URLSearchParams, ArrayBuffer, TypedArray, ReadableStream
  let str = BASEURL + 'quotes';
  let url = new URL(str);
  log(url.host); // www.dummyjson.com
  log(url.hostname); // www.dummyjson.com
  log(url.port); // 443
  log(url.protocol); // https:
  log(url.origin); // https://www.dummyjson.com:443
  log(url.pathname); // /quotes

  url.search = '?name=bob&type=guest';
  let params = url.searchParams;
  log(params.has('type')); //true
  log(params.has('name')); //true
  log(params.has('cheese')); //false
  params.set('cheese', 'cheddar');
  url.searchParams.set('flavour', 'chocolate');
  url.search = '';

  log(params.get('name')); //bob
  log(url.href);
  let pageURL = new URL(location.href);
  //turn the current Location of my page into a URL object
  let h = new Headers({});

  let req = new Request(url, {
    method: 'get',
    headers: {
      accept: 'application/json', //MIME-Type for a JSON file
      'X-steve': 'yep',
      'X-API-Key': 'k23jhk23jh4k23jh4k23jh4',
      //text/xml text/html text/txt image/jpg image/png video/mp4
    },
  });

  return fetch(req)
    .then((response) => {
      log(response); // Response() - not the whole body yet. just headers
      if (!response.ok) throw new Error('Failed to load json data');
      //wait for the body to load
      //convert the string in the body to json, or text, or binary data
      return response.json();
    })
    .then((data) => {
      log(data.quotes.length);
      // buildCards(data.quotes); //pass the array to the new function buildCards
      return data.quotes;
    })
    .catch((err) => {
      console.error(err.message);
      //failed to load the json
      //should tell the user
      return [];
    });
}

function buildCards(quotes) {
  const content = document.querySelector('.content');
  if (quotes.length === 0) {
    content.innerHTML = `<h2 class="error">Failed to fetch data from API`;
    return;
  }
  content.innerHTML = quotes
    .map(({ id, quote, author }) => {
      return `<div class="card" data-id="${id}">
      <p>${quote}</p>
      <h3>${author}</h3>
    </div>`;
    })
    .join('');
}
