const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const Vault = require('../models/vault');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ userId: user._id, username: user.username, email: user.email  }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ success: true, token, username: user.username, email: user.email });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/profile', verifyToken, async (req, res) => {
    try{
        const user = await User.findById(req.user.userId).select('-password');
        res.status(200).json({ success: true, user});
    }catch(e){
        res.status(500).json({ success: false, message: e.message});
    }
});

router.post('/vault', verifyToken, async (req, res) => {
    const { website, email, password } = req.body;
    try {
        const newVaultEntry = new Vault({ userID: req.user.userId, website, email, password });
        await newVaultEntry.save();
        res.status(201).json({ success: true, message: 'Account added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/vault', verifyToken, async (req, res) => {
    try {
        const vaultEntries = await Vault.find({ userId: req.userId });
        res.status(200).json({ success: true, vaultEntries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/vault/:id', verifyToken, async (req, res) => {
    try {
        await Vault.deleteOne({ _id: req.params.id, userID: req.user.userId });
        res.status(200).json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
module.exports = router;