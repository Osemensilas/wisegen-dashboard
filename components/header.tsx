import { UserRound, } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        async function getUserSession(){
            try{
                const url = "http://localhost:8000/api/session";

                const response = await axios.get(url, {
                    headers: {
                        "Content-Type" : "application/json"
                    },withCredentials: true
                });

                // console.log(response.data);

                if (response.data.success === true){
                    setUserId(response.data.user.user_id);
                }else{
                    setUserId(null);
                }
            }catch(err){
                console.log("Could not retrieve user: ", err);
            }
        }
        getUserSession();
    },[])

    return ( 
        <>
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
                <div>
                    <p className="text-sm font-semibold text-amber-600">
                    WiseGen Admin
                    </p>

                    <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    Dashboard
                    </h1>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white">
                    <UserRound size={20} />
                </div>
            </div>
        </header>
        </>
     );
}
 
export default Header;