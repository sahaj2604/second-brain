import { ReactElement } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import DeleteIcon from "../icons/DeleteIcon";
import CardTag from "./CardTag";

interface cardProps {
  topText: string;
  title?: string | ReactElement;
  date: string;
  startIcon: ReactElement;
  children?: ReactElement;
  shareLink?:string
  type:string
}

const Card = (props: cardProps) => {
  return (
    <div className=" border-1 border-gray-600 w-80  rounded-lg p-4 bg-white text-black shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 ">
          {props.startIcon}
          {props.topText}
        </div>
        <div className="flex gap-1">
          <a href={props.shareLink}>
            <ShareIcon size="md" />
          </a>
          <DeleteIcon />
        </div>
      </div>
      <div className="my-2 text-xl font-bold">{props.title}</div>
      <div className="text-gray-800 ">
        {props.type=='youtube' && <iframe className="w-full rounded-lg"  src={props.shareLink?.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>}
        {props.type=='twitter' && <blockquote className="twitter-tweet max-w-5">
          <a href={props.shareLink?.replace("x.com","twitter.com")} className="max-w-5"></a>
        </blockquote>
        }
      </div>
      <div className="my-4 flex gap-1">
        <CardTag text="Productivity" />
        <CardTag text="ideas" />
      </div>
      <div className="text-xs text-gray-500">Added on {props.date}</div>
    </div>
  );
};

export default Card;
