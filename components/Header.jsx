import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton"
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";
import Image from "next/image";
import { styled } from "@mui/system";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Header = () => {
  const router = useRouter();

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <IconButton edge="start" aria-label="home" onClick={() => router.push("/")}>
            <Image
              src="/logo.svg"
              alt="ACME"
              width="20px"
              height="30px"
            />

            <Typography variant="h6" color="inherit" noWrap sx={{
              color: (theme) => theme.palette.common.white,
              ml: 1
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