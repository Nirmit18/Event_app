import axios from "axios";
import React, { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Create = (props) => {

    const navigate=useNavigate();
    const [name,setname]=useState("");
    const [date,setdate]=useState("");
    const [location,setlocation]=useState("");
    const [description,setdescription]=useState("");

    const handlesubmit = async()=>{
        try {
            await axios.post("http://localhost:8000/api/create-events",{
                name,date,location,description
            })
            setname("");
            setlocation("");
            setdate("");
            setdescription("");
            toast.success("Event created successfully!")
            console.log("data sent")
            // navigate("/home")
        } catch (error) {
            console.log("cant send event details")
            toast.error("Some error to create an event.")
            setname("");
            setlocation("");
            setdate("");
            setdescription("");
        }
    }

  return (
    <div>
        <div>
          <ToastContainer />
        </div>
        <div className="border-l-4 border-red-600 pl-4 ml-20 mt-10 text-2xl font-bold ">CREATE EVENT</div>
      <div class="flex items-center justify-center p-12 mt-16">
    <div class="mx-auto w-full max-w-[550px] bg-white">
        <form onSubmit={handlesubmit}>
            <div class="mb-5">
                <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                 Name of Event
                </label>
                <input type="text" name="name" id="name" placeholder="Event's Name"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                    onChange={(e)=>setname(e.target.value)}
                    value={name}
                    />
            </div>
            <div class="mb-5">
                <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                    Date
                </label>
                <input type="text" name="date" id="phone" placeholder="Enter the Date"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                    onChange={(e)=>setdate(e.target.value)}
                    value={date}

                    />
            </div>
            <div class="mb-5">
                <label for="text" class="mb-3 block text-base font-medium text-[#07074D]">
                    Location
                </label>
                <input type="text" name="email" id="email" placeholder="Enter your Location"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                    onChange={(e)=>setlocation(e.target.value)}
                    value={location}

                    />
            </div>
    

            <div class="mb-5 pt-3">
                <label class="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Description
                </label>
                <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 full">
                        <div class="mb-5">
                            <textarea name="description" id="des" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                            onChange={(e)=>setdescription(e.target.value)}
                            value={description}/> 
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button
                    class="hover:shadow-form w-full rounded-md bg-red-600 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-red-400">
                    CREATE EVENT
                </button>
            </div>
        </form>
    </div>
</div>
    </div>
  )
};

export default Create;
