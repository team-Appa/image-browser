# Image Browser and Product Information Service

> This module features functionality for a musical instrument e-commerce store's primary product information.

## Related Projects
All Services for this page
  - Reviews https://github.com/Team-Katara/joel-service
  - Recently Viewed Items: https://github.com/Team-Katara/shraya-service
  - Similar Items: https://github.com/Team-Katara/kana-service
  - Proxy Server https://github.com/Team-Katara/john-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Make sure url has an id to load products, in the format of http://localhost:3001/api/products?id=
> Data is stored with one parent product, each contains an array variations. See db/model.js for schema.

## Requirements

- Node 6.13.0

### Install Dependencies

Within the root directory:

```sh
npm install
```

### Seed DB

Within the root directory:

```sh
npm run db:seed
```

### Run Service
Within the root directory:

```sh
npm start
```

### API endpoints

GET - http://localhost:3001/api/products?id=1  retrieves 1 product item by id
DELETE - http://localhost:3001/api/products?id=1 deletes 1 product item by id
PUT - http://localhost:3001/api/products?id=1 updates product by id per request body
POST - http://localhost:3001/api/products/ adds one product to end of db per request body


Expected Put Example
{
  "title": "test",
}

Expected Post Example
{
  "title": "test",
  "description": "Eum molestiae officiis pariatur sequi ipsum qui perspiciatis asperiores. Vel maxime ullam. Voluptatibus ex soluta dolore corrupti aspernatur sed minus. Sit tempore ut fuga. Est deleniti magnam nam explicabo harum.",
  "rating": 1,
  "variations": [
    {
      "color": "fuchsia",
      "cost": 810,
      "images": [
          {
            "src": "http://picsum.photos/seed/398/846/1038"
          }
      ]
    }
  ]
}