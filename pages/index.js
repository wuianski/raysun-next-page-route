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

export default function Index({url,nav}) {
  // console.log(url.videoUrl)
  return (
        <Stack direction="row" spacing={{ xs: 0, md: 0 }}>
          <Item sx={{ width: { xs: "100%", md: "275px" }, height: { xs: "60px", md: "100vh" }, backgroundColor:"#fff", borderRight: { xs: "0px solid #000", md: "1px solid #000" }, position:"fixed", zIndex:"99" }}>
            <Nav nav={nav}/>
          </Item>
          <Item sx={{ width: { xs: "100vw", md: "calc(100% - 0px)" }, paddingLeft: { xs: "0", md: "275px" }, paddingTop: { xs: "60px", md: "0" } }}>
            <Box>
              <div className="vimeo-wrapper">
                <iframe
                  src={url.videoUrl}
                ></iframe>
              </div>
            </Box>          
          </Item>      
        </Stack>  
  );
}

export async function getServerSideProps() {
  // Run API calls in parallel
  const [url, allworks] = await Promise.all([
    await fetchData(
      `
      query  {
          frontPage {
              videoUrl
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
            thumbnail {
              id,
              filename_disk,
            },
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
      url: url.data.frontPage,
      nav: allworks.data.works
    },
    //revalidate: 1,
  };
}