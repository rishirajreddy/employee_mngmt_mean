 const express = require('express');
 const Employee = require('../model/employee');
 const router = express.Router();

 const ObjectID = require('mongoose').Types.ObjectId;

 //get api
 router.get('/', async(req,res) => {
    Employee.find((err, doc) => {
        if(err) {
            console.log("Error:" + err);
        }else {
            console.log("Success");
            res.json(doc);
        }
    })
})

//POst api
router.post('/post',async(req,res) => {
    let employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept
    })

    await employee.save()
    .then(() => {
        console.log("Employee added succesfully!!");
        res.json(employee)
    })
    .catch(err => console.error(err));
 })

//get by id
router.get('/get/:id', async(req, res) => {
    const id = req.params.id;
    // Employee.findById(id, (err, doc) => {
    //     if(err){
    //         res.status(404).send('No record found with id: '+ id);
    //         console.log("No record found");
    //     }else {
    //         console.log(doc);
    //         res.json(doc);
    //     }
    // })
    try {
        const emp = await Employee.findById(req.params.id);
        if(!emp){
            // console.log("No record found!!");
            return res.status(404).send("NO record found")
        }else {
            // res.status(200).send();
            console.log("Success");
            return res.status(200).json({'msg': 'Success', emp})
        }
    }
    catch(err){
        console.log("Error");
        return res.status(500).json({'msg':'No record found'});
    }
})

//delete api
router.delete('/get/:id', async(req,res)=> {
    const id = req.params.id;
    // const idFound = Employee.findById(id);
    Employee.findByIdAndRemove(id, (err, doc) => {
        if(err){
            res.status(500).send('User not deleted with id:' + id);
            console.log("No record found");
        }else {
            console.log("SUccess");
            // res.send(idFound)
            // console.log(idFound);
            res.json(doc)
        }
        
    })
})

//update api
router.put('/update/:id', async(req, res) => {
    const id = req.params.id;
    let emp = {
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept
    }

    Employee.findByIdAndUpdate(id,
        {$set: emp},
        {new: true},
        (err, doc) => {
            if(err){
                res.status(500).send('No record found');
                console.log("No record found");
            }else {
                console.log("SUccess");
                res.json(doc)
            }
    })
})

 module.exports = router;