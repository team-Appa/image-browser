
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

    Summary report @ 10:21:40(-0700) 2020-07-18
      Scenarios launched:  2800
      Scenarios completed: 2800
      Requests completed:  280000
      Mean response/sec: 592.94
      Response time (msec):
        min: 2.3
        max: 5162.5
        median: 2081.9
        p95: 3171.1
        p99: 3419.3
      Scenario counts:
        0: 2800 (100%)
      Codes:
        200: 280000
