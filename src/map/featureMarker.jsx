import { Box, Popper } from "@mui/material";
import { useState } from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
export default function FeatureMarker({ text }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <PinDropIcon sx={{ color: "green" }} onClick={handleClick} />
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          sx={{
            border: "2px solid green",
            borderRadius: "16px",
            p: 1,
            bgcolor: "background.paper",
          }}>
          <div>{`city:${text.properties.name}`}</div>
          <div>{`population:${text.population}`}</div>
        </Box>
      </Popper>
    </div>
  );
}
