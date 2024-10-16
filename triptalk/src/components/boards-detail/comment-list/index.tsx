import { useCommentList } from "./hook";
import styles from "./styles.module.css";

import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import CommentItem from "../comment-list-item";

export default function CommentList() {
  const { data, fetchMore, isHasMore, setIsHasMore } = useCommentList();

  const onNext = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoardComments.length === 0) {
          setIsHasMore(false);
          // return prev;
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          };
        }
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };
  return (
    <div className={styles.commentListBody}>
      <div className={styles.commentListContainer}>
        <InfiniteScroll
          dataLength={data?.fetchBoardComments.length ?? 0}
          next={onNext}
          hasMore={isHasMore}
          loader={<Skeleton />}
        >
          {data?.fetchBoardComments.map((comment, index) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              index={index}
              length={data?.fetchBoardComments.length ?? 0}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
