import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 100,
  duration: '300s',
};
export default function() {
  http.get('http://localhost:3001/api/products?id=9000000');
  sleep(1);
}