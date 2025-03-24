import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const onFinish = async () =>{
        try {
            const res = await fetch("https://localhost:7247/api/Auths/logout",{
                method:"POST",            
                headers:{"Content-Type":"application/json; charset=UTF-8"},
            });
             const data = await res.json();
      if(res.status === 200 || res.status === 201){
        const msg = data.message;
        console.log(msg);
        navigate("/login");
      }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <div>
            <button onClick={()=>onFinish()} className='w-[400px] h-[150px] border bg-red-500 mt-[200px] ml-[500px] hover:bg-red-800 cursor-pointer'>Çıkış Yap</button>
        </div>
    </>
  )
}

export default HomePage