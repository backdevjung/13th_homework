import { FetchBoardCommentsQuery } from "commons/graphql/graphql";
import { Dispatch, SetStateAction } from "react";
export interface ICommentWriteProps {
  isCommentEdit: boolean;
  setIsCommetEdit: Dispatch<SetStateAction<boolean>>;
  comment: FetchBoardCommentsQuery["fetchBoardComments"][0] | null;
}
