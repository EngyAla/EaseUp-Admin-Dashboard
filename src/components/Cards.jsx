import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';



const Cards = ({data}) => {
    const {
        title,
        description,
        mainNumber,
        subNumber,
        icon,
        colors = {}
    } = data;

    const {
        mainColor,
        subColor,
        mainTxtColor,
        subTxtColor,
        mainNumColor,
        cardBgColor = "#fff"
    } = colors;

    return (
            <Card sx={{bgcolor: cardBgColor, boxShadow: "1px 1px 5px rgba(189, 189, 189, 0.3)", }}>
                <CardActionArea sx={{ height: '100%',}}>
                    <CardContent sx={{ height: '100%' }}>
                        <Box sx={{display: "flex", flexDirection: "column", gap: .5}}>
                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Box sx={{color: mainColor, backgroundColor: subColor, p: .8, borderRadius: 1.5 }}>
                                    {icon}
                                </Box>
                                {subNumber && 
                                <Box sx={{color: mainColor, backgroundColor: subColor, height: "fit-content", px: 2, py: .5, borderRadius: 5}}>
                                    <Typography variant='body2' sx={{fontSize: 12}}>{subNumber}</Typography>
                                </Box>
                                }
                            </Box>
                            <Typography variant='body2' sx={{fontSize: 16, color: mainTxtColor, mt: .7}}>{title}</Typography>
                            <Typography variant='h5'  sx={{fontWeight: 700, mt: 1, color: mainNumColor, }}>{mainNumber}</Typography>
                            <Typography variant='body2' sx={{fontSize: 12, color: subTxtColor}}>{description}</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
    );
}

export default Cards;