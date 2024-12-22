import axios from "axios";
import { BASEURL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) =>store.feed);

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASEURL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    getFeed();
  },[]);

  if (!feed) return;
  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;


  return (
    feed && (
        <div className="flex justify-center my-10">
          <UserCard user={feed[0]} />
        </div>
      )
  );
};

export default Feed;