import React, { useState } from 'react';
import { Lock, Smartphone, CheckCircle, X, KeyRound } from 'lucide-react';

const App = () => {
  const [bgColor, setBgColor] = useState('bg-gray-900');
  const [pendingColor, setPendingColor] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // New State for UTR Input
  const [utr, setUtr] = useState('');
  const [error, setError] = useState('');

  // Configuration
  const UPI_ID = "9309555464@ybl";
  const AMOUNT = "100";
  
  const colors = [
    { name: 'Crimson Red', class: 'bg-red-600', hex: '#DC2626' },
    { name: 'Ocean Blue', class: 'bg-blue-600', hex: '#2563EB' },
    { name: 'Emerald Green', class: 'bg-green-600', hex: '#16A34A' },
    { name: 'Royal Purple', class: 'bg-purple-600', hex: '#9333EA' },
    { name: 'Sunny Yellow', class: 'bg-yellow-500', hex: '#EAB308' },
    { name: 'Midnight Black', class: 'bg-black', hex: '#000000' },
  ];

  const generateUPILink = () => {
    const params = new URLSearchParams({
      pa: UPI_ID,
      pn: "Color Unlock",
      am: AMOUNT,
      cu: "INR",
      tn: `Unlock ${pendingColor?.name}`
    });
    return `upi://pay?${params.toString()}`;
  };

  const handleColorClick = (color) => {
    if (color.class === bgColor) return;
    setPendingColor(color);
    setUtr(''); // Reset input
    setError('');
    setShowPaymentModal(true);
  };

  const verifyUTR = () => {
    // 1. Basic Validation: UPI UTRs are always 12 digits
    const utrRegex = /^\d{12}$/;

    if (!utrRegex.test(utr)) {
      setError("Invalid UTR. Please enter the 12-digit Transaction ID from PhonePe/GPay.");
      return;
    }

    // 2. (Optional) Cheat Check: Prevent them from using "123456789012"
    if (utr === '123456789012' || utr === '000000000000') {
      setError("Please enter the actual Transaction ID.");
      return;
    }

    // 3. Success "Simulation"
    setBgColor(pendingColor.class);
    setShowPaymentModal(false);
    setPendingColor(null);
    alert(`Success! Validated UTR: ${utr}`);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generateUPILink())}`;

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out ${bgColor} flex items-center justify-center p-6 font-sans`}>
      
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center border border-white/20">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Premium Color Changer</h1>
        <p className="text-gray-500 mb-8 font-medium">Unlock exclusive themes for ₹{AMOUNT}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {colors.map((color) => {
            const isActive = bgColor === color.class;
            return (
              <button
                key={color.name}
                onClick={() => handleColorClick(color)}
                className={`relative group h-32 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border-4 
                  ${isActive ? 'border-black scale-105 shadow-xl' : 'border-transparent hover:scale-105 hover:shadow-lg'}
                  ${color.class}
                `}
              >
                {!isActive && <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent rounded-xl transition-colors" />}
                {isActive ? <CheckCircle className="text-white w-8 h-8 drop-shadow-md" /> : (
                  <div className="flex flex-col items-center gap-1">
                    <Lock className="text-white/80 w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-white/90 text-xs font-bold bg-black/30 px-2 py-1 rounded-full">₹100</span>
                  </div>
                )}
                <span className="absolute bottom-2 text-white text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {showPaymentModal && pendingColor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Unlock {pendingColor.name}</h3>
              <button onClick={() => setShowPaymentModal(false)} className="bg-gray-100 p-2 rounded-full"><X className="w-5 h-5 text-gray-600" /></button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center border-2 border-dashed border-gray-200 mb-4">
              <img src={qrCodeUrl} alt="Payment QR" className="w-40 h-40 rounded-lg mix-blend-multiply" />
            </div>

            <div className="space-y-4">
              <a href={generateUPILink()} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                <Smartphone className="w-5 h-5" /> Pay ₹{AMOUNT}
              </a>
              
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-[10px] uppercase font-bold">Paste UTR Below</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* UTR Input Section */}
              <div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="number" 
                    placeholder="Enter 12-digit UTR ID" 
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl font-mono text-sm border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all"
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-1 font-bold ml-1">{error}</p>}
              </div>

              <button onClick={verifyUTR} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200 transition-transform active:scale-95">
                <CheckCircle className="w-5 h-5" /> Verify & Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
