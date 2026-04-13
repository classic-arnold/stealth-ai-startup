import { useState, useEffect } from 'react';
import { getSummary, getEvents } from '../api';
import KPICards from '../components/KPICards';
import SpendByTeam from '../components/SpendByTeam';
import SpendByProvider from '../components/SpendByProvider';
import RecentEventsTable from '../components/RecentEventsTable';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getSummary(), getEvents({ limit: 20 })])
      .then(([summaryData, eventsData]) => {
        setSummary(summaryData);
        setEvents(eventsData.events);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-text-muted">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Failed to load: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <KPICards summary={summary} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SpendByTeam data={summary.spend_by_team} />
        <SpendByProvider data={summary.spend_by_provider} />
      </div>
      <RecentEventsTable events={events} />
    </div>
  );
}
