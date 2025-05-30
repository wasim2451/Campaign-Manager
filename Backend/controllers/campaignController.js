const Campaign=require('../models/Campaign');

async function createCampaign(req,res){
    const {
        campaignName,
        startDate,
        endDate,
        targetAudience,
        campaignType,
    }=req.body
    console.log("Received data",req.body);
    const date=new Date();
    if(startDate<date){
        return res.status(404).send("Start date can not be in the past!");
    }
    if(endDate<=date){
        return res.status(404).send("End date can not be in the past or present!");
    }
    await Campaign.create({
        campaignName,
        startDate,
        endDate,
        targetAudience,
        campaignType
    });
    return res.send('Done Storing');
}

async function getAllCampaigns(req,res){
    const campaigns=await Campaign.find({});
    // console.log(campaigns);
    return res.json(campaigns);
}

async function getCampaignById(req,res){
    const {id}=req.params;
    const campaign=await Campaign.findById(id);
    return res.json(campaign);
}

module.exports={
    createCampaign,
    getAllCampaigns,
    getCampaignById
}