import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

export const SocialRedirect = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");
    const userId =searchParams.get("userId");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const token = {
            access_token: access_token || "",
            refresh_token: refresh_token || "",
            userId : userId || ""
        };
        localStorage.setItem("access_token", token.access_token);
        localStorage.setItem("userId", token.userId);
        enqueueSnackbar("Chào mừng trở lại ", { variant: '' });
        navigate("/")
    }, []);
    return <div>Hello window!</div>;
};