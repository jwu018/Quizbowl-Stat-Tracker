
import React, { useState } from 'react';

interface BuzzOutcomeModalProps {
  playerName: string;
  onClose: () => void;
  onSubmit: (isCorrect: boolean, bonusCorrect: boolean) => void;
}

const BuzzOutcomeModal: React.FC<BuzzOutcomeModalProps> = ({ playerName, onClose, onSubmit }) => {
  const [step, setStep] = useState<'tossup' | 'bonus'>('tossup');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleTossup = (correct: boolean) => {
    if (correct) {
      setIsCorrect(true);
      setStep('bonus');
    } else {
      onSubmit(false, false);
    }
  };

  const handleBonus = (bonusCorrect: boolean) => {
    onSubmit(true, bonusCorrect);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="bg-blue-600 py-6 px-4 text-center">
          <h3 className="text-white text-xl font-bold">{playerName}'s Buzz</h3>
        </div>

        <div className="p-8 space-y-6">
          {step === 'tossup' ? (
            <>
              <p className="text-center text-gray-600 font-medium text-lg">Did they get the tossup question correct?</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleTossup(true)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-10 rounded-2xl text-xl shadow-lg transition transform active:scale-95"
                >
                  YES
                </button>
                <button
                  onClick={() => handleTossup(false)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-10 rounded-2xl text-xl shadow-lg transition transform active:scale-95"
                >
                  NO
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-center text-green-600 font-bold text-lg">Tossup Correct! ✓</p>
              <p className="text-center text-gray-600 font-medium">Did the team get the bonus question correct?</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleBonus(true)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-10 rounded-2xl text-xl shadow-lg transition transform active:scale-95"
                >
                  YES
                </button>
                <button
                  onClick={() => handleBonus(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-10 rounded-2xl text-xl shadow-lg transition transform active:scale-95"
                >
                  NO
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 text-gray-400 font-semibold hover:text-gray-600 transition"
        >
          Cancel Buzz
        </button>
      </div>
    </div>
  );
};

export default BuzzOutcomeModal;
