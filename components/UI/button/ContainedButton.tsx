import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

interface Props {
  label: string;
  width?: string;
  height?: string;
  variant: 'outlined' | 'text' | 'contained'
}

function ContainedButton(props: Props) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: "5px 5px 0 rgba(0, 0, 0, 1)",
        borderRadius: '20px'
      }}
      style={{ borderRadius: '20px', }}
    >
      <Button variant={props.variant} sx={{ borderRadius: '20px', border: 2, ...props, boxShadow: 'none' }}>
        {props.label}
      </Button>
    </motion.div>
  );
}

export default ContainedButton;
