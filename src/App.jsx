import React, { useState, useEffect } from 'react';
import { Clock, CalendarDays, Moon, Sun, Home, ChevronRight } from 'lucide-react';

// Application Data based exactly on the user's column request
// Sehr starts at 05:27 (Regular), Iftar starts at 06:22 (Fiqh Jafria)
const ramadanData = [
  { day: 1, date: "2026-02-19", sehr: "05:27", iftar: "06:22" },
  { day: 2, date: "2026-02-20", sehr: "05:26", iftar: "06:22" },
  { day: 3, date: "2026-02-21", sehr: "05:25", iftar: "06:23" },
  { day: 4, date: "2026-02-22", upperDate: "22", month: "Feb", dayName: "Sun", sehr: "05:24", iftar: "06:24" },
  { day: 5, date: "2026-02-23", sehr: "05:23", iftar: "06:25" },
  { day: 6, date: "2026-02-24", sehr: "05:22", iftar: "06:25" },
  { day: 7, date: "2026-02-25", sehr: "05:22", iftar: "06:26" },
  { day: 8, date: "2026-02-26", sehr: "05:21", iftar: "06:27" },
  { day: 9, date: "2026-02-27", sehr: "05:20", iftar: "06:27" },
  { day: 10, date: "2026-02-28", sehr: "05:19", iftar: "06:28" },
  { day: 11, date: "2026-03-01", sehr: "05:18", iftar: "06:29" },
  { day: 12, date: "2026-03-02", sehr: "05:18", iftar: "06:29" },
  { day: 13, date: "2026-03-03", sehr: "05:17", iftar: "06:30" },
  { day: 14, date: "2026-03-04", sehr: "05:16", iftar: "06:30" },
  { day: 15, date: "2026-03-05", sehr: "05:15", iftar: "06:31" },
  { day: 16, date: "2026-03-06", sehr: "05:14", iftar: "06:31" },
  { day: 17, date: "2026-03-07", sehr: "05:13", iftar: "06:32" },
  { day: 18, date: "2026-03-08", sehr: "05:12", iftar: "06:33" },
  { day: 19, date: "2026-03-09", sehr: "05:11", iftar: "06:33" },
  { day: 20, date: "2026-03-10", sehr: "05:10", iftar: "06:34" },
  { day: 21, date: "2026-03-11", sehr: "05:08", iftar: "06:35" },
  { day: 22, date: "2026-03-12", sehr: "05:07", iftar: "06:36" },
  { day: 23, date: "2026-03-13", sehr: "05:06", iftar: "06:36" },
  { day: 24, date: "2026-03-14", sehr: "05:05", iftar: "06:37" },
  { day: 25, date: "2026-03-15", sehr: "05:04", iftar: "06:38" },
  { day: 26, date: "2026-03-16", sehr: "05:02", iftar: "06:38" },
  { day: 27, date: "2026-03-17", sehr: "05:01", iftar: "06:39" },
  { day: 28, date: "2026-03-18", sehr: "05:00", iftar: "06:39" },
  { day: 29, date: "2026-03-19", sehr: "04:58", iftar: "06:40" },
  { day: 30, date: "2026-03-20", sehr: "04:56", iftar: "06:40" },
];

const AppIcon = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    {/* Crescent Moon */}
    <path d="M50 15A35 35 0 1 0 85 50 25 25 0 1 1 50 15Z" fill="url(#moonGradient)" />
    {/* Star */}
    <polygon points="65,25 68,32 75,32 69,37 71,44 65,40 59,44 61,37 55,32 62,32" fill="#fde047" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [appState, setAppState] = useState({
    status: 'loading', // loading, before, during, after
    currentDay: null,
    nextEvent: null, // { type: 'Sehr' | 'Iftar', time: Date, label: string }
    timeRemaining: { h: 0, m: 0, s: 0 }
  });

  // Utility to convert "05:27" or "06:22" to a Date object on a specific day
  const parseTimeStr = (dateStr, timeStr, isIftar) => {
    const [hours, mins] = timeStr.split(':').map(Number);
    // Iftar is PM, Sehr is AM. Add 12 hours for Iftar.
    const adjustedHours = isIftar ? hours + 12 : hours;
    return new Date(`${dateStr}T${adjustedHours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const firstDayDate = new Date(`${ramadanData[0].date}T00:00:00`);
      const lastDayDate = new Date(`${ramadanData[ramadanData.length - 1].date}T23:59:59`);

      if (now < firstDayDate) {
        setAppState(prev => ({ ...prev, status: 'before' }));
        return;
      }

      if (now > lastDayDate) {
        setAppState(prev => ({ ...prev, status: 'after' }));
        return;
      }

      // We are in Ramadan
      // Find today's Roza based on date matching
      const todayStr = now.toISOString().split('T')[0];
      let todayDataIndex = ramadanData.findIndex(d => d.date === todayStr);

      if (todayDataIndex === -1) {
        // Fallback if crossing midnight edge cases
        setAppState(prev => ({ ...prev, status: 'after' }));
        return;
      }

      const todayData = ramadanData[todayDataIndex];
      const sehrTime = parseTimeStr(todayData.date, todayData.sehr, false);
      const iftarTime = parseTimeStr(todayData.date, todayData.iftar, true);

      let nextEvent = null;

      if (now < sehrTime) {
        nextEvent = { type: 'Sehr', time: sehrTime, label: 'Sehr Ends In' };
      } else if (now < iftarTime) {
        nextEvent = { type: 'Iftar', time: iftarTime, label: 'Iftar Begins In' };
      } else {
        // Look for tomorrow's Sehr
        if (todayDataIndex + 1 < ramadanData.length) {
          const tomorrowData = ramadanData[todayDataIndex + 1];
          const tmrwSehrTime = parseTimeStr(tomorrowData.date, tomorrowData.sehr, false);
          nextEvent = { type: 'Sehr', time: tmrwSehrTime, label: 'Next Sehr In' };
        } else {
          setAppState(prev => ({ ...prev, status: 'after' }));
          return;
        }
      }

      const diffMs = nextEvent.time - now;
      const h = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diffMs / 1000 / 60) % 60);
      const s = Math.floor((diffMs / 1000) % 60);

      setAppState({
        status: 'during',
        currentDay: todayData,
        nextEvent,
        timeRemaining: { h, m, s }
      });

    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const padZero = (num) => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center font-sans selection:bg-amber-500/30">
      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-slate-900 shadow-2xl relative flex flex-col h-screen overflow-hidden sm:rounded-3xl sm:h-[95vh] sm:my-auto sm:border sm:border-slate-800">
        
        {/* Header */}
        <header className="px-6 pt-10 pb-6 bg-gradient-to-b from-slate-800/80 to-slate-900 flex items-center gap-4 relative z-10">
          <AppIcon className="w-12 h-12 drop-shadow-lg" />
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">Roza Siyam</h1>
            <p className="text-amber-400 text-sm font-medium tracking-wider">Ramadan 2026 • 1447 AH</p>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-24 px-6 hide-scrollbar">
          
          {activeTab === 'home' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Current Date Card */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 text-center">
                <p className="text-slate-400 text-sm uppercase tracking-widest mb-1">Today</p>
                <p className="text-lg text-slate-200 font-medium">{formatDisplayDate(currentTime)}</p>
                {appState.currentDay && (
                  <div className="mt-3 inline-block bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-sm font-semibold shadow-inner">
                    Roza {appState.currentDay.day}
                  </div>
                )}
              </div>

              {/* Dynamic Countdown Section */}
              <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/10 border border-amber-500/20 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg shadow-amber-900/10">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
                
                {appState.status === 'loading' && <p className="text-amber-200 animate-pulse">Calculating timings...</p>}
                
                {appState.status === 'before' && (
                  <div className="text-center">
                    <Moon className="w-12 h-12 mx-auto text-amber-400 mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Ramadan is coming</h2>
                    <p className="text-amber-200/70">Starts Feb 19, 2026</p>
                  </div>
                )}

                {appState.status === 'after' && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Eid Mubarak!</h2>
                    <p className="text-amber-200/70">May your fasting be accepted.</p>
                  </div>
                )}

                {appState.status === 'during' && appState.nextEvent && (
                  <>
                    <p className="text-amber-300 font-medium uppercase tracking-widest mb-6">
                      {appState.nextEvent.label}
                    </p>
                    <div className="flex items-center justify-center gap-3 font-mono text-5xl font-light text-white tracking-tight">
                      <div className="flex flex-col items-center">
                        <span className="bg-slate-950/40 px-4 py-3 rounded-2xl backdrop-blur-sm min-w-[80px] text-center shadow-inner border border-slate-700/30">
                          {padZero(appState.timeRemaining.h)}
                        </span>
                        <span className="text-xs font-sans text-amber-400/60 mt-2 uppercase tracking-widest">Hrs</span>
                      </div>
                      <span className="text-amber-500 pb-6">:</span>
                      <div className="flex flex-col items-center">
                        <span className="bg-slate-950/40 px-4 py-3 rounded-2xl backdrop-blur-sm min-w-[80px] text-center shadow-inner border border-slate-700/30">
                          {padZero(appState.timeRemaining.m)}
                        </span>
                        <span className="text-xs font-sans text-amber-400/60 mt-2 uppercase tracking-widest">Min</span>
                      </div>
                      <span className="text-amber-500 pb-6">:</span>
                      <div className="flex flex-col items-center">
                        <span className="bg-slate-950/40 px-4 py-3 rounded-2xl backdrop-blur-sm min-w-[80px] text-center shadow-inner border border-slate-700/30 text-amber-400">
                          {padZero(appState.timeRemaining.s)}
                        </span>
                        <span className="text-xs font-sans text-amber-400/60 mt-2 uppercase tracking-widest">Sec</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Today's Timings Grid */}
              {appState.currentDay && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col items-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent transition-opacity"></div>
                    <Moon className="w-8 h-8 text-indigo-400 mb-3" />
                    <p className="text-slate-400 text-sm font-medium">Sehri Ends</p>
                    <p className="text-2xl font-semibold text-white mt-1">{appState.currentDay.sehr} <span className="text-sm font-normal text-slate-500">AM</span></p>
                  </div>
                  
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col items-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent transition-opacity"></div>
                    <Sun className="w-8 h-8 text-orange-400 mb-3" />
                    <p className="text-slate-400 text-sm font-medium">Iftar Time</p>
                    <p className="text-2xl font-semibold text-white mt-1">{appState.currentDay.iftar} <span className="text-sm font-normal text-slate-500">PM</span></p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'timetable' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md z-10 py-4 border-b border-slate-800 mb-4 flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span>Roza & Date</span>
                <span className="flex gap-8 pr-2">
                  <span>Sehr</span>
                  <span>Iftar</span>
                </span>
              </div>
              <div className="space-y-3">
                {ramadanData.map((dayData) => {
                  const isToday = appState.currentDay?.day === dayData.day;
                  const dateObj = new Date(dayData.date);
                  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  
                  return (
                    <div 
                      key={dayData.day} 
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        isToday 
                          ? 'bg-amber-950/30 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                          : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          isToday ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {dayData.day}
                        </div>
                        <div>
                          <p className={`font-medium ${isToday ? 'text-amber-400' : 'text-slate-200'}`}>
                            {formattedDate}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 font-mono text-sm">
                        <div className="flex flex-col items-end">
                          <span className={isToday ? 'text-white font-semibold' : 'text-slate-300'}>{dayData.sehr}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={isToday ? 'text-white font-semibold' : 'text-slate-300'}>{dayData.iftar}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-slate-900/90 backdrop-blur-xl border-t border-slate-800/80 px-6 py-4 flex justify-around pb-safe">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'home' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('timetable')}
            className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'timetable' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <CalendarDays className="w-6 h-6" />
            <span className="text-xs font-medium">Timetable</span>
          </button>
        </nav>
        
        {/* Global Styles for hiding scrollbar specifically in this component */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .pb-safe {
             padding-bottom: env(safe-area-inset-bottom, 1rem);
          }
        `}} />
      </div>
    </div>
  );
}