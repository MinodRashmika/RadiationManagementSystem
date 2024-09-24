import React, { useEffect, useState } from "react";

function useDelayUnmount(isMounted, delayTime) {
  const [showDiv, setShowDiv] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime); //delay the unmount
    }
    return () => clearTimeout(timeoutId); // cleanup mechanism to reset the timer on unmounting
  }, [isMounted, delayTime, showDiv]);
  return showDiv;
}

export default useDelayUnmount;