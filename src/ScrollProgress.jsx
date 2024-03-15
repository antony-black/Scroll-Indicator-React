import React, { useEffect, useState } from "react";
import List from "./components/List";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import "./index.scss";

export default function ScrollProgress() {
  const [isLoading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const url = "https://dummyjson.com/products?limit=100";

  const fetchList = async (currentURL) => {
    setLoading(true);
   try {
    const response = await fetch(currentURL);
    const data = await response.json();
    
    if (data?.products) {
      setList(data.products);
      setLoading(false);
    };

   } catch(error){
    console.log(`ERROR, ${error}`);
    setErrorMsg(error);
    isLoading(false);
   }
  }

  const handleScroll = () => {
    const scrollingThumbY = document.documentElement.scrollTop;
    const scrollLineHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollingThumbY / scrollLineHeight * 100;

    return setScrollProgress(progress);
  }

  useEffect(() => {
    fetchList(url);
  },[url]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  },[])

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <div className="main-container">
      <div className="content">
      <div className="header-container">
          <Header>Pay attention for the scroll indicator</Header>
          <ProgressBar scrollProgress={scrollProgress}/>
        </div>
        <List list={list}/>
      </div>
    </div>
  );
}
