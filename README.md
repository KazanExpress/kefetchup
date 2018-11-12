<h1 align="center">
  <img src="logo/color-text.svg"/> 
</h1>

<p align="center">
  <a href="https://travis-ci.org/KazanExpress/kefetchup"><img src="https://img.shields.io/travis/KazanExpress/kefetchup/master.svg?logo=travis&amp;style=flat-square" alt="Build Status" /></a> <a href="https://coveralls.io/github/KazanExpress/kefetchup?branch=master"><img src="https://img.shields.io/coveralls/github/KazanExpress/kefetchup/master.svg?style=flat-square" alt="Coverage status" /></a> <a href="https://www.npmjs.com/package/kefetchup"><img src="https://img.shields.io/npm/v/kefetchup.svg?style=flat-square" alt="npm" /></a> 
  <a href=""><img src="https://img.shields.io/bundlephobia/minzip/kefetchup.svg?style=flat-square" alt="npm bundle size (minified)" /></a> <a href=""><img src="https://img.shields.io/badge/dependencies-none-yellow.svg?style=flat-square" alt="dependencies (minified)" /></a>
</p>

<p align="center">
  Simple fetch client API to spice up your application
</p>

<p align="center"><code>npm i -S kefetchup</code></p>

## What is it?

It's just a small and very extendable [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) client made for our company's purposes.

Kefetchup aims to help you move your API calls into a higher generic abstraction by providing necessary tools for it.

## Basic operation principles (API TLDR)

`kefetchup` provides several classes and utilities to help you with building your custom API client:

```js
import {
  // A generic wrap around fetch to provide rich customization and exception handling. 
  // Outputs a standard fetch response for each request.
  GenericAPIClient,

  // A simple class that extends GenericAPIClient.
  // The only difference is that it returns straight parsed JSON object, instead of a fetch response.
  JsonAPIClient,

  // Same as previous, but returns plain strings instead of json.
  TextAPIClient,

  // An exception class to use in your error handlers for server-returned errors. Provides statuses and stack traces.
  ResponseError,

  // A comprehensive list of all possible HTTP errors.
  ResponseErrors,

  // A helper function to encode query params into a string.
  withQuery
} from 'kefetchup'
```

You'll be fine extending `JsonAPIClient` in most cases. Though, for finer control we recommend using `GenericAPIClient`.

<details><summary>Usage example</summary>

A typical usage example is as follows (using `GenericAPIClient`):

```js
import { GenericAPIClient, ResponseError, withQuery } from 'kefetchup'

class MyApiClient extends GenericAPIClient {

  /**
   * You can override this method to pipe all your responses with it.
   * @override to recieve json instead of a fetch response (like in JsonAPIClient)
   * 
   * @param resp {Response} a standard fetch response: https://developer.mozilla.org/en-US/docs/Web/API/Response
   */
  async responseHandler(response) {
    const resp = super.responseHandler(response);

    // Let's say we want to throw errors for 400+ statuses too
    if (resp.status >= 400) {
      throw new ResponseError(MyApiClient.handleStatus(resp.status), resp.status, resp);
    }

    return await resp.json();
  }

  constructor(myVeryImportantSetting) {
    super(
      // Provide a base endpoint for your client
      'https://my-api-server.com/api',

      // Provide generic request options used in most of your requests
      {
        // For example - common headers (here we want to send basic token with each request)
        headers: {
          'Authorization': 'Basic kjhkowgurgybihfjqwuoe968tgyib3jqipwfe08s79d=='
        }
      }
    );

    // Set a custom variable to the instace
    this.myVeryImportantSetting = myVeryImportantSetting;
  }

  // In class' body we can write custom method handlers for our API calls
  async getImportantThingsList() {
    try {
      // Send a GET request to 'https://my-api-server.com/api/important-things?importance=high&amount=5&type={value-of-myVeryImportantSetting}'
      return await this.get(withQuery('/important-things', {
        importance: 'high',
        amount: 5,
        type: this.myVeryImportantSetting
      }));
    } catch (e) {
      // e instanceof ResponseError === true
      // Here you can handle method-specific errors

      if (e.status === 401) {
        console.error('Token is incorrect for', e.data);

        return [];
      } else {
        throw e;
      }
    }
  }
}
```

And then just

```js
const myApi = new MyApiClient();

myApi.getImportantThingsList().then(things => {
  // do things with your important things...
}).catch(e => {
  // and catch your errors properly...
});
```

</details>
