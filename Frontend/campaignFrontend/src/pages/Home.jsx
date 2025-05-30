import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { use } from "react";

export default function Home() {
    const [campaigns, setCampaigns] = useState([]);
    const [statusfilter, setStatusFilter] = useState("");
    const [typefilter, setTypeFilter] = useState("");
    const [temp, setTempCampaigns] = useState([]);
    const[inputvalue,setInputValue]=useState("");
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await axios("http://localhost:3000/api/campaigns");
                const data = res.data;
                console.log("UseEffect Running : ", data);
                const now = Date.now();

                const updatedCampaigns = data.map((campaign) => {
                    const startDate = new Date(campaign.startDate);
                    const endDate = new Date(campaign.endDate);
                    let status = "";

                    if (now >= startDate && now <= endDate) {
                        status = "Ongoing";
                    } else if (now > endDate) {
                        status = "Ended";
                    } else if (now < startDate) {
                        status = "Upcoming";
                    }

                    return { ...campaign, status };
                });

                setCampaigns(updatedCampaigns);
                setTempCampaigns(updatedCampaigns);
            } catch (error) {
                console.error("Error fetching Campaigns", error);
            }
        };
        fetchCampaigns();
    }, []);

    const handleTypeFilter = (e) => {
        const val = e.target.value;
        setTypeFilter(val);
    }

    const handleStatusFilter = (e) => {
        const val = e.target.value;
        setStatusFilter(val);
    }
    const handleInputValue=(e)=>{
        const val=e.target.value;
        setInputValue(val);
    }
    useEffect(() => {
        let temp = [...campaigns];
        if (typefilter) {
            temp = temp.filter(c => c.campaignType === typefilter);
        }
        if (statusfilter) {
            temp = temp.filter(c => c.status === statusfilter);
        }
        setTempCampaigns(temp);
    }, [typefilter, statusfilter, campaigns]);
    useEffect(() => {
        let temp = [...campaigns];
        if (inputvalue) {
        temp= temp.filter(c =>
            c.campaignName.toLowerCase().includes(inputvalue.toLowerCase())
        );
        setTempCampaigns(temp);
        }else{
            setTempCampaigns(campaigns);
        }
        
    }, [inputvalue,campaigns]);
    if(campaigns.length===0){
        return(
            <>
            <div className="flex justify-center items-center">
                 <div className="max-w-6xl mx-auto p-4">
                    <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Campaign Dashboard</h1>
                    <div className="flex gap-5">
                    <a href="/create"><div className="p-[10px] bg-green-400 w-[200px] rounded-sm mb-2 text-center">Create Campaign</div></a>
                    <div className="bg-slate-100 p-[10px] w-[400px] rounded-sm mb-2">
                    <input className="w-full p-[5px] text-sm border-0" placeholder="🔍 Seach by campaign name . . ." type="text" value={inputvalue} onChange={handleInputValue} />
                    </div>
                    </div>
                    <h2 className="text-center text-slate-400 my-[50px]">No Campaigns Yet ! Create a Campaign .</h2>
                </div>
            </div>
               
                
            </>
        )
    }
    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Campaign Dashboard</h1>
            <div className="flex gap-5">
                <a href="/create"><div className="p-[10px] bg-green-400 w-[200px] rounded-sm mb-2 text-center">Create Campaign</div></a>
                <div className="bg-slate-100 p-[10px] w-[400px] rounded-sm mb-2">
                    <input className="w-full p-[5px] text-sm border-0" placeholder="🔍 Seach by campaign name . . ." type="text" value={inputvalue} onChange={handleInputValue} />
                </div>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <div className="flex flex-col">
                    <label htmlFor="filterbytype" className="text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        name="filterbytype"
                        id="filterbytype"
                        value={typefilter}
                        onChange={handleTypeFilter}
                        className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="" disabled>Choose type</option>
                        <option value="Email">Email</option>
                        <option value="SMS">SMS</option>
                        <option value="Social Media">Social Media</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="filterbystatus" className="text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        name="filterbystatus"
                        id="filterbystatus"
                        value={statusfilter}
                        onChange={handleStatusFilter}
                        className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="" disabled>Choose status</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Ended">Ended</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">Campaign Name</th>
                            <th className="px-4 py-3 text-left">Campaign Type</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Target Audience</th>
                            <th className="px-4 py-3 text-left">Reach</th>
                            <th className="px-4 py-3 text-left">End Date</th>
                            <th className="px-4 py-3 text-left">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {temp.map((c) => (
                            <tr key={c._id} className="border-t hover:bg-gray-100 transition-colors">
                                <td className="px-4 py-3">{c.campaignName}</td>
                                <td className="px-4 py-3">{c.campaignType}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 text-sm rounded-full font-semibold ${c.status === "Ongoing"
                                                ? "bg-green-100 text-green-700"
                                                : c.status === "Ended"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{c.targetAudience}</td>
                                <td className="px-4 py-3">{c.reach}</td>
                                <td className="px-4 py-3">{new Date(c.endDate).toLocaleDateString()}</td>
                                <td className="px-4 py-3">
                                    <Link
                                        to={`/campaign/${c._id}/${c.status}`}
                                        className="text-indigo-600 hover:underline font-medium"
                                    >
                                        View Summary ...
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
