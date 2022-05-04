import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";
import { setPatientList, setDiagnoseList } from "./state";
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, DiagnoseEntry } from "./types";
import './App.css';

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";
import { Typography } from "@material-ui/core";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    try {
      void axios.get<void>(`${apiBaseUrl}/ping`);

      const fetchPatientList = async () => {
        try {
          const { data: patientListFromApi } = await axios.get<Patient[]>(
            `${apiBaseUrl}/patients`
          );
          const { data: diagnoseListFromApi } = await axios.get<DiagnoseEntry[]>(
            `${apiBaseUrl}/diagnoses`
          );
          dispatch(setPatientList(patientListFromApi));
          dispatch(setDiagnoseList(diagnoseListFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientList();
    } catch (e) {
      console.log(e);
    }
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/:id" element={<PatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;