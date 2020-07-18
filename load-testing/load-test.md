
## Config Details

    config:
      target: 'http://localhost:3001'
      http:
        pool: 20
      phases:
        - duration: 200
          arrivalRate: 10
    scenarios:
      - flow:
        - loop:
          - get:
            url: "/api/products?id={{$randomNumber(1,10000000)}}"
                count: 100


## Sample Results:

    Elapsed time: 9 minutes, 41 seconds
      Scenarios launched:  0
      Scenarios completed: 0
      Requests completed:  5733
      Mean response/sec: 577.36
      Response time (msec):
        min: 3198.3
        max: 3712.9
        median: 3330.7
        p95: 3581.6
        p99: 3607.6
      Codes:
        200: 5733
