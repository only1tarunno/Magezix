import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/shared/Loader";
import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Container from "../../components/shared/Container";
import ArticleCard from "./ArticleCard";
import InnerPageBanner from "../../components/shared/InnerPageBanner";
import Lottie from "lottie-web";
import usePremium from "../../hooks/usePremium";

const AllArticle = () => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [tags, setTags] = useState("");
  const [lottieload, setLootieLoad] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [isUserPremium, isUserPremiumloading] = usePremium();
  console.log(isUserPremium);

  // useEffect(() => {
  //   const currentDate = new Date();

  //   if (isUserPremium) {
  //     const expireDate = new Date(isUserPremium?.premimiumExpire);

  //     if (currentDate.getTime() <= expireDate.getTime()) {
  //       // console.log("user premium");
  //     } else {
  //       // console.log("user not premium");
  //       const userInfo = {
  //         premiumTaken: false,
  //       };
  //       axiosSecure
  //         .patch(`/users/${isUserPremium?.email}`, userInfo)
  //         .then((res) => {
  //           console.log(res.data);
  //         });
  //     }
  //   }
  // }, [isUserPremium, axiosSecure]);

  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: ["articles"],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await axiosPublic.get(
          `allArticles?limit=6&offset=${pageParam}&search=${search}&tags=${tags}`
        );

        return { ...res.data, prevOffset: pageParam };
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.prevOffset + 1 > lastPage.articlesCount) {
          return false;
        }
        return lastPage.prevOffset + 1;
      },
    });

  const articles = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.articles];
  }, []);

  const handlesearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    const searchtext = e.target.search.value;
    setTags("");
    setSearch(searchtext);
  };

  const handleTags = (e) => {
    setIsSearching(true);
    setSearch("");
    setTags(e.target.value);
  };

  useEffect(() => {
    setIsSearching(true);
    setLootieLoad(true);
    refetch().then(() => {
      setIsSearching(false);
      setLootieLoad(false);
    });
  }, [search, tags, refetch]);

  // for lottie animation
  const animation = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: animation.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/no-data.json",
    });
  }, [lottieload]);

  if (isLoading && isUserPremiumloading === "pending") {
    return <Loader></Loader>;
  }

  return (
    <>
      <InnerPageBanner
        title="All Articles"
        subTitle="Articles"
      ></InnerPageBanner>
      <Container>
        <div className="flex items-center justify-between flex-col lg:flex-row mt-10 gap-5">
          <div className="w-full md:max-w-xs">
            <select
              value={tags}
              onChange={handleTags}
              className="select select-bordered w-full md:max-w-xs focus:outline-none"
            >
              <option value={""}>Filter By Tags</option>
              <option>technology</option>
              <option>health</option>
              <option>environment</option>
              <option>space</option>
              <option>AI</option>
              <option>fashion</option>
              <option>cuisine</option>
              <option>education</option>
              <option>empowerment</option>
            </select>
          </div>
          <form
            onSubmit={handlesearch}
            className="w-full md:max-w-xs flex justify-center"
          >
            <div className="join w-full md:max-w-xs justify-center">
              <div className="w-full">
                <input
                  name="search"
                  className="input input-bordered w-full join-item focus:outline-none"
                  placeholder="Search"
                />
              </div>
              <div className="indicator">
                <button className="btn join-item hover:bg-[#ff184e] hover:border-[#ff184e] hover:text-white">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {isSearching ? (
          <Loader></Loader>
        ) : (
          <InfiniteScroll
            dataLength={articles ? articles.length : 0}
            next={() => fetchNextPage()}
            hasMore={hasNextPage}
            loading={<Loader></Loader>}
          >
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 my-10">
              {articles?.length > 0 ? (
                articles.map((article, index) => (
                  <ArticleCard
                    key={`${article._id}_${index}`}
                    article={article}
                    accessPremium={isUserPremium}
                  ></ArticleCard>
                ))
              ) : (
                <div className="pb-14  lg:col-span-2">
                  {!lottieload && (
                    <>
                      <div className="w-80 mx-auto" ref={animation}></div>
                      <h2 className="text-center font-bold text-4xl">
                        No Service Found
                      </h2>
                      <p className="text-xl md:text-2xl font-medium text-center">
                        Whoops...This information in not available for this
                        moment
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </InfiniteScroll>
        )}
      </Container>
    </>
  );
};

export default AllArticle;
