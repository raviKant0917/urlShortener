import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { url } from '../models/url.js';

export const toHome = async (req, res) => {
    console.log('here');
    const shortUrls = await url.find();
    console.log(shortUrls);
    // res.render('index', {shortUrls : shortUrls})
    res.status(200).json({
        success: 'true',
        body: shortUrls
    })
}

export const getUrl = async (req, res) => {
    try {
        const shortId = req.params.shortUrl
        const urlfound = await url.findOne({shortUrl: shortId})
        if(!urlfound) return res.status(404).json({message: 'url not found'})
        await urlfound.clicks++;
        urlfound.save();
        
        res.redirect(urlfound.fullUrl);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: 'failed',
            error: err.message
        })
    }
    
}

export const postUrl = async(req, res) => {
    try {
        console.log(req.body)
        if(!req.body) return res.status(400).json({'message' : 'failed'})
        console.log(req.body.url);
        const shortId = nanoid(8);
        const newShortUrl = await url.create({
            fullUrl: req.body.url,
            shortUrl: shortId,
            clicks: 1
        }) 

        res.status(200).json({
            success: "true",
            body: newShortUrl
        })

        // res.redirect('/');

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: "failed",
            error: err.message,
        })
    }
}

export const getInfo = async(req, res) => {
    try {
        const shortId = req.params.shortId;
        const urlfound = await url.findOne({ shortUrl: shortId });
        if (!urlfound)
            return res.status(404).json({ message: "url not found" });
        res.status(200).json({
            success: "true",
            fullUrl: urlfound.fullUrl,
            clicks: urlfound.clicks,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: "failed",
            error: err.message,
        });
    }
}


