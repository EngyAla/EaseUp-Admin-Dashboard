import { Box, Typography, Pagination, Select, MenuItem } from "@mui/material";
import { useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector, gridPaginationModelSelector } from "@mui/x-data-grid";


const CustomFooter = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
    // eslint-disable-next-line react-hooks/refs
    const rowCount = apiRef.current.getRowsCount();
    const start = paginationModel.page * paginationModel.pageSize + 1;
    const end = Math.min(start + paginationModel.pageSize - 1, rowCount);
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
            color: "white",
            borderTop: "1px solid #dedede",
            bgcolor: "#F8FAFC",
            
        }}>
            <Typography variant="body2" sx={{ color: "#9ca3af", display: {xs: "none", md: "inline"} }}>
                Showing <b>{start}</b> to <b>{end}</b> of <b>{rowCount}</b> results
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ color: "#9ca3af", display: {xs: "none", md: "flex"} }}>Per page</Typography>
                <Select
                value={paginationModel.pageSize}
                onChange={(e) => apiRef.current.setPageSize(Number(e.target.value))}
                size="small"
                sx={{ 
                    px: 1,
                    color: "#9ca3af", 
                    // border: "1px solid #dedede", 
                    // ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
                >
                {[5, 10, 20].map((size) => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
                </Select>
            </Box>

            <Pagination 
                count={pageCount}
                page={page + 1}
                onChange={(event, value) => apiRef.current.setPage(value - 1)}
                variant="outlined"
                shape="rounded"
                sx={{
                "& .MuiPaginationItem-root": {
                    color: "#9ca3af",
                    "&.Mui-selected": {
                    backgroundColor: "#00796B",
                    color: "#ffffff",
                    },
                    "&.MuiPaginationItem-page":{
                        display: {xs: "none", md: "flex"}
                    }
                }
                }}
            />
        </Box>
    );
}

export default CustomFooter;