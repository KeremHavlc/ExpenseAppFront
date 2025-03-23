import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../Utilites/images/bg.png'; 
const RegisterPage = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username , setUsername] = useState("");
  const [roleId , setRoleId] = useState("00000000-0000-0000-0000-000000000002");
  
  const onFinish = async(values)=>{
    try {
      const res = await fetch("https://localhost:7247/api/Auths/register",{
        method : "POST",
        body:JSON.stringify(values),
        headers:{"Content-Type":"application/json; charset=UTF-8"},
      });
      const data = await res.json();
      if(res.status === 200 || res.status === 201){
        const d = data.message;
        console.log(d);
      }
      else{
        console.log("Beklenmedik bir hata oluştu");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();
  return (
    <>
    <motion.div
      className=""
      initial={{ x: "-100%" }} // Sayfa soldan gelsin
      animate={{ x: 0 }}       // Sayfa normal konumda görünsün
      exit={{ x: "100%" }}      // Sayfa sağ tarafa kayarak çıksın
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-screen select-none">
      {/* Sol taraf */}
      <div className="w-1/3 bg-[#3eb599] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome Back!</h1>
        <h1 className="text-xl font-bold text-white">To keep connected with us please </h1>
        <h1 className="text-xl font-bold text-white">login with your personal info</h1>

        <button onClick={() => navigate("/login")}
         className='border-2 border-white w-[250px] h-[50px] rounded-3xl mt-8 text-white text-2xl hover:bg-[#38a189]'>SIGN IN</button>
      </div>

      {/* Sağ Taraf (Kayıt Formu) */}
      <div className="w-2/3 flex flex-col justify-center items-center" style={{ backgroundImage: `url(${bgImage})` }}>       
        <h1 className="text-5xl text-[#3eb599] font-bold ">Create Account</h1>       
        <div className="mt-7 flex gap-4">
          <div className="w-[55px] h-[55px] border rounded-full flex justify-center items-center border-[#3eb599] font-bold text-[#3eb599] text-xl">f</div>
          <div className="w-[55px] h-[55px] border rounded-full flex justify-center items-center border-[#3eb599] font-bold text-[#3eb599] text-xl">G+</div>
          <div className="w-[55px] h-[55px] border rounded-full flex justify-center items-center border-[#3eb599] font-bold text-[#3eb599] text-xl">in</div>
        </div>
        <div className="mt-6">
          <h1 className="font-bold text-gray-600">or use your email for registration</h1>
        </div>        
        <div className="mt-6 w-96 p-6 bg-white shadow-lg rounded-lg">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3eb599] border-[#3eb599]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-2 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3eb599] border-[#3eb599]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3eb599] border-[#3eb599]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={()=>onFinish({username,email,password,roleId})} className="w-full bg-[#3eb599] text-white py-2 rounded-md text-lg font-bold focus:ring-[#3eb599] hover:bg-[#38a189]">Sign Up</button>
        </div>
      </div>
    </div>
    </motion.div>
    </>
  )
}

export default RegisterPage;
