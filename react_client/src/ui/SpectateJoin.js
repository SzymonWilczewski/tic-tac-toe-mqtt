import { validate as uuidValidate } from "uuid";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const SpectateJoin = () => {
  const NameTextField = withStyles({
    root: {
      "& .MuiInputBase-root": {
        color: "white",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
      },
    },
  })(TextField);

  const history = useHistory();

  const handleChange = (uuid) => {
    history.push(`/spectate/${uuid}`);
  };

  return (
    <NameTextField
      id="uuid"
      label="Enter invitation code"
      variant="outlined"
      InputLabelProps={{ className: "textfield__label" }}
      onKeyDown={(e) =>
        e.key === "Enter" &&
        uuidValidate(e.target.value) &&
        handleChange(e.target.value)
      }
    />
  );
};

export default SpectateJoin;
