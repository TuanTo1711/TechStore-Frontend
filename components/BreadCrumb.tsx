"use client";

import {Breadcrumbs, Typography} from "@mui/material";
import {GrFormNext} from "react-icons/gr";
import Link from '@mui/material/Link';

const BreadCrumb = () => {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            MUI
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/"
        >
            Core
        </Link>,
        <Typography key="3" color="text.primary">
            Breadcrumb
        </Typography>,
    ];

    return (
        <Breadcrumbs
            sx={{p: 2}}
            separator={<GrFormNext fontSize="small"/>}
            aria-label="breadcrumb"
        >
            {breadcrumbs.map((breadcrumb) => (
                breadcrumb
            ))}
        </Breadcrumbs>
    );
};

export default BreadCrumb;
