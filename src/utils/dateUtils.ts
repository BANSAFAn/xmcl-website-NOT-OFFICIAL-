
type MonthMap = Record<string, number>;

const RUSSIAN_MONTHS: MonthMap = {
  'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3, 'мая': 4, 'июня': 5,
  'июля': 6, 'августа': 7, 'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11
};

export function parseRussianDate(dateString: string): Date {
  try {
    const parts = dateString.split(' ');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = RUSSIAN_MONTHS[parts[1].toLowerCase()];
      const year = parseInt(parts[2]);
      
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
  } catch (e) {
    console.error("Error parsing date:", e);
  }
  
  return new Date();
}
