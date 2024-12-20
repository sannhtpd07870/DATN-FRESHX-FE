import { useEffect, useState } from "react";
import Hero from "../../components/public/Home/HeroSlider";
import Choose from "../../components/public/Home/ChooseSection";
import News from "../../components/public/Home/News";
import Blog from "../../components/public/Home/Item-Blog";
import Client from "../../components/public/Home/Client";
import Feedback from "../../components/public/Home/Feedback";
import Data from "../../assets/datajson/dataclien.json";
const Home = () => {

  const [data, setData] = useState(null)
  useEffect(() => {
    setData(Data)
  }, [])

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
