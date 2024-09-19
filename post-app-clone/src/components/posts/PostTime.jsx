/* eslint-disable react/prop-types */
import { parseISO, formatDistanceToNow } from "date-fns";

function PostTime({ timeStamp }) {
  let time;
  if (timeStamp) {
    const timePeriod = parseISO(timeStamp);
    const timeAgo = formatDistanceToNow(timePeriod);
    time = timeAgo;
  }
  return <span className="time">{`${time} ago`}</span>;
}

export default PostTime;
