import React, { useState, useRef, useEffect } from 'react';
import { Printer, RefreshCw, Settings, DollarSign, Calendar, Hash, Ticket } from 'lucide-react';

/**
 * UTILITY: Random Number Generator for "Quick Pick"
 */
const generateLotteryNumbers = (count, max) => {
  const nums = new Set();
  while (nums.size < count) {
    nums.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(nums).sort((a, b) => a - b);
};

const LotteryTicketGenerator = () => {
  // --- CONFIGURATION ---
  // Standard thermal receipt widths: 80mm (most common) or 58mm
  const [paperWidth, setPaperWidth] = useState(80); 
  
  const [ticketData, setTicketData] = useState({
    orgName: 'ROYAL STATE LOTTERY',
    drawName: 'MEGA MILLIONS WEEKLY',
    drawDate: new Date().toISOString().slice(0, 10),
    drawTime: '20:00',
    price: 100,
    ticketId: 'A89-223-9901',
    jackpot: '5,00,00,000',
    terminalId: 'TERM-007',
    agentId: 'AGT-8821'
  });

  // Lottery Game Logic: Pick 6 numbers from 1-49
  const [selectedNumbers, setSelectedNumbers] = useState(generateLotteryNumbers(6, 49));

  // --- STYLES ---
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,700&family=Roboto+Mono:wght@400;700&display=swap');

    .font-ticket-serif { font-family: 'Playfair Display', serif; }
    .font-ticket-mono { font-family: 'Courier Prime', monospace; }
    .font-digital { font-family: 'Roboto Mono', monospace; }

    /* Thermal Printer Optimization */
    @media print {
      @page {
        margin: 0;
        size: auto; /* Auto height for roll paper */
      }
      body { 
        margin: 0; 
        background: white; 
      }
      .no-print { display: none !important; }
      
      .print-area {
        position: absolute;
        top: 0;
        left: 0;
        width: ${paperWidth}mm !important;
        min-height: 100vh;
        background: white;
        color: black;
        padding: 0;
        box-shadow: none !important;
        border: none !important;
      }
      
      /* Force black text for thermal printers to avoid dithering gray */
      * {
        color: black !important;
        border-color: black !important;
      }
    }
  `;

  const handleQuickPick = () => {
    setSelectedNumbers(generateLotteryNumbers(6, 49));
    // Simulate a new Ticket ID on refresh
    const randomId = Math.floor(1000 + Math.random() * 9000);
    setTicketData(prev => ({...prev, ticketId: `A89-223-${randomId}`}));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col items-center p-6">
      <style>{styles}</style>

      {/* HEADER */}
      <div className="no-print mb-8 text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-yellow-500 text-black p-3 rounded-xl shadow-lg shadow-yellow-500/20">
                <Ticket size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Pro Lottery Terminal</h1>
        </div>
        <p className="text-slate-400 text-sm">Thermal Printer Compatible • 80mm / 58mm Support</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full max-w-6xl">
        
        {/* --- LEFT: LIVE PREVIEW (The Ticket) --- */}
        <div className="flex flex-col items-center gap-4">
            <div className="no-print flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <Printer size={14} /> Live Print Preview ({paperWidth}mm)
            </div>

            {/* TICKET CONTAINER */}
            <div 
                className="print-area bg-white text-black shadow-2xl relative transition-all duration-300 mx-auto"
                style={{ 
                    width: `${paperWidth}mm`, 
                    minHeight: '120mm', // Visual min-height for preview
                    padding: '5mm',
                    // Realistic slight texture for screen only
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url("https://www.transparenttextures.com/patterns/paper.png")'
                }}
            >
                {/* 1. BRANDING HEADER */}
                <div className="text-center border-b-2 border-black pb-2 mb-2 border-double">
                    <div className="flex justify-center mb-1">
                        <div className="border-2 border-black rounded-full p-1">
                           <div className="bg-black text-white rounded-full p-1">
                             <DollarSign size={16} strokeWidth={3} />
                           </div>
                        </div>
                    </div>
                    <h2 className="font-ticket-serif text-xl font-black uppercase tracking-wider leading-none">{ticketData.orgName}</h2>
                    <p className="font-ticket-mono text-[10px] uppercase mt-1">Government Authorized</p>
                </div>

                {/* 2. DRAW INFO */}
                <div className="flex justify-between items-end border-b border-dashed border-black pb-2 mb-2 font-ticket-mono text-xs">
                    <div className="text-left">
                        <p className="text-[10px] text-gray-600">DRAW DATE</p>
                        <p className="font-bold text-sm">{ticketData.drawDate}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-600">TIME</p>
                        <p className="font-bold text-sm">{ticketData.drawTime}</p>
                    </div>
                </div>

                {/* 3. GAME NAME */}
                <div className="text-center py-2">
                    <h3 className="font-ticket-serif text-lg font-black italic">{ticketData.drawName}</h3>
                    <p className="font-ticket-mono text-xs mt-1">EST. JACKPOT: <span className="font-bold text-lg">₹{ticketData.jackpot}</span></p>
                </div>

                {/* 4. THE NUMBERS (The Hero Section) */}
                <div className="my-3 bg-black text-white p-4 rounded-sm text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="font-ticket-mono text-[10px] uppercase mb-2 text-gray-300 tracking-widest">Your Lucky Numbers</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {selectedNumbers.map((num, i) => (
                                <span key={i} className="font-digital text-2xl font-bold bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow-sm border-2 border-gray-300">
                                    {num < 10 ? `0${num}` : num}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Background decorative pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex items-center justify-center">
                         <Ticket size={150} />
                    </div>
                </div>

                {/* 5. TICKET DETAILS */}
                <div className="font-ticket-mono text-xs space-y-1 border-b border-dashed border-black pb-3 mb-2">
                    <div className="flex justify-between">
                        <span>Terminal:</span>
                        <span className="font-bold">{ticketData.terminalId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Agent ID:</span>
                        <span className="font-bold">{ticketData.agentId}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2 pt-1 border-t border-black border-dotted">
                        <span>TICKET PRICE:</span>
                        <span className="font-bold text-lg">₹{ticketData.price}.00</span>
                    </div>
                </div>

                {/* 6. BARCODE (Simulated) */}
                <div className="text-center pt-2">
                    {/* CSS Hack for Barcode Look */}
                    <div className="h-12 w-3/4 mx-auto bg-repeat-x mb-1" 
                         style={{ 
                             backgroundImage: 'linear-gradient(90deg, #000 2px, transparent 2px, #000 4px, #000 6px, transparent 6px, transparent 8px, #000 9px)', 
                             backgroundSize: '10px 100%' 
                         }}>
                    </div>
                    <p className="font-ticket-mono text-[10px] tracking-[0.2em]">{ticketData.ticketId}</p>
                </div>

                {/* 7. DISCLAIMER */}
                <div className="mt-4 text-[9px] font-sans text-center text-gray-500 leading-tight">
                    Ticket valid for 30 days from draw date. <br/>
                    Keep away from heat and moisture.
                </div>
            </div>
        </div>


        {/* --- RIGHT: CONTROLS --- */}
        <div className="no-print w-full max-w-md flex flex-col gap-4">
            
            {/* 1. Quick Actions Card */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Settings size={18} className="text-yellow-500"/> Configuration
                </h3>
                
                {/* Paper Size */}
                <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Printer Paper Width</label>
                    <div className="flex bg-slate-900 p-1 rounded-lg">
                        {[80, 58].map((size) => (
                            <button
                                key={size}
                                onClick={() => setPaperWidth(size)}
                                className={`flex-1 py-2 text-sm font-bold rounded-md transition ${paperWidth === size ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {size}mm
                            </button>
                        ))}
                    </div>
                </div>

                {/* Number Generator */}
                <button 
                    onClick={handleQuickPick}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg mb-3 transition-all active:scale-95"
                >
                    <RefreshCw size={20} className={false ? "animate-spin" : ""} />
                    GENERATE QUICK PICK
                </button>

                <button 
                    onClick={handlePrint}
                    className="w-full bg-white hover:bg-gray-100 text-slate-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                    <Printer size={20} />
                    PRINT TICKET
                </button>
            </div>

            {/* 2. Data Editor Card */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
                 <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-blue-400"/> Ticket Details
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Draw Name</label>
                        <input 
                            value={ticketData.drawName}
                            onChange={(e) => setTicketData({...ticketData, drawName: e.target.value})}
                            className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Jackpot (₹)</label>
                            <input 
                                value={ticketData.jackpot}
                                onChange={(e) => setTicketData({...ticketData, jackpot: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Price (₹)</label>
                            <input 
                                type="number"
                                value={ticketData.price}
                                onChange={(e) => setTicketData({...ticketData, price: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                            <input 
                                type="date"
                                value={ticketData.drawDate}
                                onChange={(e) => setTicketData({...ticketData, drawDate: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                         <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Time</label>
                            <input 
                                type="time"
                                value={ticketData.drawTime}
                                onChange={(e) => setTicketData({...ticketData, drawTime: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-sm text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-center">
                <p className="text-xs text-slate-500">
                    <span className="font-bold text-slate-400">Pro Tip:</span> Set your printer margins to "None" in the browser print dialog for best results on thermal rolls.
                </p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default LotteryTicketGenerator;
