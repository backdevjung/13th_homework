"use client";

import CommentList from "components/boards-detail/comment-list";
import CommentWrite from "components/boards-detail/comment-write";
import BoardDetail from "components/boards-detail/detail/index";
import { useState } from "react";

export default function BoardsDetailPage() {
  return (
    <>
      <BoardDetail />
      <CommentWrite
        comment={null}
        isCommentEdit={false}
        setIsCommetEdit={() => {}}
      />
      <CommentList />
    </>
  );
}
