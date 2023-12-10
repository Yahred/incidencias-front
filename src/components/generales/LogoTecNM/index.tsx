import { SxProps, styled } from "@mui/material"
import { FC } from "react"

import logo from '../../../public/assets/img/icon-small.png';

const Logo = styled('img')();

interface LogoTecNMProps {
  sx?: SxProps
}

const LogoTecNM: FC<LogoTecNMProps> = ({ sx }) => {
  return <Logo
    src={logo}
    sx={sx}
  />
}

export default LogoTecNM
