// components/LikeShareBar.jsx
import Smile from "../../assets/icons/Smile.svg";
import CopyLinkIcon from "../../assets/icons/Copy.svg";
import FacebookIcon from "../../assets/icons/Facebook.svg";
import LinkedInIcon from "../../assets/icons/Linkedin.svg";
import TwitterIcon from "../../assets/icons/Twitter.svg";

export default function LikeShareBar({
  likes,
  liked,
  isLiking,
  handleLike,
  copyToClipboard,
  shareToSocialMedia,
}) {
  return (
    <>
      {/* Desktop */}
      <div className="md:flex items-center mb-6 rounded-2xl bg-[#EFEEEB] p-4 hidden">
        <div
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-1 rounded-full px-10 py-3 border border-gray-200 shadow-sm cursor-pointer
            ${liked ? "bg-green-200 text-white" : "bg-white"}
            ${
              isLiking
                ? "cursor-not-allowed opacity-60"
                : "hover:bg-green-50"
            }
          `}
        >
          <img src={Smile} alt="like" />
          <span className="text-black">{likes}</span>
        </div>
        <div className="flex-grow"></div>
        <button
          className="mx-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm flex items-center cursor-pointer"
          onClick={copyToClipboard}
        >
          <img src={CopyLinkIcon} alt="Copy link" className="w-5 h-5 mr-2" />
          Copy link
        </button>
        <div className="flex items-center gap-2">
          <img
            src={FacebookIcon}
            alt="Facebook"
            className="cursor-pointer"
            onClick={() => shareToSocialMedia("facebook")}
          />
          <img
            src={LinkedInIcon}
            alt="LinkedIn"
            className="cursor-pointer"
            onClick={() => shareToSocialMedia("linkedin")}
          />
          <img
            src={TwitterIcon}
            alt="Twitter"
            className="cursor-pointer"
            onClick={() => shareToSocialMedia("twitter")}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col items-center mb-6 rounded-2xl bg-[#EFEEEB] p-4 gap-5 md:hidden">
        <div
          onClick={handleLike}
          disabled={isLiking}
          className={`flex justify-center items-center gap-1 w-full rounded-full px-10 py-3 border border-gray-200 shadow-sm cursor-pointer
            ${liked ? "bg-green-200 text-white" : "bg-white"}
            ${
              isLiking
                ? "cursor-not-allowed opacity-60"
                : "hover:bg-green-50"
            }
          `}
        >
          <img src={Smile} alt="like" />
          <span className="text-black">{likes}</span>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <button
            className="bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm flex items-center cursor-pointer"
            onClick={copyToClipboard}
          >
            <img src={CopyLinkIcon} alt="Copy link" className="w-5 h-5 mr-2" />
            Copy link
          </button>
          <div className="flex items-center gap-2">
            <img
              src={FacebookIcon}
              alt="Facebook"
              className="cursor-pointer h-[48px] w-[48px]"
              onClick={() => shareToSocialMedia("facebook")}
            />
            <img
              src={LinkedInIcon}
              alt="LinkedIn"
              className="cursor-pointer h-[48px] w-[48px]"
              onClick={() => shareToSocialMedia("linkedin")}
            />
            <img
              src={TwitterIcon}
              alt="Twitter"
              className="cursor-pointer h-[48px] w-[48px]"
              onClick={() => shareToSocialMedia("twitter")}
            />
          </div>
        </div>
      </div>
    </>
  );
}