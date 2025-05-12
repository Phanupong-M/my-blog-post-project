import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import React, { useState, useEffect } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { Search, Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminArticleManagement = () => {
  const [statusFilter, setStatusFilter] = useState('Status');
  const [categoryFilter, setCategoryFilter] = useState('Category');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const navigate = useNavigate();

  const statuses = [
    {
      id: 1,
      name: "Published",
    },
    {
      id: 2,
      name: "Draft",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/posts/admin"
        );
        setPosts(response.data.posts);
        setFilteredPosts(response.data.posts);
        const responseCategories = await axios.get(
          "http://localhost:4001/categories"
        );
        setCategories(responseCategories.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);


  useEffect(() => {
    let filtered = posts;

    if (searchKeyword) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          post.description
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          post.content.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) =>
        post.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter((post) =>
        post.status.toLowerCase().includes(selectedStatus.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [searchKeyword, selectedCategory, selectedStatus, posts]);


    // Pagination logic
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const paginatedPosts = filteredPosts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  

  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar 
          title="Article management" 
          actions={
            <button 
              className="flex items-center gap-2 px-10 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => navigate("/admin/article-management/create")}
            > 
              <Plus size={20} />
              <span>Create article</span>
            </button>
          }
        />
        <div className="px-14 pt-10">

          {/* Search and Filters */}
          <div className="flex flex-row justify-between items-center gap-4 mb-6">
            <div className="flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>

            <div className='flex gap-4'>
              <div className="relative">
                <SelectBar title="Status" array = {statuses} selected={selectedStatus} setSelected={setSelectedStatus} />
              </div>
              <div className="relative">
                <SelectBar title="Category" array={categories} selected={selectedCategory} setSelected={setSelectedCategory} />
              </div>
            </div>
          </div>

          {/* Article Table */}
          <div className="bg-white rounded-lg border border-gray-200 border-opacity-50">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-600">Article title</th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-600 w-[120px]">Category</th>
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-600 w-[120px]">Status</th>
                  <th className="py-4 px-6 w-[80px]"></th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">Loading...</td>
                  </tr>
                ) : paginatedPosts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">No articles found.</td>
                  </tr>
                ) : (
                  paginatedPosts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-200 last:border-b-0">
                      <td className="py-4 px-6 text-sm">{post.title}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{post.category}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm text-green-500">{post.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Pencil size={18} className="text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Trash2 size={18} className="text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-end p-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminArticleManagement;

function SelectBar({ title,array,selected,setSelected }) {
  return (
    <Select 
      value={selected}
      onValueChange={(value) => setSelected(value)}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {array.map((category) => (
            <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem> 
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
