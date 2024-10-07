const express = require('express');
const xlsx = require('xlsx');
const path = require('path');
const cors = require('cors'); // Import CORS
const app = express();

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Define file path for the Excel file
const filePath = path.join(__dirname, '../data/Test.xlsx');

// Define the loginUser function
const loginUser = async (req, res) => {
    console.log('Login attempt received:', req.body);
    const { username, password } = req.body;

    try {
        // Load the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON format
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Check if the username and password exist in the data
        const user = data.find((row) => row.username === username && row.password === password);

        if (user) {
            return res.json({ success: true, user });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error in loginUser:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Register route
app.post('/api/users/register', async (req, res) => {
    console.log(req.body); // Log the request body

    const { name, username, password, phone, email } = req.body;

    // Basic validation
    if (!name || !username || !password || !phone || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Load the Excel file and add new user data
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON format
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Check if the username or email already exists
        const userExists = data.find((row) => row.username === username || row.email === email);
        if (userExists) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }

        // Add new user to the data
        const newUser = { name, username, password, phone, email };
        data.push(newUser);

        // Write updated data back to Excel
        const newWorksheet = xlsx.utils.json_to_sheet(data);
        workbook.Sheets[sheetName] = newWorksheet;
        xlsx.writeFile(workbook, filePath);

        // Respond with success message
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Define the login route
app.post('/api/users/login', loginUser);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
