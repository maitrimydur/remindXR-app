import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";

// Corrected image import paths
import companyLogo from "../assets/logo.png"; // Or "../assets/logo.svg"
import visualIcon from "../assets/visual.png";
import audioIcon from "../assets/audio.png";
import hapticIcon from "../assets/haptic.png";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      {/* ───── Top header ───── */}
      <div className={styles.top}>
        {/* Use your imported logo */}
        <img
          src={companyLogo}
          alt="ReMind-XR Logo"
          className={styles.logo}
        />

        <div className={styles.topTitle}>ReMind-XR</div>
        <div className={styles.topSubtitle}>MEMORY&nbsp;TRAINING</div>
      </div>

      {/* ───── Light-blue panel ───── */}
      <div className={styles.bottom}>
        <div className={styles.welcomeSmall}>Welcome&nbsp;to</div>
        <div className={styles.brandBig}>ReMind-XR!</div>

        <div className={styles.tagline}>
          Remember&nbsp;More,<br />
          Live&nbsp;Better.
        </div>

        <p className={styles.desc}>
          Multisensory, load-adaptive memory<br />
          sessions in just 10&nbsp;minutes a day.
        </p>

        {/* Mode icons */}
        <div className={styles.iconRow}>
          {/* Visual */}
          <div className={styles.iconItem}>
            <div className={styles.iconWrapper}>
              {/* Use your imported visual icon */}
              <img
                src={visualIcon}
                alt="Visual"
                className={styles.iconImage}
              />
            </div>
            <div className={styles.iconLabel}>Visual</div>
          </div>

          {/* Audio */}
          <div className={styles.iconItem}>
            <div className={styles.iconWrapper}>
              {/* Use your imported audio icon */}
              <img
                src={audioIcon}
                alt="Audio"
                className={styles.iconImage}
              />
            </div>
            <div className={styles.iconLabel}>Audio</div>
          </div>

          {/* Haptic */}
          <div className={styles.iconItem}>
            <div className={styles.iconWrapper}>
              {/* Use your imported haptic icon */}
              <img
                src={hapticIcon}
                alt="Haptic"
                className={styles.iconImage}
              />
            </div>
            <div className={styles.iconLabel}>Haptic</div>
          </div>
        </div>

        <button
          className={styles.ctaButton}
          onClick={() => navigate("/consent")}
        >
          Get&nbsp;Started
        </button>
      </div>
    </div>
  );
}