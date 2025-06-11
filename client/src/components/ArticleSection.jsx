import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "./Pagination"; // สมมติว่าคุณมีไฟล์นี้อยู่แล้ว
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./ui/LoadingSpinner";
import { formatDate } from "@/utils/dateUtils";

function ArticleSection() {
  const [categories, setCategories] = useState(["Highlight"]);
  const [category, setCategory] = useState("Highlight");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(searchTerm.trim());
      setPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  console.log(blogPosts);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = { page, limit: 6 };

      if (debouncedValue) {
        params.keyword = debouncedValue;
      } else {
        params.category = category === "Highlight" ? "" : category;
      }

      try {
        const response = await axios.get(`${apiUrl}/posts`, { params });
        setBlogPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setBlogPosts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedValue, category, page, apiUrl]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`);
        const categoryNames = response.data.map((cat) => cat.name);
        setCategories(["Highlight", ...categoryNames]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (newCategory) => {
    setSearchTerm("");
    setCategory(newCategory);
    setPage(1);
  };

  console.log("Blog posts:", blogPosts);

  return (
    <section className="container mx-auto">
      <h1 className="font-bold text-[24px] py-[16px] px-[16px] md:pb-[32px] md:px-0 ">
        Latest articles
      </h1>

      <div className="md:flex md:justify-between md:items-center md:rounded-lg py-[16px] px-[24px] bg-[#EFEEEB]">
        {/* Category Bar */}
        <div className="hidden md:flex text-[16px] gap-2 overflow-x-auto pb-2 whitespace-nowrap">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => handleCategoryClick(item)}
              className={`py-[12px] px-[20px] text-[#75716B] cursor-pointer rounded-lg hover:bg-gray-100 flex-shrink-0 ${
                category === item && !searchTerm
                  ? "bg-[#DAD6D1] text-black "
                  : ""
              }`}
              disabled={category === item && !searchTerm}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search articles..."
            onChange={handleSearchChange}
            value={searchTerm}
            className="mb-[16px] md:mb-0 bg-white md:w-120"
          />
          <Search
            strokeWidth={1}
            size={16}
            className="absolute top-[30%] right-[3%] cursor-pointer text-gray-400"
          />
        </div>

        {/* Mobile Category Select */}
        <div className="md:hidden">
          <h3 className="text-[16px] text-[#75716B] mb-[4px]">Category</h3>
          <SelectArticle
            selectedCategory={category}
            onCategoryChange={handleCategoryClick}
            categories={categories}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-[20px] px-4 md:px-0 mb-10">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                image={post.image}
                category={post.category_name}
                title={post.title}
                description={post.description}
                author={post.author_name}
                date={post.date}
                id={post.id}
                author_profile_pic={
                  post.author_profile_pic ||
                  "https://placehold.co/150x150/D7F2E9/12B279?text=User"
                }
                author_name={post.author_name || "Anonymous"}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-20 text-gray-500">
              <p>No articles found.</p>
              {debouncedValue && (
                <p>Try a different search term or clear the search.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}

function BlogCard({
  image,
  category,
  title,
  description,
  date,
  id,
  author_profile_pic,
  author_name,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex flex-col mt-12 cursor-pointer
        border border-gray-200 rounded-2xl shadow-md overflow-hidden
        transition-all duration-300 ease-in-out 
        hover:shadow-xl hover:scale-[1.03]       
      "
      onClick={() => navigate(`/post/${id}`)}
    >
      <div className="relative h-60 md:h-112">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
            {category || "General"}
          </span>
        </div>
        <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        <div className="flex items-center text-sm">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src={author_profile_pic}
            alt={author_name}
          />
          <span>{author_name}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </div>
  );
}

function SelectArticle({ selectedCategory, onCategoryChange, categories }) {
  return (
    <Select
      value={selectedCategory}
      onValueChange={(value) => onCategoryChange(value)}
    >
      <SelectTrigger className="w-full bg-white text-[#75716B]">
        <SelectValue placeholder="Highlight" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((item) => (
            <SelectItem value={item} key={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ArticleSection;
