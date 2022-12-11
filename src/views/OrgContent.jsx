import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getOnePost } from "../api/post";

var allFriends = [];

var psts = [];

var followingList = [];

const OrgContent = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState({});
  const [friendPost, setfriendPost] = useState([]);
  const [allPosts, setallPosts] = useState([]);
  const [followingPosts, setfollowingPosts] = useState([]);
  var allusers = [];

  useEffect(() => {
    const getOnePost = async () => {
      console.log("hd");

      const response2 = await axios.get(
        `http://localhost:8080/sendOrg/${user}`
      );
      setData(response2.data.data);

      const response3 = await axios.get(`http://localhost:8080/getPosts`);
      response3.data.data.map((item, index) => psts.push(item));
      setallPosts(psts);
      //console.log("ALKGETF:", psts);

      //   for (let i = 0; i < response2.data.data.friends.length; i++) {
      //     let abc = response2.data.data.friends[i];
      //     console.log("ABC:", i, "--:", abc);
      //     const response = await axios.get(
      //       `http://localhost:8080/getOnePost/${abc}`
      //     );
      //     allFriends.push(response.data.data);
      //     setfriendPost(allFriends);
      //     console.log("hhh1:", response.data.data);
      //     console.log("hhh2:", allFriends);
      //   }
      //console.log("aaa", response.data.data);
    };
    getOnePost();
  }, []);

  let length = data?.following?.length;
  psts.map((item, index) => {
    for (let i = 0; i < length; i++) {
      if (data.following[i] == item?.username) {
        followingList.push(item);
      }
    }
  });

  function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
      var item = a[i]._id;
      //console.log("agh:", item, seen[item]);
      if (seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = a[i];
      }
    }
    return out;
  }

  followingList = uniq_fast(followingList);

  return (
    <div>
      abc{console.log(followingList)}
      {followingList.map((item) => (
        <div>
          <h2>{item.username}</h2>
          <h3>{item.description}</h3>
          <img
            className="rounded"
            src={item.photoSrc}
            width="500"
            height="200"
            alt="show-img"
            id="newImg"
          ></img>
        </div>
      ))}
    </div>
  );

  //   return !friendPost.length ? (
  //     <div>
  //       <h1>Home</h1>
  //     </div>
  //   ) : (
  //     <div>
  //       <p>Hoja pls {friendPost.length}</p>

  //       {friendPost.map((it, ind) => (
  //         <div>
  //           {friendPost[ind] && friendPost[ind].length ? (
  //             friendPost[ind].map((item, index) => (
  //               <div>
  //                 <h2>{item.username}</h2>
  //                 <h3>{item.description}</h3>
  //                 <h4>{index}</h4>
  //                 <h5>{ind}</h5>
  //                 <img
  //                   className="rounded"
  //                   src={item.photoSrc}
  //                   width="500"
  //                   height="200"
  //                   alt="show-img"
  //                   id="newImg"
  //                 ></img>
  //               </div>
  //             ))
  //           ) : (
  //             <span className="text-danger">NO POST</span>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   );
};

export default OrgContent;
