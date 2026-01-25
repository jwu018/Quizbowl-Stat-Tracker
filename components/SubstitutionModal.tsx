
import React, { useState } from 'react';

interface SubstitutionModalProps {
  currentIndex: number;
  currentName: string;
  onClose: () => void;
  onSubmit: (newName: string) => void;
}

const SubstitutionModal: React.FC<SubstitutionModalProps> = ({ currentName, currentIndex, onClose, onSubmit }) => {
  const [newName, setNewName] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Substitution</h3>
        <p className="text-gray-500 mb-6">Replacing <span className="font-bold text-blue-600">{currentName}</span> at position {currentIndex + 1}.</p>
        
        <input
          autoFocus
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New Player Name"
          className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none text-lg mb-6"
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="py-4 rounded-xl border border-gray-300 font-bold text-gray-500 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!newName.trim()}
            onClick={() => onSubmit(newName)}
            className="py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubstitutionModal;
