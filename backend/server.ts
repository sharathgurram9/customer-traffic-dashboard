import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
const allowedOrigin = 'https://literate-space-funicular-69xgvv4j7jgh4qq5-3000.app.github.dev';

// app.use(cors({
//   origin: allowedOrigin,
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
app.use(cors());


interface CustomerEvent {
  store_id: number;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
}

interface HourlyData {
  in: number;
  out: number;
}

let liveData: CustomerEvent[] = [];
let historyData: Record<string, HourlyData> = {};

app.get('/', (_req, res) => {
  res.send('Backend is running.');
});

app.get('/api/live', (_req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  console.log('Sending live data with CORS header');
  res.json(liveData);
});

app.get('/api/history', (_req: Request, res: Response) => {
  res.json(historyData);
});

// Generate a new mock customer event every 3 seconds
setInterval(() => {
  const now = new Date();
  const msg: CustomerEvent = {
    store_id: 10,
    customers_in: Math.floor(Math.random() * 3),
    customers_out: Math.floor(Math.random() * 3),
    time_stamp: now.toISOString(),
  };

  // Keep live data list capped at 10 items
  liveData.push(msg);
  if (liveData.length > 10) liveData.shift();

  // Aggregate counts per hour (YYYY-MM-DDTHH)
  const hour = now.toISOString().slice(0, 13);
  if (!historyData[hour]) historyData[hour] = { in: 0, out: 0 };
  historyData[hour].in += msg.customers_in;
  historyData[hour].out += msg.customers_out;
}, 3000);

app.listen(4000, () => console.log('Backend listening on port 4000'));
