import { Box, Typography, Slider, Autocomplete, TextField, Button } from "@mui/material";
import { foodTypeOptions } from "../util/food-types";
import { priceTypes } from "../util/price-types";
import { useContext } from 'react';
import { DistanceContext, PriceContext, TypeContext, SubmitContext } from "../contexts/contexts";
import { priceToDollar } from "../util/helpers";

const Header = ({coords}) => {

  // Contexts
  const {price, setPrice} = useContext(PriceContext);
  const {distance, setDistance} = useContext(DistanceContext);
  const {type, setType} = useContext(TypeContext);
  const {submitted, setSubmitted} = useContext(SubmitContext);

  // Setter Functions
  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  }
  const handleChangeDistance = (event, newValue) => {
    setDistance(newValue);
  }
  const handleChangeType = (event, newValue) => {
    setType(newValue);
  }
  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <Box sx={{ width: "85%", display: "flex", alignItems: "center", gap: 5, px: 2, justifyContent: "center" }} >
        <Typography variant="h4" component="h1">FoodFinder</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="h6" sx={{ width: "100%", textAlign: "left" }}>Distance (mi): {distance}</Typography>
            <Slider defaultValue={distance} onChange={handleChangeDistance} sx={{ width: 240, maxWidth: "45vw" }} />
        </Box>
    
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="h6" sx={{ width: "100%", textAlign: "left" }}>{priceToDollar(price)}</Typography>
            <Slider defaultValue={price} step="25" aria-label="Custom marks" onChange={handleChangePrice} sx={{ width: 240, maxWidth: "45vw" }} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Autocomplete value={type} onChange={handleChangeType} options={foodTypeOptions} sx={{ width: 240, maxWidth: "45vw" }} renderInput={(params) => <TextField {...params} label="Food Type" />} />
        </Box>
        <Button variant='contained' sx={{alignItems: 'bottom'}} onClick={handleSubmit}> Submit </Button>
    </Box>
  )
};

export default Header;
