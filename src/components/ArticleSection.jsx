import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';

function ArticleSection () {
    return(
        <section className="container my-10 mx-auto">
            <h1 className="font-bold text-[24px] py-[16px] px-[16px] md:pb-[32px] md:px-0 ">Latest articles</h1>

            <div className="md:flex md:justify-between md:items-center md:rounded-lg py-[16px] px-[24px] bg-[#EFEEEB]">
                <ul class = "hidden md:flex text-[16px]">
                    <li><a href="#" class="py-[12px] px-[20px] text-[#75716B] hover:bg-[#DAD6D1] hover:rounded-lg hover:text-black">Highlight</a></li>
                    <li><a href="#" class="py-[12px] px-[20px] text-[#75716B] hover:bg-[#DAD6D1] hover:rounded-lg hover:text-black">Cat</a></li>
                    <li><a href="#" class="py-[12px] px-[20px] text-[#75716B] hover:bg-[#DAD6D1] hover:rounded-lg hover:text-black">Inspiration</a></li>
                    <li><a href="#" class="py-[12px] px-[20px] text-[#75716B] hover:bg-[#DAD6D1] hover:rounded-lg hover:text-black">Ganeral</a></li>
                </ul>

                <div className="relative">
                    <Input type="text" placeholder="Search" className="mb-[16px] md:mb-0 bg-white relative"/>
                    <Search strokeWidth={1} size={16} className="absolute top-[30%] right-[3%] cursor-pointer" />
                </div>
                <div className="md:hidden">
                    <h3 className="text-[16px] text-[#75716B] mb-[4px]">Category</h3>
                    <SelectArticle />
                </div>
            </div>

        </section>
)}

export default ArticleSection


function SelectArticle() {
    return (
      <Select>
        <SelectTrigger className="w-full bg-white text-[#75716B]">
          <SelectValue placeholder="Highlight" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Highlight</SelectLabel>
            <SelectItem value="Highlight">Highlight</SelectItem>
            <SelectItem value="Cat">Cat</SelectItem>
            <SelectItem value="Inspiration">Inspiration</SelectItem>
            <SelectItem value="Ganeral">Ganeral</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }