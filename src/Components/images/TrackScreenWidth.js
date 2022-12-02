import { useState, useEffect } from "react";
const TrackScreenWidth = ({ breakPoint, width }) => {
  const breakPoint = { breakPoint };
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
  }, [width]);
};

export default TrackScreenWidth;
