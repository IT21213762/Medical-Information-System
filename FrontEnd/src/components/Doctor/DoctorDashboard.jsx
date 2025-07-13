import React from "react";
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, List, ListItem, ListItemText, Button
} from "@mui/material";

const DoctorDashboard = ({ doctor, todayAppointments, recentActivity, onQuickAction }) => {
  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto" }}>
      <Typography variant="h4" mb={3}>Welcome, {doctor.name}</Typography>
      
      {/* Today's Appointments */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" mb={2}>Today's Appointments</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#e0e0e0' }}>
                <TableCell>Time</TableCell>
                <TableCell>Patient Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todayAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} sx={{ textAlign: 'center', py: 4 }}>
                    No appointments today
                  </TableCell>
                </TableRow>
              ) : (
                todayAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.patientName}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Recent Activity */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" mb={2}>Recent Activity</Typography>
        <Box sx={{ bgcolor: '#f5f5f5', p: 2, minHeight: 100 }}>
          {recentActivity.length === 0 ? (
            <Typography color="text.secondary">No recent activity</Typography>
          ) : (
            <List>
              {recentActivity.map((activity) => (
                <ListItem key={activity.id} sx={{ py: 1 }}>
                  <ListItemText 
                    primary={activity.action}
                    secondary={activity.time}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Paper>

      {/* Quick Actions */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>Quick Actions</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button 
            variant="outlined" 
            onClick={() => onQuickAction('findPatient')}
            sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
          >
            Find Patient
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => onQuickAction('requestTest')}
            sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
          >
            Request Lab Test
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => onQuickAction('writePrescription')}
            sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
          >
            Write Prescription
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DoctorDashboard;