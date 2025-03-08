
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

const TicketsPage = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // Mock tickets data - in a real app, this would come from an API
  const tickets = [
    { id: 1, event: 'FC Barcelona vs Real Madrid', date: '2023-11-15', time: '20:00', seat: 'Section A, Row 12, Seat 5' },
    { id: 2, event: 'Bayern Munich vs Dortmund', date: '2023-11-22', time: '18:30', seat: 'Section B, Row 5, Seat 10' },
    { id: 3, event: 'PSG vs Marseille', date: '2023-12-05', time: '21:00', seat: 'Section C, Row 8, Seat 3' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-stadium bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      
      <Header />
      
      <div className="relative z-10 px-16 py-10">
        <h2 className="text-3xl font-bold text-white mb-6">{t('ticketList')}</h2>
        
        <div className="grid gap-4">
          {tickets.map(ticket => (
            <div key={ticket.id} className="bg-white/20 backdrop-blur-md rounded-lg p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-white">{ticket.event}</h3>
                <p className="text-white/80">{ticket.date} • {ticket.time}</p>
                <p className="text-white/80">{ticket.seat}</p>
              </div>
              <button className="bg-lime-500 hover:bg-lime-600 text-black px-6 py-2 rounded-md transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
