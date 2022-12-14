import {
      Button,
      Card,
      CardActions,
      CardContent,
      CardMedia,
      Typography,
} from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

interface Props {
      heading: string;
      description: string;
      image: string;
      imageAlt: string;
      handleClick: () => void;
}

function ModeSelectionCard({
      heading,
      description,
      image,
      imageAlt,
      handleClick,
}: Props) {
      return (
            <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  onClick={handleClick}
            >
                  <Card
                        sx={{
                              maxWidth: 345,
                              borderRadius: 3,
                              "&:hover": { cursor: "pointer" },
                        }}
                  >
                        <CardMedia component="img" height="240" image={image} alt={imageAlt} />
                        <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                    {heading}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                    {description}
                              </Typography>
                        </CardContent>
                  </Card>
            </motion.div>
      );
}

export default ModeSelectionCard;
