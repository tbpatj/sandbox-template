import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  TextField,
  TextFieldProps,
  Typography,
  inputLabelClasses,
} from "@mui/material";
import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

const PasswordVisibility: (
  props: TextFieldProps & {
    helperText?: string;
    register?: UseFormRegister<FieldValues>;
  }
) => JSX.Element = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const otherProps = () => {
    const newP = { ...props };
    delete newP.register;
    return newP;
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <TextField
        label="Password"
        {...otherProps()}
        {...props?.register?.("password", {
          required: true,
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "Password requires: uppercase, lowercase, number, special character, and min 8 characters",
          },
        })}
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default PasswordVisibility;
