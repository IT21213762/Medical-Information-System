import React, { useState } from "react";
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Button, Grid
} from "@mui/material";

const PatientsTab = ({ patients, onPatientSelect }) => {
  const [searchName, setSearchName] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patients);

  const handleSearch = () => {
    const filtered = patients.filter(patient => {
      const matchesName = searchName === "" || 
        patient.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesAge = ageFilter === "" || 
        patient.age.toString().includes(ageFilter);
      const matchesFaculty = facultyFilter === "" || 
        patient.faculty.toLowerCase().includes(facultyFilter.toLowerCase());
      
      return matchesName && matchesAge && matchesFaculty;
    });
    setFilteredPatients(filtered);
  };

  const handlePatientClick = (patient) => {
    onPatientSelect(patient);
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto" }}>
      <Typography variant="h4" mb={3}>Patients</Typography>
      
      {/* Search Section */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search Patient name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        
        {/* Search Filters */}
        <Box sx={{ bgcolor: '#e0e0e0', p: 2, borderRadius: 1 }}>
          <Typography variant="subtitle2" mb={1}>Search Filters</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" mb={1}>Age</Typography>
              <TextField
                size="small"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" mb={1}>Faculty</Typography>
              <TextField
                size="small"
                value={facultyFilter}
                onChange={(e) => setFacultyFilter(e.target.value)}
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Patients Table */}
      <Paper sx={{ p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#e0e0e0' }}>
                <TableCell>Name</TableCell>
                <TableCell>Faculty</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: 'center', py: 4 }}>
                    No patients found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow 
                    key={patient.id} 
                    hover 
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handlePatientClick(patient)}
                  >
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.faculty}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PatientsTab;