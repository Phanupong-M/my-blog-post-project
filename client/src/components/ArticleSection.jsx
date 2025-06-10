import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "./Pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import LoadingSpinner from "./ui/LoadingSpinner";
import { formatDate } from "@/utils/dateUtils";

// const categories = ["Highlight", "Cat", "Inspiration", "General"];

function ArticleSection() {
  const [categories, setCategories] = useState(["Highlight"]);
  const [category, setCategory] = useState("Highlight");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiUrl = import.meta.env.VITE_API_URL;

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

  // Pagination handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const fetchPostsByCategory = async (selectedCategory) => {
    setLoading(true);
    try {
      const categoryParam =
        selectedCategory === "Highlight" ? "" : selectedCategory;
      const response = await axios.get(`${apiUrl}/posts`, {
        params: { page, limit: 6, category: categoryParam },
      });

      setBlogPosts((prevPosts) =>
        page === 1
          ? response.data.posts
          : [...prevPosts, ...response.data.posts]
      );
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`, {
        params: { keyword: debouncedValue },
      });
      setSearchResults(response.data.posts);
    } catch {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(searchTerm.trim());
    }, 800);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    fetchPostsByCategory(category);
  }, [category, page]);

  useEffect(() => {
    searchPosts();
  }, [debouncedValue]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="container mx-auto">
      <h1 className="font-bold text-[24px] py-[16px] px-[16px] md:pb-[32px] md:px-0 ">
        Latest articles
      </h1>

      <div className="md:flex md:justify-between md:items-center md:rounded-lg py-[16px] px-[24px] bg-[#EFEEEB]">
        <div className="hidden md:flex text-[16px] gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`
                        py-[12px] px-[20px] text-[#75716B] cursor-pointer rounded-lg hover:bg-gray-100
                        ${
                          category === item ? "bg-[#DAD6D1] text-black " : ""
                        }}`}
              disabled={category === item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={searchTerm}
            className="mb-[16px] md:mb-0 bg-white md:w-120"
          />
          <Search
            strokeWidth={1}
            size={16}
            className="absolute top-[30%] right-[3%] cursor-pointer"
          />
          {searchResults &&
            searchTerm.length > 0 &&
            searchResults.length > 0 && (
              <div className="flex flex-col gap-2 absolute top-[120%] right-[3%] cursor-pointer z-2 p-2 bg-white rounded-lg">
                {searchResults.map((post) => (
                  <div
                    className="text-black hover:bg-[#DAD6D1] hover:text-[#75716B] p-3 rounded-2xl"
                    key={post.id}
                  >
                    {post.title}
                  </div>
                ))}
              </div>
            )}
        </div>

        <div className="md:hidden">
          <h3 className="text-[16px] text-[#75716B] mb-[4px]">Category</h3>
          <SelectArticle
            selectedCategory={category}
            onCategoryChange={setCategory}
            categories={categories}
          />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-[20px] px-4 md:px-0 mb-10 cursor-pointer">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
              id={post.id}
            />
          ))}
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
export default ArticleSection;

function BlogCard({ image, category, title, description, author, date, id }) {
  // const {postId} = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 mt-12">
      <a href="#" className="relative h-60 md:h-112">
        <img
          onClick={() => navigate(`/post/${id}`)}
          className="w-full h-full object-cover rounded-md"
          src={image}
          alt={title}
        />
      </a>
      <div className="flex flex-col">
        <div className="flex">
          <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
            {category}
          </span>
        </div>
        <a href="#">
          <h2
            onClick={() => navigate(`/post/${id}`)}
            className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline"
          >
            {title}
          </h2>
        </a>
        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        <div className="flex items-center text-sm">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={author}
          />
          <span>{author}</span>
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
