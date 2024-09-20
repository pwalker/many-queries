const getRandomTimeout = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const simulateDbAccess = () => {
  const duration = getRandomTimeout(1_000, 3_000);
  return new Promise((resolve) => setTimeout(resolve, duration));
};
