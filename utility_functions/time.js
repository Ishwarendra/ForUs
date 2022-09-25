// Converts time from 24 Hour to 12 Hour format
function get12HourFormat(date)
{
  var suffix = "AM (IST)"
  hour = date.getHours()
  minute = date.getMinutes()

  if (hour > 12)
  {
    suffix = "PM (IST)"
    hour = hour % 12;
    if (hour === 0)
      hour = 12;
  }

  const norm = (s) => {
    s = s.toString();
    if (s.length === 1)
      return "0" + s;
    return s;
  };

  hour = norm(hour);
  minute = norm(minute);
  return `${hour}:${minute} ${suffix}`
}

module.exports = {
  get12HourFormat,
}