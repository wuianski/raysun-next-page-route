import React, { Component } from "react";
import Slider from "react-slick";

import Image from 'next/image'
import Box from '@mui/material/Box';

const settings = {
    // arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
};

export default function SlickSlider({ data }) {
    // console.log(data)
    return (
        <>
             <Slider {...settings}>
                 {data.images.map((img) => ( 
                    <div key={img.id}>
                        <Box sx={{
                      position: "relative",
                    //   width:  {xs: "100vw", md: "calc(50vw - 288px)" },
                    //   width: "calc(100vw - 240px)",
                      height: "50vh",
                    //   marginLeft: "auto",
                    //   marginRight: "auto",
                    }}>
                        <Image
                            src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${img.directus_files_id.filename_disk}`}
                            // width={100}
                            // height={100}
                            // sizes="1000"
                            alt="Picture of work"
                            fill
                            style={{
                                objectFit: 'cover', // cover, contain, none
                                objectPosition: 'center'
                            }}
                            // priority
                        /> 
                        </Box>
                    </div>  
                ))}
            </Slider>
        </>

      )
    }