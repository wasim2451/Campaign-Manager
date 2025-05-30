const {Schema,model}=require('mongoose');
const CampaignSchema=new Schema({
    campaignName:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    targetAudience:{
        type:String,
        required:true
    },
    campaignType:{
        type:String,
        required:true,
        enum:["Email","SMS","Social Media"]
    },
    reach:{
        type:Number,
        default:()=>Math.floor(Math.random()*1000)+1
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

},{timestamps:true})

const Campaign=model('campaign',CampaignSchema);
module.exports=Campaign;