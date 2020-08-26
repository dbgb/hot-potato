import React from "react";
import { GoPlus } from "react-icons/go";
import styles from "./QuickListButton.module.css";

export default function QuickListButton() {
  return <GoPlus className={styles.addIcon} />;
}
