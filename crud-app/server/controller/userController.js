import User from "../model/userModel.js";

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);

        if (!userData) {
            return res.status(400).json({ msg: "User data not found" });
        }

        await userData.save();
        res.status(201).json({ msg: "User created successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAll = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData || userData.length === 0) {
            return res.status(404).json({ msg: "No users found" });
        }
        res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(userExist);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not found" });
        }
        
        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "User updated successfully", updatedData });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User does not exist" });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "User deleted successfully" });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}