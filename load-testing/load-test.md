
## Config Details

    config:
      target: 'http://localhost:3001'
      http:
        pool: 20
      phases:
        - duration: 280
          arrivalRate: 10
    scenarios:
      - flow:
          - loop:
            - get:
                url: "/api/products?id={{$randomNumber(1,10000000)}}"
            count: 100


## Sample Results:

    Summary report @ 11:14:13(-0700) 2020-07-18
      Scenarios launched:  2800
      Scenarios completed: 2800
      Requests completed:  280000
      Mean response/sec: 551.8
      Response time (msec):
        min: 1.5
        max: 6460.7
        median: 2466.9
        p95: 3775.4
        p99: 4322.8
      Scenario counts:
        0: 2800 (100%)
      Codes:
        200: 280000
