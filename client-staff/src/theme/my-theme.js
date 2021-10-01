import { createTheme } from '@mui/material/styles';

const MyTheme = createTheme({
    palette: {
        primary: {
          main: "#FF6347",
        },
        secondary: {
          main: "#71cca3",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "28px"
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    paddingLeft: "45px",
                    height: "50px",
                    margin: "5px 0"
                },
            },
        }
    }
});

export default MyTheme;