/**
 * n초를 hh:mm:ss로 변환하는 함수
 * @param sec 초 단위
 */
export const calcTime = (sec: number) => {
  const h = sec / 3600;
  const m = (sec % 3600) / 60;
  const s = (sec % 3600) % 60;

  return `${Math.floor(h).toString().padStart(2, "0")}:${Math.floor(m).toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};
