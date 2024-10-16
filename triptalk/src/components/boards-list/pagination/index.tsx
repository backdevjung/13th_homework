import { Pagination as PaginationAntd } from "antd";
import styles from "./styles.module.css";
import type { PaginationProps } from "antd";
import { FetchBoardsCountDocument } from "commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { IPaginationProps } from "./types";
export function Pagination(props: IPaginationProps) {
  const { data } = useQuery(FetchBoardsCountDocument);

  const pageOnChange: PaginationProps["onChange"] = (page) => {
    props.setPage(page);
  };
  console.log("data?.fetchBoardsCount", data?.fetchBoardsCount);
  return (
    <div className={styles.boardPaginationFrame}>
      {props?.data?.fetchBoards?.length && (
        <PaginationAntd
          defaultPageSize={10}
          onChange={pageOnChange}
          align="center"
          current={props.page}
          total={data?.fetchBoardsCount}
          showSizeChanger={false}
        />
      )}
    </div>
  );
}
