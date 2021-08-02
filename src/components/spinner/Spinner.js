import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    root: {
        // background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
})

const Spinner = (props) => {
    const classes = useStyles();

    return( 
        <Grid
            className={classes.root}
            spacing={0}
            alignItems="center"
            justify="center"
        >
            <CircularProgress size={120}/>
        </Grid>
    )
}

export default Spinner;