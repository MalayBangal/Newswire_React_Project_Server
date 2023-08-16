const express = require('express');
const router = express.Router();
const {sendEmail} = require('../config/email');

const News = require('../models/news');

router.get('/news',async (req,res)=>{
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        console.log(error);
    }
});



//! ye react se dikhayenge , ye react ka kam hain dikhana .

// router.get('/news/new',(req,res)=>{
//     res.render('news');
// });

router.post('/news', async(req,res) =>{
    try {
        const newNews = new News(req.body.news);
        await newNews.save();
        res.json('ok') //! ye nehi kikha to 3001 server atak jayega surver responce dhundte rah jayega , jaruri hain .
    } catch (error) {
        console.log(error);
    }
});

router.get('/news/:id',async (req,res) =>{
    try {
        const news = await News.findById(req.params.id);
        res.json(news);
    } catch (error) {
        console.log(error);
    }
});

router.get('/news/:id/edit', async (req,res) =>{
    try {
        const news = await News.findById(req.params.id);
        res.json(news); //! isko use karke react me form prefilled karlenge.
    } catch (error) {
        console.log(error);
    }
});

router.patch('/news/:id', async(req,res) =>{
    try {
        await News.findByIdAndUpdate(req.params.id,req.body.news);
        res.json('ok');
    } catch (error) {
        console.log(error);
    }
});

router.delete('/news/:id',async (req,res)=>{
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json('ok');
    } catch (error) {
        console.log(error);
    }
});

router.post('/contact', async (req,res)=>{
    try {
        // console.log(req.body);
        const userObj = {
            subject:req.body.subject,
            content:req.body.content,
            email:req.body.email
        }
        await sendEmail(userObj);
        res.json('ok');
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;