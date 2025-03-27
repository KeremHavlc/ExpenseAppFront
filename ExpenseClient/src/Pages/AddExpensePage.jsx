import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

const AddExpensePage = () => {
  return (
    <> 
    <Header />     
    <div className="flex h-screen">       
      <Sidebar />               
      <div className="flex-1 p-6 bg-gray-200">
        <h1 className="text-3xl font-bold mb-4">Add new Expense</h1>
        <p>Form or details for adding a new expense go here.</p>
      </div>
    </div>
    </>
  )
}

export default AddExpensePage