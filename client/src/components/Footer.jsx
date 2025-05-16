import { Github, Linkedin } from 'lucide-react';
import { useNavigate } from "react-router-dom";


function Footer () {
    const navigate = useNavigate();
    return(
        <footer className="bg-[#EFEEEB] flex md:flex-row md:justify-between md:px-[120px] flex-col items-center py-10 gap-6">
            <div className="flex flex-row gap-6">
                <p className="text-[16px] font-bold text-[#34303B] pt-1">Get in touch</p>

                <div className="flex flex-row gap-4">
                    <div className="bg-[#43403B] rounded-full p-2">
                    <Linkedin   className='text-white w-[16px] h-[16px] cursor-pointer'/>
                    </div>
                    <div className="bg-[#43403B] rounded-full p-2">
                    <Github className='text-white w-[16px] h-[16px] cursor-pointer'/>
                    </div>
                    <div className="bg-[#43403B] rounded-full p-2">
                    <Github  className='text-white w-[16px] h-[16px] cursor-pointer'/>
                    </div>
                </div>
            </div>

            <a href='#' onClick = {()=> navigate(`/`)} className='underline font-bold text-base'>Home page</a>
        </footer>

)}

export default Footer