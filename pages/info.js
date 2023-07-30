import fetchData from "../lib/api";
import Nav from "../components/nav"

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

/** stack Item setting **/
const Item = styled(Paper)(({ theme }) => ({
    textAlign: "left",
    color: "#000",
    background: "none",
    boxShadow: "none",
    marginLeft:0,
    borderRadius:"0",
  }));


export default function Info({info, nav}) {
    // console.log(nav);
    return (
        <>
        <Stack direction="row" spacing={{ xs: 0, md: 0 }}>
            <Item sx={{ width: { xs: "100%", md: "240px" }, height: { xs: "60px", md: "100vh" }, backgroundColor:"#fff", borderRight: { xs: "0px solid #000", md: "1px solid #000" }, position:"fixed", zIndex:"99" }}>
                <Nav nav={nav}/>
            </Item>
            <Item sx={{ width: { xs: "100vw", md: "calc(100% - 0px)" }, paddingLeft: { xs: "0", md: "240px" }, paddingTop: { xs: "60px", md: "0" } }}>
                <Box p={4} mt={1} sx={{textTransform:"uppercase"}}>
                    <Box>FOR NEW PROJECTS AND COLLABORATIONS:</Box>
                    <Box sx={{fontWeight:"bold"}}>{info.email}</Box>
                    <Box pt={11} pb={11}
                        dangerouslySetInnerHTML={{
                        __html: info.agency,
                        }}>
                    </Box>
                    <Box
                        dangerouslySetInnerHTML={{
                        __html: info.bibliography,
                        }}>
                    </Box>
                </Box>                
            </Item>
        
        </Stack>  
        </>
    )
}

export async function getServerSideProps() {
    // Run API calls in parallel
    const [info, allworks] = await Promise.all([
      await fetchData(
        `
        query  {
            info {
                id,
                email,
                agency,
                bibliography
              }
        }
        `,
        {
          variables: {},
        }
      ),
      await fetchData(
        `
          query allworks{
            works (filter: {status: {_eq:"published"} }){
              id,
              status,
              title_en,
              title_tw,
            } 
          }
        `,
        {
          variables: {},
        }
      ),
    ]);
  
    return {
      props: {
        info: info.data.info,
        nav: allworks.data.works
      },
      //revalidate: 1,
    };
  }