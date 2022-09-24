function daysPassedSince(joinDate) {
    const todayDate = new Date();
    const diffTime = Math.abs(todayDate - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    return diffDays;
  }

module.exports = {
    daysPassedSince,
}