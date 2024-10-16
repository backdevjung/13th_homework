import { FetchBoardsQuery } from "commons/graphql/graphql";
export interface IPaginationProps {
  page: number;
  setPage: (page: number) => void;
  refetch: () => void;
  data: FetchBoardsQuery | undefined;
}
