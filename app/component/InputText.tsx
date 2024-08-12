import { alpha, FormControl, InputBase, Theme } from "@mui/material";
import { Label } from "./Label";

interface InputProps {
  placeholder: string;
  onChange: (value: string) => void;
  type?: string;
  name?:string
  error?:boolean
  errorMessage?:string
  value?:string

}
export const InputText: React.FC<InputProps> = ({
  placeholder,
  onChange,
  type = "text",
  name,
  value,errorMessage,error
}) => {
  return (
    <FormControl variant="standard">
      <InputBase name={name}
        type={type as "text" | "password"}
        onChange={(el) => {
          onChange(el.target.value);
        }}
        value={value}
        error={error}
        placeholder={placeholder}
        sx={styles.input}
      />
      <Label sx={styles.errorMessasge}>{
        error &&  errorMessage}</Label>
    </FormControl>
  );
};

const styles = {
  input: (theme: Theme) => ({
    "& input::placeholder": { fontSize: "13px" },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
      border: "1px solid",
      borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
      fontSize: 16,
      width: "100%",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }),
  errorMessasge:{
  color: "red",
  fontSize: "10px",
  height:"20px",
  marginLeft:'20px',
  marginTop:"5px"
  }
};
