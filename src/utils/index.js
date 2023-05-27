export const CapitilizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const CalculateDaysFromToday = (givenTime) => {
  const now = new Date();
  const targetTime = new Date(givenTime);

  const timeDiff = targetTime.getTime() - now.getTime();

  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

export const checkImageURL = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(true); // Image is valid
    };
    img.onerror = () => {
      reject(false); // Image is not valid
    };
    img.src = url;
  });
};
