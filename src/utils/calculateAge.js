export default function calculateAge(date) {
  const birthDate = new Date(date);
  const currentDate = new Date();

  let roundedAge;

  const ageInMiliSec = currentDate - birthDate;
  const ageInYears = ageInMiliSec / (365 * 24 * 60 * 60 * 1000);
  const floorValue = Math.floor(ageInYears);

  floorValue === 0 ? (roundedAge = "-") : (roundedAge = floorValue);

  return roundedAge;
}
