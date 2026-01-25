
import React, { useState } from 'react';

interface SetupScreenProps {
  onStart: (names: string[]) => void;
  onBack: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart, onBack }) => {
  const [names, setNames] = useState(['', '', '', '']);

  const handleChange = (index: number, value: string) => {
    const nextNames = [...names];
    nextNames[index] = value;
    setNames(nextNames);
  };

  const activeNames = names.filter(n => n.trim().length > 0);
  const isValid = activeNames.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950 px-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-10 w-full max-w-md border border-gray-800">
        <button 
          onClick={onBack}
          className="text-gray-500 hover:text-white mb-6 flex items-center gap-2 font-bold transition-colors text-sm"
        >
          ← Back to Home
        </button>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white tracking-tight">Setup Team</h1>
          <p className="text-gray-400 mt-2 font-medium">Enter 1 to 4 players</p>
        </div>

        <div className="space-y-6">
          {names.map((name, i) => (
            <div key={i} className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Position {i + 1}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder={`Player name (optional)...`}
                className="w-full px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white font-semibold placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-inner"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => onStart(activeNames)}
          disabled={!isValid}
          className={`w-full mt-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl uppercase tracking-widest ${
            isValid
              ? 'bg-blue-600 hover:bg-blue-500 text-white transform active:scale-95 shadow-blue-900/20'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
          }`}
        >
          Begin Match
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;
