import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, Alert, Box } from '@mui/material';

const API_BASE = "http://127.0.0.1:5000"; // Update this if your backend is remote

function App() {
    // States for add user
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [addResult, setAddResult] = useState(null);

    // States for get user
    const [queryName, setQueryName] = useState('');
    const [queryResult, setQueryResult] = useState(null);
    const [error, setError] = useState(null);

    // Add user handler
    const addUser = async () => {
        setAddResult(null);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, role })
            });
            const data = await res.json();
            setAddResult(data);
            setName('');
            setRole('');
        } catch (err) {
            setError("Failed to add user.");
        }
    };

    // Get user handler
    const getUser = async () => {
        setQueryResult(null);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/get/${queryName}`);
            if (res.status === 404) {
                setError("User not found.");
                return;
            }
            const data = await res.json();
            setQueryResult(data);
        } catch (err) {
            setError("Failed to get user.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Azure Cloud User Manager
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Beautiful full-stack app using React, Material UI, Flask, and Azure Cosmos DB
                    </Typography>

                    <Box mt={4}>
                        <Typography variant="h6">Add a New User</Typography>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField
                            label="Role"
                            fullWidth
                            margin="normal"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addUser}
                            disabled={!name || !role}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Add User
                        </Button>
                        {addResult && <Alert severity="success" sx={{ mt: 2 }}>User added! ID: {addResult.inserted_id}</Alert>}
                    </Box>

                    <Box mt={4}>
                        <Typography variant="h6">Find User by Name</Typography>
                        <TextField
                            label="Search Name"
                            fullWidth
                            margin="normal"
                            value={queryName}
                            onChange={e => setQueryName(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={getUser}
                            disabled={!queryName}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Find User
                        </Button>
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        {queryResult && (
                            <Alert severity="info" sx={{ mt: 2 }}>
                                <div><b>ID:</b> {queryResult._id}</div>
                                <div><b>Name:</b> {queryResult.name}</div>
                                <div><b>Role:</b> {queryResult.role}</div>
                            </Alert>
                        )}
                    </Box>
                </CardContent>
            </Card>
            <Typography align="center" variant="caption" display="block" sx={{ mt: 4, color: "#888" }}>
                &copy; {new Date().getFullYear()} Mariglen Xhelo · Powered by React, Flask & Azure
            </Typography>
        </Container>
    );
}

export default App;
