import { useEffect } from "react";

export default function ProgressBar({scrollProgress}) {
  return (
  <div className="progress-bar-container">
    <div className="progress-bar" style={{width: `${scrollProgress}%`}}></div>
  </div>
  )
}