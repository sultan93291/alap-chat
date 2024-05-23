"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const RouteController = ({ children }) => {
  const router = useRouter();
  const [Loading, setLoading] = useState(true);
  const [PathName, setPathName] = useState(router.asPath);
  useEffect(() => {
    const path = window.location.pathname;
    setPathName(path);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedInUser = localStorage.getItem("loggedinUser");
      if (
        !loggedInUser &&
        (PathName === "/home" ||
          PathName === "/message" ||
          PathName === "/setting/" ||
          PathName === "/notification")
      ) {
        router.push("/");
        if (PathName === "/") {
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        }
      } else if (
        loggedInUser &&
        (PathName === "/" || PathName === "/register")
      ) {
        router.push("/home");
        if (PathName === "/home") {
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        }
      } else {
        setLoading(false);
      }
    }
  }, [router, PathName]);

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
  }, [router]);

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
  } else if(!Loading) {
    return children;
  }
};

export default RouteController;
