import React from "react";
import {
  Box, Typography, Paper, Button, Grid
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PatientProfile = ({ patient, onBack, onRequestTest, onWritePrescription }) => {
  // Mock patient detailed data
  const patientDetails = {
    ...patient,
    conditions: ["Hypertension", "Diabetes Type 2"],
    allergies: ["Penicillin", "Shellfish"],
    diagnoses: ["Common Cold", "Migraine"],
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      weight: "70 kg"
    },
    weightHistory: [
      { date: "2024-01-01", weight: 68 },
      { date: "2024-01-15", weight: 70 },
      { date: "2024-02-01", weight: 71 }
    ]
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={onBack}
          sx={{ mr: 2 }}
        >
          Back to Patients
        </Button>
        <Typography variant="h4">Patient Profile</Typography>
      </Box>
      
      {/* Patient Basic Info */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="body1" mb={1}>
          <strong>Name:</strong> {patientDetails.name}
        </Typography>
        <Typography variant="body1" mb={1}>
          <strong>Age:</strong> {patientDetails.age} Years
        </Typography>
        <Typography variant="body1" mb={1}>
          <strong>Faculty:</strong> {patientDetails.faculty}
        </Typography>
      </Paper>

      {/* Medical Information Grid */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {/* Conditions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: '#e0e0e0', height: 150 }}>
            <Typography variant="h6" mb={1}>Conditions</Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1, height: 100 }}>
              {patientDetails.conditions.map((condition, index) => (
                <Typography key={index} variant="body2">
                  • {condition}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Allergies */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: '#e0e0e0', height: 150 }}>
            <Typography variant="h6" mb={1}>Allergies</Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1, height: 100 }}>
              {patientDetails.allergies.map((allergy, index) => (
                <Typography key={index} variant="body2">
                  • {allergy}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Weight Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, bgcolor: '#e0e0e0', height: 150 }}>
            <Typography variant="h6" mb={1}>Weight Chart</Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1, height: 100 }}>
              {patientDetails.weightHistory.map((record, index) => (
                <Typography key={index} variant="body2">
                  {record.date}: {record.weight}kg
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Diagnoses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, bgcolor: '#e0e0e0', height: 150 }}>
            <Typography variant="h6" mb={1}>Diagnoses</Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1, height: 100 }}>
              {patientDetails.diagnoses.map((diagnosis, index) => (
                <Typography key={index} variant="body2">
                  • {diagnosis}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Vitals */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, bgcolor: '#e0e0e0', height: 150 }}>
            <Typography variant="h6" mb={1}>Vitals</Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1, height: 100 }}>
              <Typography variant="body2">BP: {patientDetails.vitals.bloodPressure}</Typography>
              <Typography variant="body2">HR: {patientDetails.vitals.heartRate}</Typography>
              <Typography variant="body2">Temp: {patientDetails.vitals.temperature}</Typography>
              <Typography variant="body2">Weight: {patientDetails.vitals.weight}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            onClick={onRequestTest}
            sx={{ textTransform: 'none' }}
          >
            Request Lab Test
          </Button>
          <Button 
            variant="outlined" 
            onClick={onWritePrescription}
            sx={{ textTransform: 'none' }}
          >
            Write Prescription
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PatientProfile;