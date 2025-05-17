// frontend/pages/index.tsx
import useSWR from 'swr';
import axios from 'axios';

interface LiveEntry {
  store_id: number;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
}

interface HistoryEntry {
  in: number;
  out: number;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Home() {
const { data: live } = useSWR(`/api/live`, fetcher, { refreshInterval: 2000 });
const { data: history } = useSWR(`/api/history`, fetcher);

  return (
    <div>
      <h2>Live Table</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>In</th>
            <th>Out</th>
          </tr>
        </thead>
        <tbody>
          {live?.map((entry, idx) => (
            <tr key={idx}>
              <td>{new Date(entry.time_stamp).toLocaleTimeString()}</td>
              <td>{entry.customers_in}</td>
              <td>{entry.customers_out}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>History Table</h2>
      <table>
        <thead>
          <tr>
            <th>Hour</th>
            <th>In</th>
            <th>Out</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            Object.entries(history).map(([hour, val]) => (
              <tr key={hour}>
                <td>{hour}</td>
                <td>{val.in}</td>
                <td>{val.out}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
