/* eslint-disable react/prop-types */
import { parseISO, formatDistanceToNow } from "date-fns";

const DateRendering = ({ timestamp }) => {
  console.log("timestamp", timestamp);
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      <i>{timeAgo}</i>
    </span>
  );
};

export default DateRendering;
