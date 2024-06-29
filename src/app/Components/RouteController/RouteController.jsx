"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

const RouteController = ({ children }) => {
  const router = useRouter();
  const [Loading, setLoading] = useState(true);
  const [PathName, setPathName] = useState(router.asPath);
  const loggedInUserData = useSelector(state => state.user.value);
  useEffect(() => {
    const path = window.location.pathname;
    setPathName(path);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // const loggedInUser = localStorage.getItem("loggedinUser");
      if (
        !loggedInUserData &&
        (PathName === "/home" ||
          PathName === "/message" ||
          PathName === "/setting/" ||
          PathName === "/chat" ||
          PathName === "/notification")
      ) {
        router.push("/");
        if (PathName === "/") {
          setLoading(false);
        }
      } else if (
        loggedInUserData &&
        (PathName === "/" || PathName === "/register")
      ) {
        router.push("/home");
        if (PathName === "/home") {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, [router, PathName, loggedInUserData]);

  useEffect(() => {
    if (!router || !router.events) {
      return;
    }
    const handleRouteChange = url => {
      setPathName(new URL(url, window.location.origin).pathname);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, loggedInUserData, PathName]);

  if (Loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#000"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  } else if (!Loading) {
    return children;
  }
};

export default RouteController;
