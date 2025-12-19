"use client";

import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "../_styles/addPosition.module.scss";
import prettyMilliseconds from "pretty-ms";
import { addPosition } from "../_lib/actions";

type pageProps = object;

const Page: FC<pageProps> = ({}) => {
  const [isCounting, setIsCounting] = useState(false);
  // displayed time on clock
  const [displayTime, setDisplayTime] = useState("");
  // in milliseconds
  const [startTime, setStartTime] = useState(0);
  const [timeDelta, setTimeDelta] = useState(0);

  // update displayTime every 100 milliseconds
  const updateDisplayTime = useCallback(() => {
    const timeDelta = Date.now() - startTime;
    setDisplayTime(prettyMilliseconds(timeDelta));
  }, [startTime]);

  useEffect(() => {
    if (!isCounting || !startTime) return;

    setTimeout(updateDisplayTime, 100);
  }, [isCounting, startTime, displayTime, updateDisplayTime]);

  // start and stop clock
  function handleClick(e: MouseEvent) {
    e.preventDefault();

    if (!isCounting) {
      setStartTime(Date.now());
      setIsCounting((state) => !state);
      setTimeDelta(0);
    }

    if (isCounting) {
      setTimeDelta(Date.now() - startTime);
      setIsCounting(false);
    }
  }

  function handleUserTimeInput(e: ChangeEvent<HTMLInputElement>) {
    const milliseconds = Number(e.target.value) * 1000;
    setTimeDelta(milliseconds);
  }

  return (
    <div className={styles.page}>
      <h1>Add Position</h1>

      <form action={addPosition} className={styles.form}>
        <div className={styles.formRow}>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Alex Farr" id="name" name="name" />
        </div>
        <div className={styles.stopwatch}>
          <input type="text" hidden name="time" value={timeDelta} />
          <input
            type="text"
            value={isCounting ? displayTime : prettyMilliseconds(timeDelta)}
          />
          <button
            onClick={handleClick}
            className={isCounting ? styles.red : ""}
          >
            {!isCounting ? "Start" : "Stop"}
          </button>
        </div>

        <div className={styles.formRow}>
          <label htmlFor="userTime">Input your own time (seconds)</label>
          <input type="number" id="userTime" onChange={handleUserTimeInput} />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Page;
