export const calculateElapsedTime = (timestamp) => {
  const currentTime = new Date();
  const messageTime = new Date(timestamp);
  const elapsedMilliseconds = currentTime - messageTime;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedWeeks = Math.floor(elapsedDays / 7);
  const elapsedYears = Math.floor(elapsedDays / 365);

  if (elapsedYears > 0) {
      return `${elapsedYears} year(s) ago`;
  } else if (elapsedWeeks > 0) {
      return `${elapsedWeeks} week(s) ago`;
  } else if (elapsedDays > 0) {
      return `${elapsedDays} day(s) ago`;
  } else if (elapsedHours > 0) {
      return `${elapsedHours} hour(s) ago`;
  } else if (elapsedMinutes > 0) {
      return `${elapsedMinutes} minute(s) ago`;
  } else {
      return `${elapsedSeconds || 1} second(s) ago`;
  }
};
