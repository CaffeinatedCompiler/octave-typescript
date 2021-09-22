// calculate Total Duration of a Song and returns in a string format mm:ss
export function calculateDurationTime(duration: number) {
  let durationMinute = Math.floor(duration / 60).toString(); // minutes
  let durationSeconds = Math.floor(duration % 60).toString(); // Seconds
  if (parseInt(durationSeconds) < 10) durationSeconds = `0${durationSeconds}`; // to make 1 as 01
  return `${durationMinute}:${durationSeconds}`;
}

// calculate Current Time of a Song and returns in a string format mm:ss
export function calculateCurrentTime(currentTime: number) {
  let currentMinute = Math.floor(currentTime / 60).toString(); // minutes
  let currentSeconds = Math.floor(currentTime % 60).toString(); // seconds
  if (parseInt(currentSeconds) < 10)
    // to make 1 as 01
    currentSeconds = `0${currentSeconds}`;
  return `${currentMinute}:${currentSeconds}`;
}
