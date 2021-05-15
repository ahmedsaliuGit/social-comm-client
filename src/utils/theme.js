const globalTheme = {
  palette: {
    primary: {
      light: "#757ce8",
      main: "#618833",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#00a152",
      dark: "#ba000d",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariant: true,
  },
  global: {
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      margin: 20,
      position: "relative",
    },
    customError: {
      fontSize: "0.8rem",
      marginTop: 20,
      color: "red",
    },
    progress: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#00bcd4",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
};

export default globalTheme;
