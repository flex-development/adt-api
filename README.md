# Apple Developer Token API

Generate JSON Web Tokens for use with the Apple Music API

[![TypeScript](https://badgen.net/badge/-/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Overview

[Getting Started](#getting-started)  
[Usage](#usage)  
[Built With](#built-with)  
[Contributing](docs/CONTRIBUTING.md)  
[Deployment](docs/DEPLOYMENT.md)

## Getting Started

The Apple Developer Token (ADT) API is a single serverless endpoint that can be
used to generate developer tokens suitable for use with the Apple Music API.

For more information, see [Getting Keys and Creating Tokens][1] from the Apple
Developer docs.

## Usage

- **URL**: `https://adt-api.flexdevelopment.vercel.app`
- **Method**: `GET`

### :construction: Authentication

**TODO**: Update documentation.

### :construction: Query Parameters

| name | type | default | required | description |
| ---- | ---- | ------- | -------- | ----------- |
|      |      |         |          |             |

### :construction: Sample Response

**TODO**: Update documentation.

### Errors

If an error is thrown, it will have the following shape:

```json
{
  "name": "GeneralError",
  "message": "",
  "code": 500,
  "className": "general-error",
  "data": {
    "headers": "",
    "query": {}
  },
  "errors": {}
}
```

## Built With

- [Vercel][2] - Hosting platform for serverless functions
- [jsonwebtoken][3] - JSON Web Token implementation for Node.js

[1]:
  https://developer.apple.com/documentation/applemusicapi/getting_keys_and_creating_tokens
[2]: https://vercel.com/docs/serverless-functions/introduction
[3]: https://github.com/auth0/node-jsonwebtoken
