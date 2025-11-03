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
  .json()
  .text()
  .blob()
*/

document.addEventListener('DOMContentLoaded', init);

const BASEURL = 'https://jsonplaceholder.typicode.com/';

function init() {
  //when the html has been read
}

function getData() {
  //retrieve an array of data from the API
  // fetch(Request)
  // Request(URL, options)
  // URL (string)
  // options (settings and Headers)
  // Headers (name: value) pairs
  // Response (body and Headers)
  // body: string, FormData, Blob, URLSearchParams, ArrayBuffer, TypedArray, ReadableStream
}
