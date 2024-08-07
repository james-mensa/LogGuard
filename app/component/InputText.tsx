import { alpha, FormControl, InputBase, Theme } from "@mui/material"

interface InputProps{
    placeholder:string
    onChange:(_value?:string)=>void
    type?:string

}
export const InputText:React.FC<InputProps>=({placeholder,onChange,type='text'})=>{
    return(
        <FormControl variant="standard">
        <InputBase type={type as 'text' | 'password'} onChange={(el)=>{onChange(el.target.value)} } placeholder={placeholder} sx={styles.input}/>
      </FormControl>
    )
}


const styles={
    input:(theme:Theme)=>({


        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
            border: '1px solid',
            borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
            fontSize: 16,
            width: '100%',
            padding: '10px 12px',
            transition: theme.transitions.create([
              'border-color',
              'background-color',
              'box-shadow',
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              'Arial',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
              boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
              borderColor: theme.palette.primary.main,
            },
        }
    })

}