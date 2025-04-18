import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';

const AdminCreateCategory = () => { 
    return(
    <div className="flex h-screen bg-white">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
            <AdminNavbar title="Create Category" buttonTitle="Create category" isPlus={true} />
        </div>
    </div>
    )
}

export default AdminCreateCategory; 