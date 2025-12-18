"use client";

import Image from "next/image";
import styles from "./_styles/page.module.scss";
import { FC, useEffect, useState } from "react";
import { formatPositions } from "./_lib/formatPositions";
import { channel } from "./_lib/channel";
import { getPositions } from "./_lib/actions";

export default function Home() {
  // const { data: positions } = await getPositions();
  const [positions, setPositions] = useState<PositionData[]>([]);

  async function loadData() {
    const { data } = await getPositions();
    if (!data) return;
    setPositions(data);
  }

  useEffect(() => {
    setTimeout(loadData, 5000);
  }, [positions]);

  const rankedPositions = formatPositions(positions);

  return (
    <div className={styles.page}>
      <div className={styles.leaderboard}>
        <h1>Leaderboard</h1>

        <ul className={styles.leaderboardList}>
          {rankedPositions.map((data, i) => (
            <Position data={data} key={i} />
          ))}
        </ul>
      </div>

      <Image
        src="/holiday-bg.jpg"
        alt="background"
        className={styles.backgroundImage}
        fill
      />
    </div>
  );
}

interface PositionProps {
  data: { name: string; time: string; rank: number };
}

const Position: FC<PositionProps> = ({ data: { name, time, rank } }) => {
  const rankClassName =
    rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronze" : "";

  return (
    <li className={styles.position}>
      <div className={styles.rank}>
        <h3 className={rank ? styles[rankClassName] : ""}>#{rank}</h3>
      </div>
      <div className={styles.name}>
        <h3>{name}</h3>
      </div>
      <div className={styles.time}>
        <h3>{time}</h3>
      </div>
    </li>
  );
};
