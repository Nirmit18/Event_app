const User = require("../Schema/user_schema");
const Event = require("../Schema/event_schema")
const bcrypt = require("bcryptjs")


exports.signup = async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.json({
            message:"Invalid credentials",
        })
        return;
    }
    try {
        const user =await User.create(req.body);
        res.json({
            message:"user created successfully",
            user
        })
    } catch (error) {
        console.log("Error signing up",error);
        
    }
}

exports.singin = async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email){
            res.json({"message":"there is no email"});
        }
        if(!password){
            res.json({"message":"there is no password"});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.json({ "message": "User not found" });
        }

        const check = await bcrypt.compare(password,user.password);

        if(!check){
            console.log("signin error");
            res.json({
                message:"invalid details"
            })
            return;
        }
        sendTokenresponse(user,200,res);
    }catch(error){
        console.log("some error")
    }
}


const sendTokenresponse=async(user,codestatus,res)=>{
    const token = await user.getjwttoken();
    console.log(token);

    res.cookie('jwt-cookie',token,{
        httpOnly:true,
        maxAge:24*60*60*1000
    });

    res.status(codestatus).json({
        success: true,
        token,
        user
    })
    
}

exports.myevents = async (req, res) => {
    try {
        const event = await Event.create(req.body); 
        res.status(201).json({
            message: "Event created successfully",
            event, 
        });
    } catch (error) {
        console.error("Issue in event creation:", error);
        res.status(500).json({
            message: "Failed to create event",
        });
    }
};

exports.updateEvent=async(req,res)=>{
    const {id}=req.params;
    const { name, date, location, description } = req.body;

    try{
        const updatedEvent= await Event.findByIdAndUpdate(
            id,
            {name, date, location, description},
            {new:true,runValidators:true}
        );

        if(!updatedEvent){
            return res.status(404).json({
                message:'event not found',
            });
        }
        res.json({
            message: "Event updated successfully",
            updatedEvent,
        });
    }  catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({
            message: "Failed to update event",
        });
    }

}

exports.getallevents=async(req,res)=>{
    try{
        const events=await Event.find();
        console.log(events);
        
        res.status(200).json({
            message: "Events fetched successfully",
            events,  
        })
    }catch(error){
        console.log("error fetching details");
        res.json({
            message:"failed to fetch events",
        })
        
    }
}

exports.deleteevent = async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        console.log("deleted successfully");
        

        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({
            message: "Deleted successfully"
        });
    } catch (error) {
        console.error("Can't delete event:", error);
        res.status(500).json({
            message: "Failed to delete event"
        }); 
    }
}
