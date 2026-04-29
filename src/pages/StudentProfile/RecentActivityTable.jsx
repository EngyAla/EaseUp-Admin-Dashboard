// @ts-nocheck
import { Box, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(Type, Result) {
    return { Type, Result };
}




const RecentActivityTable = ({ studentData }) => {
    const rows = [
        createData('Total Exercise Score', studentData.total_Exercise_Score),
        createData('Goals Count', studentData.goalsCount),
        createData('Goals Achieved', studentData.goalsAchieved),
        createData('Goals Achieveds', studentData.goalsAchieveds.length == 0 ? "None yet" : studentData.goalsAchieveds.join(" - ")),
    ];
    return (
        <Box>
            <Typography variant='body2' sx={{ color: "#00796B", fontSize: "18px", fontWeight: 600, mt: 5, mb: 1 }}>Recent Activity</Typography>
            <Box sx={{ overflow: 'hidden', }}>
                <TableContainer sx={{ maxHeight: 300, boxShadow: "1px 1px 5px rgba(189, 189, 189, 0.3)", border: "1px solid #e4e4e4", borderRadius: 1 }}>
                    <Table sx={{ }} stickyHeader  aria-label="sticky table">
                        <TableHead sx={{ bgcolor: "#eef1f4"}}>
                            <TableRow>
                                <TableCell sx={{ color: "#3d4858", bgcolor: "#eef1f4" }}>Type</TableCell>
                                <TableCell sx={{ color: "#3d4858", bgcolor: "#eef1f4" }}>Result/Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                            >
                            <TableCell sx={{ color: "#475569" }} component="th" scope="row">
                                {row.Type}
                            </TableCell>
                            <TableCell sx={{ color: "#00796B", }}>{row.Result}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default RecentActivityTable;