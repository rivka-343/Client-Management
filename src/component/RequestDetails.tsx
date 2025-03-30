import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import RequestStore from "./RequestStore";
import DocumentViewer from "./DocumentViewer";

const RequestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [request, setRequest] = useState<any>(null);
  const [ setDocument] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequest, setEditedRequest] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const req = await RequestStore.fetchRequestById(Number(id));
      setRequest(req);
      setEditedRequest({ ...req });
      const doc = await RequestStore.fetchDocumentsByRequestId(Number(id));
      setDocument(doc);
    }
    fetchData();
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
console.log(event
);
    
    setTabValue(newValue);
};


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const dataToUpdate = {
      averageMonthlyIncome: editedRequest.averageMonthlyIncome,
      status: editedRequest.status,
      calculatedArnona: editedRequest.calculatedArnona,
      approvedArnona: editedRequest.approvedArnona,
    };

    console.log("Data to update:", dataToUpdate);

    await RequestStore.updateRequest(dataToUpdate,Number(id));
    setRequest({ ...request, ...dataToUpdate }); // עדכון הנתונים בתצוגה
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedRequest({ ...editedRequest, [name]: value });
  };

  if (!request) return <Typography dir="rtl">טוען פרטי בקשה...</Typography>;

  return (
    <Box sx={{ p: 3 }} dir="rtl">
      <Typography variant="h4" gutterBottom>
        בקשה מספר {request.id}
      </Typography>
      <Tabs value={tabValue} onChange={handleChange} aria-label="Request Tabs">
        <Tab label="פרטים כלליים" />
        <Tab label="טפסים" />
        <Tab label="פרטי חישוב ההנחה" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <strong>מספר משתמש</strong>
                  </TableCell>
                  <TableCell align="right">{request.userId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <strong>שם פרטי</strong>
                  </TableCell>
                  <TableCell align="right">{request.fName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <strong>שם משפחה</strong>
                  </TableCell>
                  <TableCell align="right">{request.lfName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <strong>כתובת מייל</strong>
                  </TableCell>
                  <TableCell align="right">{request.gmail}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <strong>מספר בית</strong>
                  </TableCell>
                  <TableCell align="right">{request.homeNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <strong>רחוב</strong>
                  </TableCell>
                  <TableCell align="right">{request.street}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <strong>עיר </strong>
                  </TableCell>
                  <TableCell align="right">{request.city}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <strong>מספר נכס</strong>
                  </TableCell>
                  <TableCell align="right">{request.propertyNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <strong>תאריך הגשת הבקשה</strong>
                  </TableCell>
                  <TableCell align="right">
                    {new Date(request.requestDate).toLocaleDateString("he-IL")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tabValue === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">טפסים שהוגשו</Typography>
            <DocumentViewer id={request.id} />
          </Box>
        )}

        {tabValue === 2 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">סעיפים מחושבים</Typography>
            <TableRow>
              <TableCell align="right">
                <strong>סטטוס</strong>
              </TableCell>
              <TableCell align="right">
                {isEditing ? (
                  <TextField
                    name="status"
                    value={editedRequest.status}
                    onChange={handleInputChange}
                  />
                ) : (
                  request.status
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <strong>הכנסה חודשית ממוצעת</strong>
              </TableCell>
              <TableCell align="right">
                {isEditing ? (
                  <TextField
                    name="averageMonthlyIncome"
                    value={editedRequest.averageMonthlyIncome}
                    onChange={handleInputChange}
                  />
                ) : (
                  `${request.averageMonthlyIncome} ₪`
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <strong>ארנונה מחושבת</strong>
              </TableCell>
              <TableCell align="right">
                {isEditing ? (
                  <TextField
                    name="calculatedArnona"
                    value={editedRequest.calculatedArnona}
                    onChange={handleInputChange}
                  />
                ) : (
                  `${request.calculatedArnona} ₪`
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <strong>הנחה בארנונה</strong>
              </TableCell>
              <TableCell align="right">
                {isEditing ? (
                  <TextField
                    name="approvedArnona"
                    value={editedRequest.approvedArnona}
                    onChange={handleInputChange}
                  />
                ) : (
                  `${request.approvedArnona} %`
                )}
              </TableCell>
            </TableRow>

            {isEditing ? (
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  שמור
                </Button>
                <Button variant="outlined" onClick={() => setIsEditing(false)}>
                  ביטול
                </Button>
              </Box>
            ) : (
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={handleEdit}>
                  ערוך
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RequestDetails;