
import { BuzzEvent } from '../types';

/**
 * Generates a CSV based on provided history and player names.
 */
export const generateCSV = (allPlayers: string[], history: BuzzEvent[]): string => {
  const headers = [...allPlayers, 'Bonus'];
  
  const rows = history.map((event: BuzzEvent) => {
    const rowData = allPlayers.map(name => {
      if (event.playerName === name) {
        return event.isCorrect ? '1' : '0';
      }
      return '';
    });
    
    if (!event.isCorrect) {
      rowData.push(''); 
    } else {
      rowData.push(event.bonusCorrect ? '1' : '0');
    }
    
    return rowData.join(',');
  });

  return [headers.join(','), ...rows].join('\n');
};

export const downloadCSV = (allPlayers: string[], history: BuzzEvent[], filename: string) => {
  const csvContent = generateCSV(allPlayers, history);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
