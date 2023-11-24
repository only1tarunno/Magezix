import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Container from "../../components/shared/Container";
import ArticleCard from "./ArticleCard";

const AllArticle = () => {
  const [search, setSearch] = useState("");
  const axiosPublic = useAxiosPublic();
  const [isSearching, setIsSearching] = useState(false);
  const [tags, setTags] = useState("");

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
    refetch().then(() => {
      setIsSearching(false);
    });
  }, [search, tags, refetch]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="pt-56">
      <Container>
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <div>
            <select
              value={tags}
              onChange={handleTags}
              className="select select-bordered w-full max-w-xs focus:outline-none"
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
          <form onSubmit={handlesearch} className=" flex justify-center">
            <div className="join justify-center">
              <div>
                <div>
                  <input
                    name="search"
                    className="input input-bordered join-item focus:outline-none"
                    placeholder="Search"
                  />
                </div>
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
              {articles &&
                articles.map((article, index) => (
                  <ArticleCard
                    key={`${article._id}_${index}`}
                    article={article}
                  ></ArticleCard>
                ))}
            </div>
          </InfiniteScroll>
        )}
      </Container>
    </div>
  );
};

export default AllArticle;
