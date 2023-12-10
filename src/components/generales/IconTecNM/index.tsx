import { SxProps, styled } from "@mui/material";

import icon from "../../../public/assets/img/icon-tecnm.png";
import { FC } from "react";

interface IconTecNMProps {
  sx?: SxProps;
}

const Icon = styled("img")();

const IconTecNM: FC<IconTecNMProps> = ({ sx }) => {
  return <Icon src={icon} sx={sx} />;
};

export default IconTecNM;
