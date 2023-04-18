export const generateShopData = () => {
  const data = [];
  const shopCount = 10;
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day).toISOString().split("T")[0];

    for (let i = 1; i <= shopCount; i++) {
      const shopId = `A${String(i).padStart(3, "0")}`;
      const entranceCount = Math.floor(Math.random() * (200 - 10 + 1)) + 50;

      for (let j = 0; j < entranceCount; j++) {
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        const second = Math.floor(Math.random() * 60);

        data.push({
          salon: shopId,
          date: date,
          time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`,
        });
      }
    }
  }

  return data;
};
