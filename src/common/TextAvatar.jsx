import { stringToHexColor, getInitials } from "../../basicFunctions";
function Avatar({ name }) {
  const hash = stringToHexColor(name);
  return (
    <>
      <div className="flex gap-1 items-center">
        <div
          style={{ backgroundColor: hash }}
          className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden  rounded-full dark:bg-gray-600"
        >
          <span className="font-xs text-white dark:text-gray-300">
            {getInitials(name)}
          </span>
        </div>
        <div className="text-sm">{name}</div>
      </div>
    </>
  );
}
export default Avatar;
