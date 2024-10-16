import { useQuery } from "@apollo/client";
import { FetchBoardCommentsDocument } from "commons/graphql/graphql";
import { useParams } from "next/navigation";
import { useState } from "react";
export const useCommentList = () => {
  const [isHasMore, setIsHasMore] = useState<boolean>(true);
  const params = useParams();
  const id = params.boardId.toString();
  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: { page: 1, boardId: id },
  });

  return { data, fetchMore, isHasMore, setIsHasMore };
};
