import React, { useState } from "react"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Home from "../pages/Home";

const SignUp = (props) => {

  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState('');

  const navigate = useNavigate();

  const handlesubmit = async(e)=>{
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/signup",{name,email,password},{ withCredentials: true })
      console.log("data sent")
      toast.success("User signed up successfully!")
      setname('');
      setemail('');
      setpassword('');
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      toast.error("There was an error signing up. Please try again.")
      setname('');
      setemail('');
      setpassword('');
        console.log("there is some error");
        
    }


  }

  return (
    <div>
        <div>
          <ToastContainer />
        </div>
        <section className="bg-white">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside className="relative block h-16         lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
              <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
          />
            </aside>

      <main
        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
      <div className="max-w-xl lg:max-w-3xl">
        

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to EventZ
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          A MERN EVENT MANAGER CREATED BY NIRMIT
        </p>

        <form action="#" className="mt-8 grid grid-cols-6 gap-6" onSubmit={handlesubmit}>
          <div className="col-span-4">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              id="FirstName"
              name="first_name"
              className="mt-1 w-full rounded-md border-gray-400 bg-gray-100 text-sm text-gray-700 shadow-md p-2"
              value={name}
              onChange={(e)=>setname(e.target.value)}
            />
          </div>


          <div className="col-span-4">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="Email"
              name="email"
              className="mt-1 w-full rounded-md border-gray-400 bg-gray-100 text-sm text-gray-700 shadow-md p-2" 
              onChange={(e)=>setemail(e.target.value)}
              value={email}
            />
          </div>

          <div className="col-span-4">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              name="password"
              className="mt-1 w-full rounded-md border-gray-200 text-sm text-gray-700 shadow-md p-2 bg-gray-100"
              onChange={(e)=>setpassword(e.target.value)}
              value={password}
            />
          </div>


          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our
              <a href="#" className="text-gray-700 underline"> terms and conditions </a>
              and
              <a href="#" className="text-gray-700 underline">privacy policy</a>.
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
              className="inline-block shrink-0 rounded-md border  bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring "

              type="submit"
            >
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <a href="/signin" className="text-gray-700 underline">Log in</a>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
    </div>
  )
};

export default SignUp;





