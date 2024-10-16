"use client";

import BoardList from "components/boards-list/list";
import { Pagination } from "components/boards-list/pagination";
import { useState } from "react";
import { FetchBoardsDocument } from "commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS } from "components/boards-list/list/queries";

export default function BoardsPage() {
  const [page, setPage] = useState<number>(1);
  const { data, refetch } = useQuery(FETCH_BOARDS, {
    variables: { page: page },
  });

  return (
    <>
      <BoardList data={data} page={page} refetch={refetch} />
      <Pagination page={page} setPage={setPage} refetch={refetch} data={data} />
    </>
  );
}
