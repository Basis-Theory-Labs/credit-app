import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton"
import AccountBalance from "@mui/icons-material/AccountBalance"
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";
import { styled } from "@mui/system";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Header = () => {
  const router = useRouter();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
            <IconButton edge="start" aria-label="home" onClick={() => router.push("/")}>
              <AccountBalance sx={{ 
                color: (theme) => theme.palette.common.white,
                mr: 2 
              }} />

              <Typography variant="h6" color="inherit" noWrap sx={{
                color: (theme) => theme.palette.common.white
              }}>
                AcmeCorp
              </Typography>
            </IconButton>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default Header;