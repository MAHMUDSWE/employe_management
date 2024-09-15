/** Controller */
import Users from '../model/user';

// GET : http://localhost:3000/api/users
export async function getUsers(req, res) {
    try {
        const users = await Users.find({});
        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error while fetching data" });
    }
}

// GET : http://localhost:3000/api/users/[userId]
export async function getUser(req, res) {
    try {
        const { userId } = req.query;

        if (userId) {
            const user = await Users.findById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json(user);
        }
        res.status(400).json({ error: "User ID not provided" });
    } catch (error) {
        res.status(500).json({ error: "Error while fetching the user" });
    }
}

// POST : http://localhost:3000/api/users
// export async function postUser(req, res) {
//     try {
//         const formData = req.body;
//         if (!formData) {
//             return res.status(400).json({ error: "Form data not provided" });
//         }
//         const user = await Users.create(formData);
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(500).json({ error: "Error while creating the user" });
//     }
// }

export async function postUser(req, res) {
    try {
        const { name, email, phone, date } = req.body;

        // Validate form data
        if (!name || !email || !phone || !date) {
            return res.status(400).json({ error: "Missing form data" });
        }

        // Create a base user object
        const userData = { name, email, phone, date };

        // Handle avatar upload if present
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'avatars',
                });
                userData.avatar = result.secure_url; // Assign avatar URL to user data
            } catch (uploadError) {
                return res.status(500).json({ error: "Avatar upload failed" });
            }
        }

        // Create the user in the database
        const user = await Users.create(userData);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error while creating user:', error);
        res.status(500).json({ error: error.message || "Error while creating the user" });
    }
}


// PUT : http://localhost:3000/api/users/[userId]
export async function putUser(req, res) {
    try {
        const { userId } = req.query;
        const formData = req.body;

        if (userId && formData) {
            const user = await Users.findByIdAndUpdate(userId, formData, { new: true });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json(user);
        }
        res.status(400).json({ error: "User ID or form data not provided" });
    } catch (error) {
        res.status(500).json({ error: "Error while updating the user" });
    }
}

// DELETE : http://localhost:3000/api/users/[userId]
export async function deleteUser(req, res) {
    try {
        const { userId } = req.query;

        if (userId) {
            const user = await Users.findByIdAndDelete(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json({ message: "User deleted successfully", user });
        }
        res.status(400).json({ error: "User ID not provided" });
    } catch (error) {
        res.status(500).json({ error: "Error while deleting the user" });
    }
}
export async function searchUsers(req, res) {
    try {
        const { name, email, phone, date } = req.query;

        // Build a dynamic query object based on provided parameters
        const searchCriteria = {};

        if (name) {
            searchCriteria.name = { $regex: name, $options: 'i' }; // Case-insensitive match
        }
        if (email) {
            searchCriteria.email = { $regex: email, $options: 'i' };
        }
        if (phone) {
            searchCriteria.phone = { $regex: phone, $options: 'i' };
        }
        if (date) {
            searchCriteria.date = { $regex: date, $options: 'i' }; // Assumes date stored as string
        }

        // Check if there are any search criteria provided
        if (Object.keys(searchCriteria).length === 0) {
            return res.status(400).json({ error: "No search parameters provided" });
        }

        // Find users matching the search criteria
        const users = await Users.find(searchCriteria);

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error while searching users" });
    }
}
