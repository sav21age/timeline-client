import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { appConfig } from "../../../appConfig";
import Picture from './../../Picture';

export const LogoInForm = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
            <Link color="inherit" component={RouterLink} to="/">
                <Picture
                    path={`${appConfig.MEDIA_ROOT}/logo_green.svg`}
                    alt="football timeline logo"
                    width="50"
                    height="50"
                />
            </Link>
        </Box>
    );
};