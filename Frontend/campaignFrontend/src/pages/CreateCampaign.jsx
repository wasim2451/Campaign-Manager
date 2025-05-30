import { useState } from "react";
import axios from "axios";

export default function CreateCampaign() {
    const [form, setForm] = useState({
        campaignName: "",
        startDate: "",
        endDate: "",
        targetAudience: "",
        campaignType: "Email"
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(form);
        const date = new Date();
        const startDate = new Date(form.startDate);
        const endDate = new Date(form.endDate);
        if (startDate < date) {
            alert("Start date can not be in the past !");
            return;
        }
        if (endDate <= date) {
            alert("End date can not be in the past or present !");
            return;
        }
        if(endDate<startDate){
            alert("End date can not be less than StartDate !");
            return;
        }
        try {
            await axios.post('http://localhost:3000/api/campaigns', form);
        } catch (error) {
            console.error(error);
        }
        alert("Campaign Created !");

    };


    return <>
        <div className="flex justify-center items-center m-4"><a href="/"><div className="p-[10px] bg-blue-300 w-[200px] rounded-sm mb-2 text-center">Visit Dashboard</div></a></div>
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create Campaign</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Campaign Name */}
                <div>
                    <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign Name
                    </label>
                    <input
                        type="text"
                        name="campaignName"
                        id="campaignName"
                        value={form.campaignName}
                        onChange={handleChange}
                        placeholder="Enter campaign name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Start Date */}
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        id="startDate"
                        value={form.startDate.replace('Z', '')}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        id="endDate"
                        value={form.endDate.replace('Z', '')}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Target Audience */}
                <div>
                    <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">
                        Target Audience
                    </label>
                    <textarea
                        name="targetAudience"
                        id="targetAudience"
                        value={form.targetAudience}
                        onChange={handleChange}
                        placeholder="Who will see this campaign?"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Campaign Type */}
                <div>
                    <label htmlFor="campaignType" className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign Type
                    </label>
                    <select
                        name="campaignType"
                        id="campaignType"
                        value={form.campaignType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 bg-slate-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select type</option>
                        <option value="Email">Email</option>
                        <option value="SMS">SMS</option>
                        <option value="Social Media">Social Media</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

    </>
}
