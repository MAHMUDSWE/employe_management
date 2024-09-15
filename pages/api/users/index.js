import connectMongo from '../../../database/conn'
import { getUsers, postUser, putUser, deleteUser, searchUsers } from '../../../database/controller';

export default async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in the Connection" }))

    // type of request
    const { method } = req

    switch (method) {
        case 'GET':
            // Check if query parameters are provided for searching
            const { name, email, phone, date } = req.query;

            if (name || email || phone || date) {
                // If any search query is provided, call the searchUsers function
                await searchUsers(req, res);
            } else {
                // Otherwise, return all users
                await getUsers(req, res);
            }
            break;
        case 'POST':
            postUser(req, res)
            break;
        case 'PUT':
            putUser(req, res)
            break;
        case 'DELETE':
            deleteUser(req, res)
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowd`)
            break;
    }
}