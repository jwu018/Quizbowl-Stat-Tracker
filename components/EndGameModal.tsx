
import React, { useState } from 'react';

interface EndGameModalProps {
  onClose: () => void;
  onSubmit: (our: number, opp: number) => void;
}

const EndGameModal: React.FC<EndGameModalProps> = ({ onClose, onSubmit }) => {
  const [ourScore, setOurScore] = useState('');
  const [oppScore, setOppScore] = useState('');

  const isValid = ourScore !== '' && oppScore !== '';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl w-full max-w-sm p-8 border border-gray-800">
        <h3 className="text-2xl font-black text-white mb-6 text-center tracking-tight">Final Score Entry</h3>
        
        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Our Team Score</label>
            <input
              type="number"
              value={ourScore}
              onChange={(e) => setOurScore(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-600 shadow-inner"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Opponent Team Score</label>
            <input
              type="number"
              value={oppScore}
              onChange={(e) => setOppScore(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white font-bold outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder-gray-600 shadow-inner"
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="py-4 rounded-xl border border-gray-700 font-bold text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            Go Back
          </button>
          <button
            disabled={!isValid}
            onClick={() => onSubmit(Number(ourScore), Number(oppScore))}
            className="py-4 rounded-xl bg-red-600 text-white font-black hover:bg-red-500 disabled:opacity-50 disabled:bg-gray-800 disabled:text-gray-600 transition-all shadow-lg uppercase tracking-wider"
          >
            End & Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndGameModal;
