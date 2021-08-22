const { Typography, Box } = require("@material-ui/core")

const Contact = () => {
    return (
        <Box p={6}>
            <Typography align="center" variant="h1" style={{ marginBottom: 40 }}>Contact</Typography>
            <Typography align="center" variant="h4">Dylan Wong</Typography>
            <Typography align="center" variant="h4">dpwong88@gmail.com</Typography>
        </Box>
    )
}

export default Contact;