// Returns how many days have passed between date and today's date 
function daysPassedSince(date) {
    const todayDate = new Date();
    const diffTime = Math.abs(todayDate - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    return diffDays;
  }

module.exports = {
    daysPassedSince,
}