import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import { blogPosts } from "@/data/blogPosts";
import {useState} from 'react'

const categories = ["Highlight", "Cat", "Inspiration", "General"];

function ArticleSection () {

  const [category, setCategory] = useState("Highlight")
  const selectCategory = category === "Highlight" ? blogPosts : blogPosts.filter((data) => data.category === category)
  console.log(category)
  
    return(
        <section className="container mx-auto">
            <h1 className="font-bold text-[24px] py-[16px] px-[16px] md:pb-[32px] md:px-0 ">Latest articles</h1>

            <div className="md:flex md:justify-between md:items-center md:rounded-lg py-[16px] px-[24px] bg-[#EFEEEB]">
                <div className = "hidden md:flex text-[16px] gap-2">
                  {categories.map((item) => (
                      <button key = {item} onClick = {() => setCategory(item)} className={`
                        py-[12px] px-[20px] text-[#75716B] cursor-pointer rounded-lg hover:bg-gray-100
                        ${category === item
                        ? "bg-[#DAD6D1] text-black " : ""
                        }}`}
                        
                        disabled = {category === item} >{item}</button>
                  ))}
                </div>
                <div className="relative">
                    <Input type="text" placeholder="Search" className="mb-[16px] md:mb-0 bg-white relative"/>
                    <Search strokeWidth={1} size={16} className="absolute top-[30%] right-[3%] cursor-pointer" />
                </div>
                <div className="md:hidden">
                    <h3 className="text-[16px] text-[#75716B] mb-[4px]">Category</h3>
                    <SelectArticle  selectedCategory = {category} onCategoryChange = {setCategory}/>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-[20px] px-4 md:px-0">
                {selectCategory.map((post, index) => (
                  <BlogCard
                    key={index}
                    image={post.image}
                    category={post.category}
                    title={post.title}
                    description={post.description}
                    author={post.author}
                    date={post.date}
            />
            ))}
          </div>
           <h2 className="md:py-[100px] py-[50px] text-center underline font-bold cursor-pointer">View more</h2>
        </section>
)}
export default ArticleSection

  function BlogCard({image, category, title, description, author, date}) {
    return (
      <div className="flex flex-col gap-4 mt-12">
        <a href="#" className="relative h-60 md:h-112">
          <img className="w-full h-full object-cover rounded-md" src={image} alt={title}/>
        </a>
        <div className="flex flex-col">
          <div className="flex">
            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">{category}
            </span>
          </div>
          <a href="#" >
            <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline">
            {title}
            </h2>
          </a>
          <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
           {description}</p>
          <div className="flex items-center text-sm">
            <img className="w-8 h-8 rounded-full mr-2" src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" alt={author} />
            <span>{author}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    );
   }


function SelectArticle({selectedCategory, onCategoryChange}) {

  // console.log("category:", selectedCategory); // ตรวจสอบค่า category
  // console.log("setCategory:", onCategoryChange); // ตรวจสอบว่า setCategory เป็นฟังก์ชันหรือไม่

  return (
    <Select value={selectedCategory} onValueChange={(value) => onCategoryChange(value)}>
      <SelectTrigger className="w-full bg-white text-[#75716B]">
        <SelectValue placeholder="Highlight" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {categories.map((item) => ( 
              <SelectItem value={item} key = {item}>{item}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}


 