const User = require("../models/user")



/*>
 * Create a new user */
async function createUser( req, res)
{
    try
    {
        const { firstName, lastName, email } = req.body;
        const user = await User.create( { firstName, lastName, email });
        res.status(201).json(user);
    }
    catch (err)
    {
        console.error("Error creating user:", err);
        res.status(500).json( { error: "Internal Server Error"});
    }
}




/*>
 * Get all users */
async function getUsers(req, res)
{
    try
    {
        const users = await User.findAll();
        res.status(200).json(users);
    }
    catch (error)
    {
        console.error("Error fetching users;", error);
        res.status(500).json( { error: "Internal Server Error"});
    }
}



/*>
 * Get a user by ID */
async function getUserById(req, res)
{
    const userId = req.params.id;
    try
    {
        const user = await User.findByPk(userId);
        if (!user)
        {
            res.status(404).json({ error: 'User not found'});
        }
        else
        {
            res.status(200).json(user);
        }
    }
    catch (error)
    {
        console.error('Error fetching user:', error);
        res.status(500).json( {error: 'Internal Server Error'});
    }
}



/*>
 * Update a user by ID */
async function updateUserById(req, res)
{
    const userId = req.params.id;
    
    try
    {
        const user = await User.findByPk(userId);
        if (!user)
        {
           res.status(404).json( { error: "User not found"});
        }
        else
        {
            const { firstName, lastName, email } = req.body;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            await user.save();
            res.status(200).json(user);
        }
    }
    catch (err)
    {
        console.error("Error updating user:", err);
        res.status(500).json( { error: "Internal Server Error"});
    }
}




// Delete a user by ID 
async function deleteUserById(req, res)
{
    const userId = req.params.id;
    try
    {
        const user = await User.findByPk(userId);
        if (!user)
        {
            res.status(404).json( { error: "User not found"});
        }
        else
        {
            await user.destroy();
            res.status(204).end(); // no content response
        }
    }
    catch (error)
    {
        console.error("Error deleting user:", error);
        res.status(500).json( {errror:"Internal Server Error"});
    }
}





module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};