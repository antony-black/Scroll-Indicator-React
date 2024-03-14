import React, { useEffect, useState } from "react";
import "./index.scss";

export default function ScrollProgress() {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const url = "https://dummyjson.com/products?limit=100";

  const fetchList = async (currentURL) => {
   try {
    setLoading(true);
    const response = await fetch(currentURL);
    const data = await response.json();
    
    if (data && data.products) {
      setList(data.products);
      setLoading(false);
    };

   } catch(error){
    console.log(`ERROR, ${error}`);
    setErrorMsg(error.message);
    setLoading(false);
   }
  }

  const handleScroll = () => {
    const scrollTabY = document.documentElement.scrollTop;
    const heightToScrolling = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    setScrollProgress(scrollTabY / heightToScrolling * 100);
  }

  const createListItems = () => {
    const items = list.map((item, index) => {
      return <li key={index} className="list-item">
         {item.title}
       </li>
     });

     return items;
  }

  useEffect(() => {
    fetchList(url);
  },[url]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[]);


  if (isLoading) {
    return <div>...loading</div>
  }

  if (errorMsg) {
    return <div>{errorMsg}</div>
  }


  return (
    <div className="main-container">
      <div className="content">
        <div className="header-container">
          <h1 className="header">Pay attention for the scroll indicator</h1>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${scrollProgress}%`}}></div>
          </div>
        </div>
      <ul className="product-list">
      {createListItems()}
      </ul></div>
    </div>
  );
}
