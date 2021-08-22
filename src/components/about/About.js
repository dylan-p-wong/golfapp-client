const { Typography, Box } = require("@material-ui/core")

const About = () => {
    return (
        <Box p={6}>
            <Typography align="center" variant="h1" style={{ marginBottom: 40 }}>About</Typography>
            
            <Typography align="center" variant="h4">Mangrove Golf was made as a side project to help golf coaches record lessons for student remotely.</Typography>
        </Box>
    )
}

export default About;