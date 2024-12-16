import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import CURDDrugType from "../../../data/DrugType";
import { useTheme } from "@mui/material/styles";

const DrugTypeTable = () => {
const {getDrugType} = CURDDrugType();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  console.log("theme",theme);
  // Fetch data from API
  useEffect(() => {  
    const fetchData = async () => {
      try {
        const response = await getDrugType(); // Update with your API endpoint
        if (response.data.status) {
          setData(response.data.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} >
      <Typography variant="h4" gutterBottom>
        Drug Type List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Code</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Is Suspended</strong></TableCell>
              <TableCell><strong>Created Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.drugTypeId}>
                <TableCell>{item.drugTypeId}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.isSuspended ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(item.createdDate).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>  
  );
};

export default DrugTypeTable;
