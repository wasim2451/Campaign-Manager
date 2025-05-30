const {Router}=require('express');
const {createCampaign,getAllCampaigns,getCampaignById} = require('../controllers/campaignController');
const router=Router();

router.get('/campaigns',getAllCampaigns);
router.post('/campaigns',createCampaign);
router.get('/campaigns/:id',getCampaignById);

module.exports=router;