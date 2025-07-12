import { Medicine } from "../models/MedicinData.js";
import { HostMedicine } from '../models/HostMedicinData.js';

export const createMedicine = async (req, res) => {
    const {
        title,
        desc,
        username,
        userId,
        categories,
        img,
        disease_name,
        established,
        places,
        wpmh,
        vitamin,
        ingredients,
        steps,
        ratings,
        video_link
    } = req.body;

    try {
        const storeData = await Medicine.create({
            title,
            desc,
            username,
            userId,
            categories,
            img,
            disease_name,
            established,
            places,
            wpmh,
            vitamin,
            ingredients,
            steps,
            ratings,
            video_link
        });

        res.status(200).send({ msg: "Data saved", count: storeData.length, data: storeData });
    } catch (error) {
        console.error("Error saving data:", error.message);
        res.status(500).json({ message: "An error occurred" });
    }
};


export const getAllData = async (res, req) => {
    try {
        const allData = await Medicine.find();
        res.status(200).send({ count: allData.length, msg: "Data retrieved", data: allData });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            msg: 'Error while retrieving data',
            error: err.message
        });
    }
}

export const updateByAdmin1 = async (req, res) => {
    const { validate1 } = req.body;
    try {
        const update = await Medicine.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send({ msg: "data updated by admin1", data: update });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateByAdmin2 = async (req, res) => {
    const { validate2 } = req.body;
    try {
        const update = await Medicine.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send({ msg: "data updated by admin2", data: update });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateByAdmin3 = async (req, res) => {
    const { validate3 } = req.body;
    try {
        const update = await Medicine.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send({ msg: "data updated by admin3", data: update });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateByAdmin4 = async (req, res) => {
    const { validate4 } = req.body;
    try {
        const update = await Medicine.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send({ msg: "data updated by admin4", data: update });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateByAdmin5 = async (req, res) => {
    const { validate5 } = req.body;
    try {
        const update = await Medicine.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send({ msg: "data updated by admin5", data: update });
    } catch (err) {
        res.status(500).json(err);
    }
}


export const ifValidationTrue = async (req, res) => {
    try {
        const medicineData = await Medicine.findById(req.params.id);

        if (medicineData.validator1 && medicineData.validator2 && medicineData.validator3 && medicineData.validator4 && medicineData.validator5) {
            const hostData = new HostMedicine(medicineData.toObject());
            await hostData.save();
            res.status(200).send({ msg: "data Hosted", data: hostData });
        } else {
            res.status(400).send({ msg: "All validation Is Required" });
        }

    } catch (err) {
        res.status(500).json(err);
    }
};