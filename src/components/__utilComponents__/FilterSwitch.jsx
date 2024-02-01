import clsx from "clsx";
import { useState } from "react";

export default function FilterSwitch({ keyName, filterName, setTarget }) {
  const [exclude, setExclude] = useState(false);

  const handleClick = () => {
    setExclude((prev) => !prev);

    setTarget((prev) => {
      const curr = structuredClone(prev);

      const map = curr[keyName].map((element) => {
        const elementTrimmed = element.startsWith("!")
          ? element.substring(1)
          : element;

        if (elementTrimmed === filterName) {
          if (element.startsWith("!")) return element.substring(1);
          return `!${element}`;
        }

        return element;
      });

      curr[keyName] = map;
      return curr;
    });
  };

  const styles = {
    bg: clsx(
      "flex h-5 cursor-pointer items-center gap-1 rounded-full p-2 transition-all",
      exclude && "flex-row-reverse",
      exclude ? "bg-[#EA525F80]" : "bg-[#EA855280]",
    ),
    text: clsx("text-xs", exclude ? "text-[#8D040F]" : "text-[#953200]"),
    icon: clsx(
      "h-3 w-3 rounded-full",
      exclude ? "bg-[#EA525F]" : "bg-[#EA8552]",
    ),
  };

  return (
    <div className={styles.bg} onClick={handleClick}>
      <span className={styles.text}>{exclude ? "Include" : "Exclude"}</span>
      <span className={styles.icon} />
    </div>
  );
}
