import React, { useState } from 'react';
import { Box, Tabs, Tab, Avatar, AppBar, Toolbar } from '@mui/material';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import PatientsTab from './components/Doctor/PatientsTab';
import RequestTestTab from './components/Doctor/RequestTestTab';
import PrescriptionsTab from './components/Doctor/PrescriptionsTab';
import PatientProfile from './components/Doctor/PatientProfile';

const DoctorApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock data
  const doctor = {
    name: "Dr. Smith",
    avatar: "/api/placeholder/40/40"
  };

  const todayAppointments = [
    { id: 1, time: "09:00", patientName: "John Doe", patientId: "P001" },
    { id: 2, time: "10:30", patientName: "Jane Smith", patientId: "P002" },
    { id: 3, time: "14:00", patientName: "Bob Johnson", patientId: "P003" }
  ];

  const recentActivity = [
    { id: 1, action: "Prescribed medication to John Doe", time: "2 hours ago" },
    { id: 2, action: "Requested lab test for Jane Smith", time: "4 hours ago" },
    { id: 3, action: "Updated patient record", time: "1 day ago" }
  ];

  const patients = [
    { id: "P001", name: "John Doe", faculty: "Science Faculty", age: 24 },
    { id: "P002", name: "Jane Smith", faculty: "Engineering Faculty", age: 22 },
    { id: "P003", name: "Bob Johnson", faculty: "Arts Faculty", age: 25 },
    { id: "P004", name: "Alice Brown", faculty: "Science Faculty", age: 23 }
  ];

  const labRequests = [
    { id: 1, date: "2024-01-15", testType: "Blood Test", patientName: "John Doe", status: "Pending" },
    { id: 2, date: "2024-01-14", testType: "X-Ray", patientName: "Jane Smith", status: "Completed" }
  ];

  const prescriptions = [
    { id: 1, date: "2024-01-15", time: "10:30", patientName: "John Doe", status: "Issued" },
    { id: 2, date: "2024-01-14", time: "14:00", patientName: "Jane Smith", status: "Completed" }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedPatient(null); // Reset selected patient when changing tabs
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleBackToPatients = () => {
    setSelectedPatient(null);
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'findPatient':
        setActiveTab(1); // Go to Patients tab
        break;
      case 'requestTest':
        setActiveTab(2); // Go to Request Test tab
        break;
      case 'writePrescription':
        setActiveTab(3); // Go to Prescriptions tab
        break;
      default:
        break;
    }
  };

  const handleAddLabRequest = (request) => {
    // Add new lab request logic here
    console.log('New lab request:', request);
  };

  const handleAddPrescription = (prescription) => {
    // Add new prescription logic here
    console.log('New prescription:', prescription);
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#e0e0e0', color: '#000' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Tabs value={activeTab} onChange={handleTabChange} textColor="inherit">
            <Tab label="Dashboard" />
            <Tab label="Patients" />
            <Tab label="Request Test" />
            <Tab label="Prescriptions" />
          </Tabs>
          <Avatar sx={{ bgcolor: '#666' }}>U</Avatar>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {activeTab === 0 && (
          <DoctorDashboard 
            doctor={doctor}
            todayAppointments={todayAppointments}
            recentActivity={recentActivity}
            onQuickAction={handleQuickAction}
          />
        )}
        {activeTab === 1 && (
          selectedPatient ? (
            <PatientProfile 
              patient={selectedPatient}
              onBack={handleBackToPatients}
              onRequestTest={() => setActiveTab(2)}
              onWritePrescription={() => setActiveTab(3)}
            />
          ) : (
            <PatientsTab 
              patients={patients}
              onPatientSelect={handlePatientSelect}
            />
          )
        )}
        {activeTab === 2 && (
          <RequestTestTab 
            labRequests={labRequests}
            patients={patients}
            onAddRequest={handleAddLabRequest}
          />
        )}
        {activeTab === 3 && (
          <PrescriptionsTab 
            prescriptions={prescriptions}
            patients={patients}
            onAddPrescription={handleAddPrescription}
          />
        )}
      </Box>
    </Box>
  );
};

export default DoctorApp;