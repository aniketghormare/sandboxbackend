const express = require('express');
const router = express.Router();
const Sandbox = require('../models/sandbox');
require("dotenv").config()
const { VM } = require('vm2'); 
const { auth } = require('../middleware/auth.middleware');

router.post('/run',auth, async (req, res) => {
    try {
        const { code } = req.body;
        console.log("code", code);

        
        const vm = new VM({
            sandbox: {
                output: '', 
                console: {
                    log: (message) => {
                       
                        vm.sandbox.output += message + '\n';
                    }
                }
            }
        });

       
        vm.run(code);

       
        console.log("ans", vm.sandbox.output);
        res.json({ output: vm.sandbox.output });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/save',auth, async (req, res) => {
    
    try {
        const { code, output, language,userId } = req.body;
        const sandbox = new Sandbox({ code, output, language,userId });
        await sandbox.save();
        res.status(201).json({ message: 'Sandbox saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/list',auth, async (req, res) => {
    let {userId}=req.body
    try {
        const sandboxes = await Sandbox.find({userId:userId});
        res.json(sandboxes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
