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

The Apple Developer Token (ADT) API is a serverless REST API that can be used to
generate JSON Web Tokens (JWTs) suitable for use with the Apple Music API.

For more information, see [Getting Keys and Creating Tokens][1] from the Apple
Developer docs.

## Usage

### Create Developer Token

Generates a JSON Web Token (JWT) suitable for use with the Apple Music API.

- **URL**: `https://adt-api.flexdevelopment.vercel.app/token`
- **Method**: `POST`

#### Authentication

The ADT API uses Basic Authentication to retrieive the Musickit identifier and
private key used to generate developer tokens.

**Example**

```dotenv
APPLE_MUSICKIT_PRIVATE_KEY='-----BEGIN PRIVATE
KEY-----\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/
XX\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nXXX
+XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
+XXXXX\nXXXXXX\n-----END PRIVATE KEY-----\n'
APPLE_MUSICKIT_PRIVATE_KEY_ID='XXXXXXXXXX'
```

#### Query Parameters

| name        | type     | default    | required | description           |
| ----------- | -------- | ---------- | -------- | --------------------- |
| `expiresIn` | `number` | `15777000` | false    | Token expiration time |
| `team`      | `string` |            | true     | Apple Team ID         |

**Notes**

- `expiresIn` must not exceed `15777000` (6 months in seconds)
- `team` is a 10-character string that can be retrieved from your developer
  account
- A `NotAuthenticated` error will be thrown if `team` is invalid

#### Sample Response

```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
```

### Documentation

Retrieve the ADT API documentation as a JSON object. Documentation follows
[OpenAPI Specification v3.0.0 standards][2].

- **URL**: `https://adt-api.flexdevelopment.vercel.app`
- **Method**: `GET`

#### Sample Response

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Apple Developer Token API",
    "description": "Generate JSON Web Tokens for use with the Apple Music API.",
    "termsOfService": "",
    "contact": {
      "name": "GitHub",
      "url": "https://github.com/flex-development/adt-api"
    },
    "license": {
      "name": "License - BSD 3 Clause",
      "url": "https://spdx.org/licenses/BSD-3-Clause.html"
    },
    "version": "1.0.0"
  },
  "servers": [
    {
      "description": "Production",
      "url": "https://adt-api.flexdevelopment.vercel.app"
    },
    {
      "description": "Next",
      "url": "https://adt-api-git-next-flexdevelopment.vercel.app"
    }
  ],
  "tags": [],
  "paths": {
    "/token": {
      "post": {
        "summary": "Create an Apple Developer token",
        "description": "Generates a JSON Web Token (JWT) suitable for use with the Apple Music API.",
        "operationId": "token-post",
        "parameters": [
          {
            "name": "expiresIn",
            "in": "query",
            "description": "Expiration time of registered claim key in seconds. Must not exceed `15777000` (6 months in seconds)",
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "team",
            "in": "query",
            "description": "Apple Team ID",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AppleDeveloperToken"
                }
              }
            }
          },
          "400": {
            "description": "BadRequest",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BadRequest"
                }
              }
            }
          },
          "401": {
            "description": "NotAuthenticated",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotAuthenticated"
                }
              }
            }
          },
          "500": {
            "description": "GeneralError",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GeneralError"
                }
              }
            }
          }
        },
        "security": ["BasicAuth"]
      }
    }
  },
  "components": {
    "schemas": {
      "AppleDeveloperToken": {
        "type": "string"
      },
      "BadRequest": {
        "type": "object",
        "properties": {
          "className": {
            "type": "string",
            "example": "bad-request"
          },
          "code": {
            "type": "integer",
            "example": 400
          },
          "data": {
            "type": "object",
            "example": {}
          },
          "errors": {
            "type": "object",
            "example": {}
          },
          "message": {
            "type": "string"
          },
          "name": {
            "type": "string",
            "example": "BadRequest"
          }
        }
      },
      "GeneralError": {
        "type": "object",
        "properties": {
          "className": {
            "type": "string",
            "example": "general-error"
          },
          "code": {
            "type": "integer",
            "example": 500
          },
          "data": {
            "type": "object",
            "example": {}
          },
          "errors": {
            "type": "object",
            "example": {}
          },
          "message": {
            "type": "string"
          },
          "name": {
            "type": "string",
            "example": "GeneralError"
          }
        }
      },
      "NotAuthenticated": {
        "type": "object",
        "properties": {
          "className": {
            "type": "string",
            "example": "not-authenticated"
          },
          "code": {
            "type": "integer",
            "example": 401
          },
          "data": {
            "type": "object",
            "example": {}
          },
          "errors": {
            "type": "object",
            "example": {}
          },
          "message": {
            "type": "string"
          },
          "name": {
            "type": "string",
            "example": "NotAuthenticated"
          }
        }
      },
      "NotImplemented": {
        "type": "object",
        "properties": {
          "className": {
            "type": "string",
            "example": "not-implemented"
          },
          "code": {
            "type": "integer",
            "example": 501
          },
          "data": {
            "type": "object",
            "example": {}
          },
          "errors": {
            "type": "object",
            "example": {}
          },
          "message": {
            "type": "string"
          },
          "name": {
            "type": "string",
            "example": "NotImplemented"
          }
        }
      }
    },
    "securitySchemes": {
      "BasicAuth": {
        "description": "Musickit identifier and private key",
        "type": "http",
        "scheme": "basic"
      }
    }
  },
  "externalDocs": {
    "description": "Apple Developer Docs - Getting Keys and Creating Tokens",
    "url": "https://developer.apple.com/documentation/applemusicapi/getting_keys_and_creating_tokens"
  }
}
```

### Errors

If an error is thrown, it will have the following shape:

```json
{
  "name": "GeneralError",
  "message": "",
  "code": 500,
  "className": "general-error",
  "data": {},
  "errors": {}
}
```

## Built With

- [Vercel][3] - Hosting platform for serverless functions
- [jsonwebtoken][4] - JSON Web Token implementation for Node.js

[1]:
  https://developer.apple.com/documentation/applemusicapi/getting_keys_and_creating_tokens
[2]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md
[3]: https://vercel.com/docs/serverless-functions/introduction
[4]: https://github.com/auth0/node-jsonwebtoken
