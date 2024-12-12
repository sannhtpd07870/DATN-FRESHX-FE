import { useEffect, useState } from "react";
import Hero from "../../components/public/Home/HeroSlider";
import Choose from "../../components/public/Home/ChooseSection";
import News from "../../components/public/Home/News";
import Blog from "../../components/public/Home/Blog";
import Client from "../../components/public/Home/Client";
import Feedback from "../../components/public/Home/Feedback";
import Data from "../../assets/data/data.json";
const Home = () => {

  const [data, setData] = useState(null)
  useEffect(() => {
    setData(Data)
    console.log(data)
  }, [])
  console.log("data", data)

  if (!data) return <div>Loading...</div>;
  return (
    <>
      <Hero />
      <Choose />
      <div className="container">
      <News data={data} />
      <Blog data={data} />
      <Client data={data} />
      <Feedback feedbacks={data.feedback} />
      </div>
    </>
  )
};

export default Home;
