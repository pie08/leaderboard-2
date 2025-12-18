export function formatPositions(positions: PositionData[]) {
  return positions
    .map((el, i) => Object.assign(el, { rank: i + 1 }))
    .map((el) => {
      const seconds = Math.floor((el.time / 1000) % 60)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor(el.time / 60000);
      return { ...el, time: `${minutes}:${seconds}` };
    });
}
