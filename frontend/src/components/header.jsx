import { Box, Typography, Slider, Autocomplete, TextField } from "@mui/material";
import { foodTypeOptions } from "../util/food-types";

const Header = () => {
  return (
    <Box sx={{ width: "80%", display: "flex", alignItems: "center", gap: 5, px: 2, justifyContent: "center" }} >
        <Typography variant="h4" component="h1">Header</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="h6" sx={{ width: "100%", textAlign: "left" }}>Distance</Typography>
            <Slider defaultValue={20} sx={{ width: 240, maxWidth: "45vw" }} />
        </Box>
    
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="h6" sx={{ width: "100%", textAlign: "left" }}>Price</Typography>
            <Slider defaultValue={20} sx={{ width: 240, maxWidth: "45vw" }} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Autocomplete options={foodTypeOptions} sx={{ width: 240, maxWidth: "45vw" }} renderInput={(params) => <TextField {...params} label="Food Type" />} />
        </Box>
    </Box>
  )
};

export default Header;
