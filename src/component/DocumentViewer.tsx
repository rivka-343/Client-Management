import  { useEffect, useState } from "react";
//React
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, Typography } from "@mui/material";
import RequestStore from "./RequestStore";

const DocumentViewer = ({ id }: { id: number }) => {
    const [documents, setDocuments] = useState<string[] | null>(null);
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
    const [selectedDocName, setSelectedDocName] = useState<string | null>(null);

    const fileNames = {
        IDWithSpousePage: "צילום ת\"ז כולל ספח",
        BankStatement: "דוח בנק",
        PayslipSpouse1: "תלושי משכורת של בן/בת זוג 1",
        PayslipSpouse2: "תלושי משכורת של בן/בת זוג 2",
    };

    useEffect(() => {
        async function fetchData() {
            const data = await RequestStore.fetchDocumentsByRequestId(Number(id));
            if (data && data.files) {
                setDocuments(data.files);
                setSelectedDoc(data.files[0]);
                setSelectedDocName(Object.values(fileNames)[0]);
            }
        }
        fetchData();
    }, [id]);

    const handleDocClick = (doc: string, index: number) => {
        setSelectedDoc(doc);
        setSelectedDocName(Object.values(fileNames)[index]);
    };

    return (
        <Box sx={{ display: "flex", height: "80vh", mt: 2 }}>
            {/* SIDEBAR */}
            <Box sx={{ width: "250px", bgcolor: "background.paper", borderRight: "1px solid #ddd"}}>
                <Typography variant="h6" sx={{ p: 2, textAlign: "center" }}>
                    טפסים מצורפים
                </Typography>
                <Divider />
                <List >
                    {documents && documents.map((doc, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => handleDocClick(doc, index)}>
                                <ListItemText  primary={Object.values(fileNames)[index]} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* תצוגת המסמך */}
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    {selectedDocName || "בחר קובץ"}
                </Typography>
                {selectedDoc ? (
                    <iframe
                        src={selectedDoc}
                        style={{ width: "100%", height: "100%", border: "none" }}
                        title={selectedDocName || "Document"}
                    />
                ) : (
                    <Typography color="text.secondary">קובץ לא נמצא</Typography>
                )}
            </Box>
        </Box>
    );
};

export default DocumentViewer;