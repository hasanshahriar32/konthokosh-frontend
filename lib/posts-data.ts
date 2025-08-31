export const toBanglaDigits = (num: string): string => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.replace(/\d/g, (digit) => banglaDigits[parseInt(digit)]);
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formatted = `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
  return toBanglaDigits(formatted);
};

export const formatBanglaDate = (date: Date): string => {
  const banglaMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const banglaDay = toBanglaDigits(day.toString());
  const banglaYear = toBanglaDigits(year.toString());
  const banglaHours = toBanglaDigits(hours.toString().padStart(2, '0'));
  const banglaMinutes = toBanglaDigits(minutes.toString().padStart(2, '0'));
  const banglaSeconds = toBanglaDigits(seconds.toString().padStart(2, '0'));
  return `${banglaDay} ${banglaMonths[month]} ${banglaYear}, ${banglaHours}:${banglaMinutes}:${banglaSeconds}`;
};
