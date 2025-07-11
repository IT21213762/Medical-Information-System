import React, { useState } from "react";
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Button, MenuItem
} from "@mui/material";

const RequestTestTab = ({ labRequests, patients, onAddRequest }) => {
  const [patientName, setPatientName] = useState("");
  const [testType, setTestType] = useState("");
  const [notes, setNotes] = useState("");

  const testTypes = [
    "Blood Test",
    "Urine Test", 
    "X-Ray",
    "CT Scan",
    "MRI",
    "ECG",
    "Ultrasound"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      patientName,
      testType,
      notes,
      date: new Date().toISOString().split('T')[0],
      status: "Pending"
    };
    onAddRequest(newRequest);
    
    // Reset form
    setPatientName("");
    setTestType("");
    setNotes("");
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto" }}>
      <Typography variant="h4" mb={3}>Request Lab Test</Typography>
      
      {/* Pending Requests */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" mb={2}>Pending Requests</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#e0e0e0' }}>
                <TableCell>Date</TableCell>
                <TableCell>Test Type</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {labRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: 'center', py: 4 }}>
                    No pending requests
                  </TableCell>
                </TableRow>
              ) : (
                labRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.testType}</TableCell>
                    <TableCell>{request.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* New Request Form */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>New Request</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="body2" mb={1}>Patient Name</Typography>
          <TextField
            fullWidth
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            sx={{ mb: 2, bgcolor: '#f5f5f5' }}
          />
          
          <Typography variant="body2" mb={1}>Test Type</Typography>
          <TextField
            select
            fullWidth
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            required
            sx={{ mb: 2, bgcolor: '#f5f5f5' }}
          >
            {testTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          
          <Typography variant="body2" mb={1}>Notes</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mb: 2, bgcolor: '#f5f5f5' }}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              bgcolor: '#e0e0e0', 
              color: '#000',
              '&:hover': { bgcolor: '#d0d0d0' }
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RequestTestTab;