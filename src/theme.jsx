const getDesignToken = (mode) => ({
    palette: {
        mode,
        ...(mode === "light"
        ? {
            // Light Mode
            primary: {
                main: "#00796B", // Main Color
                light: "#E0F2F1",
            },
            secondary: {
                main: "#2563EB", // Active Color
                light: "#E3F2FD",
            },
            background: {
                default: "#F8FAFC", // Dashboard layout bg
                paper: "#FFFFFF",
            },
            text: {
                primary: "#0F172A", // Main text
                secondary: "#475569", // Secondary text
                disabled: "#94A3B8", // Very light text
            },
            divider: "#E2E8F0", // Border color
            error: {
                main: "#EC5252", // Notification color
            },
            login:{
                main: "#A3C0BEB2",
                rightBg: "#FFFFFF"
            },
            custom: {
                textSecondaryV2: "#64748B",
                inputLabel: "#334155",
                warning: {
                c1: "#C62828",
                c2: "#D15353",
                c3: "#DD7E7E",
                c4: "#EF9A9A",
                bg: "#FDF2F2",
                border: "#FEE2E2",
                },
                status: {
                success: { text: "#15803D", dot: "#22C55E", bg: "#DCFCE7", border: "#BBF7D0" },
                pending: { text: "#B45309", dot: "#F59E0B", bg: "#FEF3C7", border: "#FDE68A" },
                error: { text: "#B91C1C", dot: "#EF4444", bg: "#FEE2E2", border: "#FECACA" },
                },
            },
            }
        : {
            // Dark Mode
            primary: {
                main: "#4DB6AC", // Lighter version of Main Color
                light: "#004D40",
            },
            secondary: {
                main: "#60A5FA", 
                light: "#1E3A8A",
            },
            background: {
                default: "#0F172A", // Dark Navy
                paper: "#2b3951",
            },
            text: {
                primary: "#F8FAFC",
                secondary: "#94A3B8",
                disabled: "#64748B",
            },
            divider: "#334155",
            error: {
                main: "#F87171",
            },
            login:{
                main: "#1E293B",
                rightBg: "#0F172A"
            },
            custom: {
                textSecondaryV2: "#94A3B8",
                inputLabel: "#94A3B8",
                warning: {
                c1: "#EF4444",
                bg: "#2D1A1A",
                border: "#452727",
                },
                status: {
                success: { text: "#4ADE80", dot: "#22C55E", bg: "#064E3B", border: "#065F46" },
                pending: { text: "#FBBF24", dot: "#F59E0B", bg: "#451A03", border: "#78350F" },
                error: { text: "#F87171", dot: "#EF4444", bg: "#450A0A", border: "#7F1D1D" },
                },
            },
            }),
    },
});

export default getDesignToken;