"use client";

import { useState, useEffect } from 'react';
import { supabaseClient, WaitlistEntry } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function WaitlistAdmin() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchWaitlist() {
      try {
        setLoading(true);
        
        const { data, error } = await supabaseClient
          .from('waitlist')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setEntries(data || []);
      } catch (err) {
        console.error('Error fetching waitlist:', err);
        setError('Failed to load waitlist data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchWaitlist();
  }, []);
  
  // Function to export data as CSV
  const exportToCsv = () => {
    if (!entries.length) return;
    
    const headers = ['Name', 'Email', 'User Type', 'Feedback', 'Date Joined'];
    const csvRows = [
      headers.join(','),
      ...entries.map(entry => [
        `"${entry.name}"`,
        `"${entry.email}"`,
        `"${entry.user_type}"`,
        `"${entry.feedback || ''}"`,
        `"${new Date(entry.created_at).toLocaleString()}"`,
      ].join(','))
    ];
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `waitlist-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Waitlist Entries</h1>
        <button
          onClick={exportToCsv}
          disabled={loading || !entries.length}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          Export as CSV
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-600">
          {error}
        </div>
      ) : entries.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-md text-center">
          <p className="text-gray-500">No waitlist entries yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">User Type</th>
                <th className="p-3 text-left">Feedback</th>
                <th className="p-3 text-left">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-200">
                  <td className="p-3">{entry.name}</td>
                  <td className="p-3">{entry.email}</td>
                  <td className="p-3 capitalize">{entry.user_type}</td>
                  <td className="p-3">{entry.feedback || '-'}</td>
                  <td className="p-3">{new Date(entry.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
