import { Box, Typography, Slider, Autocomplete, TextField } from "@mui/material";
import { foodTypeOptions } from "../util/food-types";
import { useContext, useState } from "react";
import { DistanceContext, PriceProvider, TypeContext } from "../contexts/contexts";

const Header = () => {

  const [price, setPrice] = useContext(PriceProvider);
  const [distance, setDistance] = useContext(DistanceContext);
  const [type, setType] = useContext(TypeContext);

  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  }

  const handleChangeDistance = (event, newValue) => {
    setDistance(newValue);
  }

  const handleChangeType = (event, newValue) => {
    setType(newValue);
  }

  return (
    <Box sx={{ width: "80%", display: "flex", alignItems: "center", gap: 5, px: 2, justifyContent: "center" }} >
        <Typography variant="h4" component="h1">FoodFinder</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="h6" sx={{ width: "100%", textAlign: "left" }}>Distance (mi): {distance}</Typography>
            <Slider defaultValue={distance} onChange={handleChangeDistance} sx={{ width: 240, maxWidth: "45vw" }} />
        </Box>
    
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="h6" sx={{ width: "100%", textAlign: "left" }}>Price ($): {price} </Typography>
            <Slider defaultValue={price} onChange={handleChangePrice} sx={{ width: 240, maxWidth: "45vw" }} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Autocomplete value={type} onChange={handleChangeType} options={foodTypeOptions} sx={{ width: 240, maxWidth: "45vw" }} renderInput={(params) => <TextField {...params} label="Food Type" />} />
        </Box>
    </Box>
  )
};

export default Header;
