# KeFetchUp!

[![Build Status](https://img.shields.io/travis/KazanExpress/kefetchup/master.svg?logo=travis&style=flat-square)](https://travis-ci.org/KazanExpress/kefetchup) [![Coverage status](https://img.shields.io/coveralls/github/KazanExpress/kefetchup/master.svg?style=flat-square)](https://coveralls.io/github/KazanExpress/kefetchup?branch=master) [![npm](https://img.shields.io/npm/v/kefetchup.svg?style=flat-square)](https://www.npmjs.com/package/kefetchup) 
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/minzip/kefetchup.svg?style=flat-square)]() [![dependencies (minified)](https://img.shields.io/badge/dependencies-none-yellow.svg?style=flat-square)]()

> Simple fetch client API to spice up your application

`npm i -S kefetchup`

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
  ResponseException,

  // A comprehensive list of all possible HTTP errors.
  ResponseErrors,

  // A helper function to encode query params into a string.
  withQuery
} from 'kefetchup'
```

You'll be fine extending `JsonAPIClient` in most cases. Though, for finer control we recommend using `GenericAPIClient`.

A typical usage example is as follows (using `GenericAPIClient`, for example):

```js
import { GenericAPIClient, ResponseException, ResponseErrors, withQuery } from 'kefetchup'

class MyApiClient extends GenericAPIClient {

  /**
   * You can override this method to pipe all your responses with it.
   * @override to recieve json instead of a fetch response (like in JsonAPIClient)
   * 
   * @param resp {Response} a standard fetch response: https://developer.mozilla.org/en-US/docs/Web/API/Response
   */
  responseHandler(resp) {

    // Let's say we want to throw errors for 400+ statuses too
    if (resp.status >= 400) {
      throw new ResponseException(ResponseErrors[resp.status], resp.status, resp);
    }

    return resp.json();
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
  getImportantThingsList() {
    // Send a GET request to 'https://my-api-server.com/api/important-things?importance=high&amount=5'
    return this.get(withQuery('/important-things', {
      importance: 'high',
      amount: 5
    }));
  }
}
```

And then just

```js
const myApi = new MyApiClient();

myApi.getImportantThingsList().then(things => {
  // do things with your important things...
});
```
