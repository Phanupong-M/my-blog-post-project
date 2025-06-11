// import { Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Linked from "../assets/icons/LinkedIN_black.svg";
import Github from "../assets/icons/Github_black.svg";
import Google from "../assets/icons/Google_black.svg";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#EFEEEB] flex md:flex-row md:justify-between md:px-[120px] flex-col items-center py-10 gap-6">
      <div className="flex flex-row gap-6">
        <p className="text-[16px] font-bold text-[#34303B] pt-1">
          Get in touch
        </p>

        <div className="flex flex-row gap-4 ">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Linked}
                alt="LinkedIn"
                className="w-[24px] h-[24px] cursor-pointer"
              />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Github}
                alt="LinkedIn"
                className="w-[24px] h-[24px] cursor-pointer"
              />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Google}
                alt="LinkedIn"
                className="w-[24px] h-[24px] cursor-pointer"
              />
            </a>
        </div>
      </div>

      <a
        href="#"
        onClick={() => navigate(`/`)}
        className="underline font-bold text-base"
      >
        Home page
      </a>
    </footer>
  );
}

export default Footer;
