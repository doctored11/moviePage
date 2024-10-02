interface RatingResult {
  validRating: number;
  colorRating: string;
}

export function getValidRating(rating: number): RatingResult {
  let validRating = Math.max(0, Math.min(rating, 10));
  validRating = parseFloat(validRating.toFixed(1));
  let colorRating = "";

  if (validRating >= 9.2) {
    colorRating = "green";
  } else if (validRating >= 8) {
    colorRating = "yellow";
  } else if (validRating >= 5.5) {
    colorRating = "gray";
  } else {
    colorRating = "red";
  }

  return { validRating, colorRating };
}


export function getValidDurating(min:number):string{
    if (min < 0) {
        throw new Error('Minutes cannot be negative');
      }
    
      const hours = Math.floor(min / 60);
      const remainingMinutes = min % 60;
    
      return `${hours} ч ${remainingMinutes} мин`;
}