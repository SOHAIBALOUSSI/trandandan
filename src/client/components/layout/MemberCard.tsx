export function MemberCard(props: {
  name: string;
  sold: string;
  grade: string;
  avatar: string;
  rank: string;
}) {
  const memberCard = (
    <div className="">
      <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md w-auto">
        <img
          src={props.avatar}
          alt={`Profile avatar`}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-white text-lg font-semibold">{props.name}</span>
          <span className="text-gray-400 text-sm">Sold: {props.sold}</span>
          <span className="text-gray-400 text-sm">Grade: {props.grade}</span>
          <span className="text-yellow-400 text-sm">Rank: {props.rank}</span>
        </div>
      </div>
    </div>
  );

  return memberCard;
}
