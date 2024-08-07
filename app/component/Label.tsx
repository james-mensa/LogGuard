import PretendardFont from "../styles/fonts"
import { Typography, TypographyProps } from "@mui/material"

export const Label:React.FC<TypographyProps>=({...props})=>{
    return(
        <Typography
    {...props}
        className={PretendardFont.className}
          
        >
      {props.children}
        </Typography>
    )
}