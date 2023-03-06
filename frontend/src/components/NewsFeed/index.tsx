import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchFeeds,
  selectFeeds,
  selectLoading,
} from "../../store/feed/feedSlice";
import { IFeed } from "../../types/types";
import { Button } from "../shared/Button";
import LazyBackground from "./LazyBackground";
import { useDelayUnmount } from "./useDelayUnmount";
const NEWSFEED = [
  {
    id: 1,
    title: " News 1",
    subtext: "Subtext-1 for the slide show active passive",
    description: " This is description of the first of TOP 4 NEWS",
  },
  {
    id: 2,
    title: " News 2",
    subtext: "Subtext-2 for the slide show active passive",
    description: " This is description of the first of TOP 4 NEWS",
  },
  {
    id: 3,
    title: " News 3",
    subtext: "Subtext-3 for the slide show active passive",
    description: " This is description of the first of TOP 4 NEWS",
  },
  {
    id: 4,
    title: " News 4",
    subtext: "Subtext-4 for the slide show active passive",
    description: " This is description of the first of TOP 4 NEWS",
  },
];

const delay = 4000;
type RefType = ["Timeout", null];
const Feed = () => {
  const loading = useAppSelector(selectLoading);
  const NEWSFEED: IFeed[] = useAppSelector(selectFeeds);
  const [clicked, setClicked] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [id, setId] = useState<number>(0);
  const [feedId, setfeedId] = useState<number | undefined>();
  const [currentTitle, setTitle] = useState<string | undefined>("");

  const [currentDescription, setDescription] = useState<string | undefined>("");
  const [bgImageUrl, setBgImageUrl] = useState<string | undefined>(
    "./src/assets/cover.jpg"
  );
  const [blurHashUrl, setBlurHashUrl] = useState<string | undefined>(
    "LCIg+j00%}?J|nVtOr8^D#xDS%xH"
  );
  const [isMounted, setIsMounted] = useState(true);

  const mountedStyle = {transition: "background-image 0.5s ease-in-out",};
  const unmountedStyle = { transition: "background-image 0.5s ease-in-out", transitionProperty: "all" };
  const handleChangeSlide = () => {
    setIsMounted(!isMounted);
  };
  let timeOutRef = React.useRef<any>(null);

  const resetTimeout = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  };

  const toggleClicked = () => {
    // while(!animate){

    // }
    setClicked(false);
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  const handleSubmit = (event: any, idx: number) => {
    event.preventDefault();
    // // console.log("handle submitted");
    // // console.log(event.target.elements.btn.firstElementChild.innerHTML);
    // // // console.log(event.target.elements.btn.secondElementChild)// secondElementCHild term doesnt exist
    // // console.log(event.target.elements.btn.lastElementChild.innerHTML);
    // bt.childNodes is another available selector

    // const id_ = parseInt(event.target.elements.btn.firstElementChild.innerHTML);
    setId(idx);
    // const currentData = NEWSFEED[.find((x) => x.id === id_);]
    const currentData = NEWSFEED[idx];
    setDescription(currentData!.description);
    setTitle(currentData!.title);

    setBgImageUrl(currentData.imageUrl || "./src/assets/cover.jpg");
    setBlurHashUrl(currentData.blurHash);
    handleChangeSlide();
  };
  useEffect(() => {
    console.log(blurHashUrl);
  }, [blurHashUrl]);
  useLayoutEffect(() => {
    // SET INITIAL STATE AS 1 , and update with the details of the first NEWS
    dispatch(fetchFeeds()).then(() => {
      // console.log(NEWSFEED)
      const initial = NEWSFEED[0];
      setId(0);

      if (initial && Object.keys(initial).length != 0) {
        setfeedId(parseInt(initial.id!));
        setDescription(initial!.description);
        setTitle(initial!.title);

        setBgImageUrl(initial.imageUrl);
        setBlurHashUrl(initial.blurHash);
        handleChangeSlide();
      } else {
        setDescription("LOADING ...");
        setTitle("LOADING ...");
      }
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    });
  }, []);

  React.useLayoutEffect(() => {
    resetTimeout();
    timeOutRef.current = setTimeout(
      () =>
        setId((prevIndex) =>
          prevIndex === NEWSFEED.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
    return () => {
      resetTimeout();
    };
  }, [id]);

  useLayoutEffect(() => {
    const newdata = NEWSFEED[id];
    if (newdata) {
      setfeedId(parseInt(newdata.id!));
      setDescription(newdata.description);
      setTitle(newdata.title);

      setBgImageUrl(newdata.imageUrl || "./src/assets/cover.jpg");
      setBlurHashUrl(newdata.blurHash);
      handleChangeSlide();
    } else {
      setDescription("LOADING ...");
      setTitle("LOADING...");
      // setBgImageUrl("./src/assets/cover.jpg");
    }
  }, [id, currentDescription, currentTitle]);

  return (
    <>
        <LazyBackground
          src={bgImageUrl}
          blurHash={blurHashUrl}
          key={0}
          transitionLeaveTimeout={300}
          style={isMounted ? mountedStyle : unmountedStyle}
        >
          <div className="feed-body">
           
            <div
              className={`feed-header h-[35%] absolute sm:relative bottom-0 sm:h-[25rem] mb-auto md:h-[35rem] mx-auto md:mt-[4rem] w-[70%] sm:m-0 sm:w-[49rem] ${
                animate ? "card-animate" : ""
              }`}
            >
              <div className={`card`}>
                <h4 className="text-[3.2rem] font-bold">
                {(currentTitle?.length || "") < 20 ? (
                      currentTitle
                    ) : (
                      <>
                        {currentTitle?.slice(0, 20) || ""}
                        ...
                      </>
                    )}
                </h4>
                <p className="max-h-[250px] hidden sm:visible overflow-hidden text-ellipsis pb-[5rem] text-[2.4rem]">
{currentDescription}

                </p>
                <Button className="absolute bottom-3 left-3 bg-[#00A652] align-bottom hover:bg-[#07f37d]">
                  <Link to={`/feed/${feedId}`}>READ MORE</Link>
                </Button>
              </div>
            
           </div>
          
            <div className=" feed-footer hidden sm:flex">
              {loading == "idle" || loading == "pending"
                ? ""
                : NEWSFEED.map((news: IFeed, idx: number) => (
                    <div key={idx} className="card">
                      <form action="#" onSubmit={(e) => handleSubmit(e, idx)}>
                        <button
                          onClick={toggleClicked}
                          name="btn"
                          type="submit"
                          className={`${
                            idx == id
                              ? "button-active"
                              : "h-[80%] bg-[#00a652a8]/[0.659]"
                          } card-button`}
                        >
                          <h4 className="self-center">{idx + 1}</h4>
                          <p className="hidden md:inline-block">
                          {(news.subtext?.length || " ") < 20 ? (
                      news.subtext
                    ) : (
                      <>
                        {news.subtext?.slice(0, 20) || ""}
                        ...
                      </>
                    )}
                            
                          </p>
                        </button>
                      </form>
                    </div>
                  ))}
            </div>
          </div>
        </LazyBackground>
    </>
  );
};

export default Feed;
