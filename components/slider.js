import React, { Component } from "react";
import Slider from "react-slick";

import Image from 'next/image'
import Box from '@mui/material/Box';
import { width } from "@mui/system";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "red" }}
    //     onClick={onClick}
    //   />
    // <div className={className} onClick={onClick}>
    <ArrowForwardIosIcon className={className} style={{ ...style, display: "block", color:"#ffffff" }} onClick={onClick}/>
    // </div>
    );
  }
  
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ArrowBackIosIcon className={className} style={{ ...style, display: "block", color:"#ffffff" }} onClick={onClick}/>
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "green" }}
    //     onClick={onClick}
    //   />
    );
  }

export default function SlickSlider({ data }) {
    // console.log(data)
    const settings = {
        // arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <>
             <Slider {...settings}>
                 {data.images.map((img) => ( 
                    <div key={img.id}>
                        <Box sx={{
                      position: "relative",
                      width:"100%",
                    }}>
                        <Image
                            src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${img.directus_files_id.filename_disk}`}
                            sizes="100vw"
                            alt="Picture of work"
                            // fill
                            // style={{
                            //     objectFit: 'contain', // cover, contain, none
                            //     objectPosition: 'center'
                            // }}
                            // priority
                            style={{
                                width: '100%',
                                height: 'auto',
                              }}
                            width={500}
                            height={300}
                        /> 
                        </Box>
                    </div>  
                ))}
            </Slider>
        </>

      )
    }