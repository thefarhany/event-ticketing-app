import { useEffect } from "react";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `EventX | ${title}` : "EventX | Ticket App";
  }, [title]);
}
