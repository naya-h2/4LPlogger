export const calcTime = (sec: number, type: "m" | "h") => {
  switch (type) {
    case "m":
      if (sec / 60 >= 60) return (sec / 60) % 60;
      return Math.round(sec / 60);
    case "h":
      return Math.round(sec / 3600);
  }
};
