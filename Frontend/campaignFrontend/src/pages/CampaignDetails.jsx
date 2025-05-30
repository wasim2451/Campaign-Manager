import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function CampaignDetails() {
    const { id, status } = useParams();
    const [details, setDetails] = useState({
        campaignName: "",
        startDate: "",
        endDate: "",
        campaignType: "",
        reach: "",
        status: "",
        daysDifference: "",
        targetAudience:""
    })
    function calculateDays(startDate, endDate) {
        const start = new Date();
        const end = new Date(endDate);
        const timeDifference = end.getTime() - start.getTime();
        const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));
        return daysDifference;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/campaigns/${id}`);
                const data = res.data;
                console.log("Data from Backend", data);
                const diff = calculateDays(data.startDate, data.endDate);
                console.log("Difference Days", diff);
                setDetails({
                    campaignName: data.campaignName,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    campaignType: data.campaignType,
                    reach: data.reach,
                    daysDifference: diff,
                    status: status,
                    targetAudience:data.targetAudience
                });
            } catch (error) {
                console.error("Data fectching Error :", error)
            }
        }
        fetchData();

    }, [id, status]);

    useEffect(() => {
        console.log(details);
    }, [details])

    return (
        <>
            <div className="flex justify-center items-center m-4"><a href="/"><div className="p-[10px] bg-blue-300 w-[200px] rounded-sm mb-2 text-center">Visit Dashboard</div></a></div>
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200 mt-7">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4">{details.campaignName}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                    <div>
                        <span className="font-semibold">Start Date:</span>{" "}
                        {new Date(details.startDate).toLocaleDateString()}
                    </div>
                    <div>
                        <span className="font-semibold">End Date:</span>{" "}
                        {new Date(details.endDate).toLocaleDateString()}
                    </div>
                    <div>
                        <span className="font-semibold">Campaign Type:</span> {details.campaignType}
                    </div>
                    <div>
                        <span className="font-semibold">Target Audience:</span> {details.targetAudience}
                    </div>
                    <div>
                        <span className="font-semibold">Reach:</span> {details.reach}
                    </div>
                    <div>
                        <span className="font-semibold">Days left:</span> {details.daysDifference} days
                    </div>
                    <div>
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                            className={`px-2 py-1 text-sm rounded-full font-semibold ${details.status === "Ongoing"
                                    ? "bg-green-100 text-green-700"
                                    : details.status === "Ended"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                        >
                            {details.status}
                        </span>
                    </div>
                </div>
            </div>
        </>

    )

}