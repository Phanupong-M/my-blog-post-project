import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import React, { useState } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { Search, ChevronDown, Pencil, Trash2 } from 'lucide-react';

const AdminArticleManagement = () => {
  const [statusFilter, setStatusFilter] = useState('Status');
  const [categoryFilter, setCategoryFilter] = useState('Category');

  // Sample data - replace with your actual data
  const articles = [
    {
      title: "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do",
      category: "Cat",
      status: "Published"
    },
    {
      title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
      category: "Cat",
      status: "Published"
    },
    {
      title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
      category: "General",
      status: "Published"
    },
    {
      title: "The Science of the Cat's Purr: How It Benefits Cats and Humans Alike",
      category: "Cat",
      status: "Published"
    },
    {
      title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy",
      category: "Cat",
      status: "Published"
    },
    {
      title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
      category: "Inspiration",
      status: "Published"
    }
  ];

  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar title="Article management" buttonTitle="Create article" isPlus={true} />
        
        <div className="px-14 pt-10">

          {/* Search and Filters */}
          <div className="flex flex-row justify-between items-center gap-4 mb-6 ">
            <div className="flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>

            <div className='flex gap-4'>
              <div className="relative">
                <SelectBar title = "Status"/>
              </div>
              <div className="relative">
                <SelectBar title = "Category"/>
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
                {articles.map((article, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-4 px-6 text-sm">{article.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{article.category}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-green-500">Published</span>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminArticleManagement;

function SelectBar({title}) {
  return (
    <Select>
      <SelectTrigger className="w-[200px] py-4">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
