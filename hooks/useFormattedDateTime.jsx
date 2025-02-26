import { useMemo } from 'react';

function useFormattedDateTime(dateString) {
  const formattedDate = useMemo(() => {
    if (!dateString) return '';

    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return dateString; // No es una fecha válida

    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    const hours = String(dateObj.getUTCHours()).padStart(2, '0');
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }, [dateString]);

  return formattedDate;
}

export default useFormattedDateTime;
