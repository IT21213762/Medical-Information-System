import React, { useState } from "react";
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Button,
  Grid, MenuItem, IconButton
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const PrescriptionsTab = ({ prescriptions, onCreatePrescription }) => {
  const [patientName, setPatientName] = useState("");
  const [medicines, setMedicines] = useState([
    { medicine: "", dosage: "", qty: "" }
  ]);
  const [notes, setNotes] = useState("");

  const handleAddMedicine = () => {
    setMedicines([...medicines, { medicine: "", dosage: "", qty: "" }]);
  };

  const handleRemoveMedicine = (index) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = medicines.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setMedicines(updatedMedicines);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prescriptionData = {
      patientName,
      medicines,
      notes,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      status: "Pending..."
    };
    onCreatePrescription(prescriptionData);
    
    // Reset form
    setPatientName("");
    setMedicines([{ medicine: "", dosage: "", qty: "" }]);
    setNotes("");
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "40px auto", p: 3 }}>
      <Typography variant="h4" mb={3}>Prescriptions</Typography>
      
      {/* Recent Prescriptions Section */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" mb={2}>Recent Prescriptions</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No recent prescriptions
                  </TableCell>
                </TableRow>
              ) : (
                prescriptions.map((prescription, index) => (
                  <TableRow key={prescription.id || index}>
                    <TableCell>{prescription.date}</TableCell>
                    <TableCell>{prescription.time}</TableCell>
                    <TableCell>{prescription.patientName}</TableCell>
                    <TableCell>{prescription.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* New Prescription Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>New Prescription</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Patient Name"
                fullWidth
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" mb={1}>Medicine Details</Typography>
              {medicines.map((med, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Medicine"
                        fullWidth
                        value={med.medicine}
                        onChange={(e) => handleMedicineChange(index, 'medicine', e.target.value)}
                        required
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Dosage"
                        fullWidth
                        value={med.dosage}
                        onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                        required
                        size="small"
                        placeholder="e.g., 500mg"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Quantity"
                        fullWidth
                        value={med.qty}
                        onChange={(e) => handleMedicineChange(index, 'qty', e.target.value)}
                        required
                        size="small"
                        placeholder="e.g., 30 tablets"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {index === medicines.length - 1 && (
                          <IconButton 
                            onClick={handleAddMedicine}
                            color="primary"
                            size="small"
                          >
                            <AddIcon />
                          </IconButton>
                        )}
                        {medicines.length > 1 && (
                          <IconButton 
                            onClick={() => handleRemoveMedicine(index)}
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional instructions or notes..."
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ mt: 2 }}
              >
                Submit Prescription
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default PrescriptionsTab;