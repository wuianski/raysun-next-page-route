import fetchData from "../../lib/api";
import Nav from "../../components/nav"
import Slider from "../../components/slider"

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
    borderRadius:"0",
  }));

export default function Work({ works, nav }) {
    // console.log(nav);
    // sx={{position:"fixed", height:"100vh", backgroundColor:"#f0f", borderRight:"1px solid #000"}}
  return (
    <>
    <Stack direction="row" spacing={{ xs: 0, md: 0 }}>
        <Item sx={{ width: { xs: "100%", md: "275px" }, height: { xs: "60px", md: "100vh" }, backgroundColor:"#fff", borderRight: { xs: "0px solid #000", md: "1px solid #000" }, position:"fixed", zIndex:"99" }}>
            <Nav nav={nav}/>
        </Item>
        <Item sx={{ width: { xs: "100vw", md: "calc(100% - 0px)" }, paddingLeft: { xs: "0", md: "275px" }, paddingTop: { xs: "60px", md: "0" } }}>
            <Box p={4} mt={1}>
                {works.map((w) => (
                    <div key={w.id}>
                        <Stack direction={{xs:"column", md:"row"}} spacing={{ xs: 0, md: 1 }} sx={{fontWeight:"bold"}}>
                            <Item>
                                <Box sx={{textTransform:"uppercase"}}>{w.title_en}</Box>
                            </Item>
                            <Item>
                                <Box>{w.title_tw}</Box>
                            </Item>
                        </Stack>
                        <Box pt={14} pb={4}
                            dangerouslySetInnerHTML={{
                                __html: w.info,
                            }}>
                        </Box>
                        <Box>
                            <Slider data={w}/>
                        </Box>
                        <Box pt={8}
                            dangerouslySetInnerHTML={{
                                __html: w.details,
                            }}>
                        </Box>
                    </div>
                ))}
            </Box>
        </Item>
    </Stack>     
    </>
  );
}

export async function getServerSideProps({ params }) {
  // console.log(params); 
  // Run API calls in parallel
  const [works, allworks] = await Promise.all([
    await fetchData(
      `
        query  {
            works  (filter: { id: { _eq: "${params.id}"},status:{_eq:"published"},  }, ){
                id,
                status,
                sort,
                title_en,
                title_tw,
                info,
                images {
                  id,
                  directus_files_id {
                    filename_disk
                  }
                },
                details,
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
    await fetchData(
        `
          query allworks{
            works (filter: {status: {_eq:"published"} }){
              id,
              status,
              sort,
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
      works: works?.data.works || {},
      nav: allworks?.data.works || {},
    },
    //revalidate: 1,
  };
}
