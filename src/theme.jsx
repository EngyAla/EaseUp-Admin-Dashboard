const getDesignToken = (mode)=>({
    palette: {
        mode,
        ...(mode === "light" ? 
        {
            primary: { main: "#1976d2" },
            background: { default: "#ffffff", paper: "#f5f5f5" },
            text: { primary: "#000000", secondary: "#555555" },
        } : 
        {
            primary: { main: "#90caf9" },
            background: { default: "#121212", paper: "#1e1e1e" },
            text: { primary: "#ffffff", secondary: "#bbbbbb" },
        } )
    }
})

export default getDesignToken;