import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const AddExpensePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // API'den kategorileri al
    axios.get('https://localhost:7247/api/Categories/GetAllCategories', { withCredentials: true })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Kategori verileri alınırken hata oluştu:", error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);  // Seçilen kategori id'sini güncelle
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const expenseData = {
      expenseName,
      categoryId: selectedCategoryId,
      amount,
      date,
      description,
    };

    // Expense ekleme API isteği
    axios.post('https://localhost:7247/api/Expenses/AddExpense', expenseData, { withCredentials: true })
      .then(response => {
        console.log("Expense added successfully:", response.data);
        // Başarıyla ekledikten sonra yönlendirme veya işlem yapılabilir.
      })
      .catch(error => {
        console.error("Expense eklenirken hata oluştu:", error);
      });
  };

  return (
    <> 
      <Header />     
      <div className="flex h-screen">       
        <Sidebar />               
        <div className="flex-1 p-6 bg-gray-200">
          <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add New Expense</h2>
            <p className="text-sm text-center mb-6">Fill out the form below to add a new expense.</p>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="expenseName" className="block text-sm font-medium text-gray-700">Expense Name</label>
                <input 
                  id="expenseName" 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                  placeholder="Enter expense name" 
                  required
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)} 
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select 
                  id="category" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                  value={selectedCategoryId} 
                  onChange={handleCategoryChange} 
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName} 
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input 
                  id="amount" 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                  placeholder="Enter amount" 
                  required 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)} 
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input 
                  id="date" 
                  type="date" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)} 
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  id="description" 
                  rows="4" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                  placeholder="Optional description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} 
                />
              </div>

              <div className="flex justify-between gap-2">
                <button 
                  type="button" 
                  className="w-1/2 px-4 py-2 text-red-500 border border-red-700 rounded-lg hover:bg-red-500 hover:text-white transition"
                  onClick={() => {
                    // Formu sıfırlamak için
                    setExpenseName('');
                    setAmount('');
                    setDate('');
                    setDescription('');
                    setSelectedCategoryId('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 px-4 py-2 text-white bg-green-700 rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpensePage;
