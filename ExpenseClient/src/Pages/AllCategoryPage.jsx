import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

const AllCategoryPage = () => {
  return (
    <>
     <Header />     
    <div className="flex h-screen">       
      <Sidebar />               
      <div className="flex-1 p-6 bg-gray-200">
        <h1 className="text-3xl font-bold mb-4">All Category</h1>        
      </div>
    </div>
    </>
  )
}

export default AllCategoryPage