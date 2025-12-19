"use client";

import Image from "next/image";
import styles from "./_styles/page.module.scss";
import { FC, useCallback, useEffect, useState } from "react";
import { formatPositions } from "./_lib/formatPositions";
import { deletePosition, getPositions } from "./_lib/actions";
import Link from "next/link";

export default function Home() {
  const [positions, setPositions] = useState<PositionData[]>([]);
  const [isLoadLoop, setIsLoadLoop] = useState(true);

  async function handleDelete(id: string) {
    // pause loadData function
    setIsLoadLoop(false);

    // update local data
    const newPositions = positions.filter((position) => {
      return id !== position.id;
    });
    setPositions(newPositions);

    // delete from server
    deletePosition(id);

    // enable loadData
    setIsLoadLoop(true);
  }

  useEffect(() => {
    async function loadData() {
      const { data } = await getPositions();
      if (!data) return;
      setPositions(data);
    }

    // only fetch if not paused
    if (isLoadLoop) {
      setTimeout(loadData, 5000);
    }
  }, [positions, isLoadLoop]);

  const rankedPositions = formatPositions(positions);

  return (
    <div className={styles.page}>
      <div className={styles.leaderboard}>
        <h1>Leaderboard</h1>

        <ul className={styles.leaderboardList}>
          {rankedPositions.map((data, i) => (
            <Position data={data} handleDelete={handleDelete} key={i} />
          ))}
        </ul>
      </div>

      <Image
        src="/holiday-bg.jpg"
        alt="background"
        className={styles.backgroundImage}
        fill
      />

      <Link href="/add-position" className={styles.link}>
        Add positions
      </Link>
    </div>
  );
}

interface PositionProps {
  data: { name: string; time: string; rank: number; id: string };
  handleDelete: (id: string) => Promise<void>;
}

const Position: FC<PositionProps> = ({
  handleDelete,
  data: { name, time, rank, id },
}) => {
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

      <button
        className={styles.close}
        onClick={() => {
          handleDelete(id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </li>
  );
};
