"use client"

import { Box, Container, Flex, Strong } from "@radix-ui/themes";
// import * as Separator from "@radix-ui/react-separator";
import { Separator } from "@radix-ui/themes";
import Logo from "../../public/logo.svg";
import Link from "next/link";
import Image from "next/image";

const Footer = ()=> {
    return (
    <Box >
        <hr></hr>
        <Container className = "p-5">
            <Image src = {Logo} alt = "Something went wrong" height="50"/>

            <Box className = "flex flex-col items-center">
                <Box className = "flex gap-3">
                    <Link href={"#"}>About us</Link>
                    <Link href={"#"}>Contact us</Link>
                    <Link href={"#"}>Terms and condition</Link>
                    <Link href={"/privacy_policy"}>Privacy Policy</Link>
                </Box>
                <Strong>Copyright © from 2024 www.scholastic.com</Strong>
            </Box>
        </Container>
    </Box> 
    );
}

export default Footer;