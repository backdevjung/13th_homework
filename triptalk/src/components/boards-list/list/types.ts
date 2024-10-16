import { FetchBoardsQuery, Exact, InputMaybe } from "commons/graphql/graphql";
import { ApolloQueryResult } from "@apollo/client";
export interface IBoardList {
  data: FetchBoardsQuery | undefined;
  page: number;
  refetch: (
    variables?:
      | Partial<Exact<{ page?: InputMaybe<number> | undefined }>>
      | undefined
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}
