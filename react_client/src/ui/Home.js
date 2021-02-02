import { connect } from "react-redux";
import { homeSelector, changeName } from "../state/ducks/home";
import { v4 as uuid } from "uuid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./Home.css";

const Home = ({ home, changeName }) => {
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

  return (
    <div>
      {!home.name ? (
        <NameTextField
          id="name"
          label="Name"
          variant="outlined"
          InputLabelProps={{ className: "textfield__label" }}
          onKeyDown={(e) => e.key === "Enter" && changeName(e.target.value)}
        ></NameTextField>
      ) : (
        <ul>
          <li>
            <a href={`/game/${uuid()}`}>NEW GAME</a>
          </li>
          <li>
            <a href="/join">JOIN GAME</a>
          </li>
          <li>
            <a href="/spectate">SPECTATE</a>
          </li>
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    home: homeSelector(state),
  };
};

export default connect(mapStateToProps, { changeName })(Home);
