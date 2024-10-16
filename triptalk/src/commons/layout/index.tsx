"use client";

import { useParams, usePathname } from "next/navigation";

import Navigation from "./navigation";
import BannerList from "./banner";

const HIDDEN_HEADERS = ["/boards/new", "/boards/[boardId]/edit"];

interface ILayout {
  children: React.ReactNode;
}
export default function Layout(props: ILayout) {
  // 게시글등록, 게시글수정 2개의 페이지에서는 배너를 노출시키지 않습니다.
  let pathname = usePathname();
  console.log("pathname:::", pathname);

  function convertToDynamicPath() {
    const parts = pathname.split("/");
    console.log("parts:::", parts);

    if (parts.length === 4 && parts[1] === "boards" && parts[3] === "edit") {
      pathname = `/boards/[boardId]/edit`;
    }
  }

  if (pathname.includes("edit")) convertToDynamicPath();
  console.log("convert후 pathname", pathname);

  const isHiddenHeader = HIDDEN_HEADERS.includes(pathname);
  console.log("isHiddenHeader", isHiddenHeader);
  return (
    <>
      <Navigation />
      {!isHiddenHeader && <BannerList />}

      <div>{props.children}</div>
    </>
  );
}
