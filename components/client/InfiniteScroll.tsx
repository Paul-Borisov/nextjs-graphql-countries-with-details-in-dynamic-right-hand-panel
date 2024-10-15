"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";

const virtualItemHeightinPx = 44;
const visrtualScrollDelayInMilliseconds = 200;

const queryClient = new QueryClient();

async function fetchServerPage(
  initData: ReactNode[],
  limit: number,
  offset: number = 0
): Promise<{ rows: Array<ReactNode>; nextOffset: number | undefined }> {
  const rows = initData
    //.slice(0, 30)
    .slice(offset * limit, offset * limit + limit);

  // console.log(
  //   rows.length,
  //   offset * limit,
  //   offset * limit + limit,
  //   rows.length ? offset + 1 : undefined
  // );
  await new Promise((resolve) =>
    setTimeout(resolve, visrtualScrollDelayInMilliseconds)
  );

  return { rows, nextOffset: rows.length ? offset + 1 : undefined };
}

export default function InfiniteScrollWrapper({ data }: { data: ReactNode[] }) {
  return (
    <QueryClientProvider client={queryClient}>
      <InfiniteScroll data={data} />
    </QueryClientProvider>
  );
}

function InfiniteScroll({ data: initData }: { data: ReactNode[] }) {
  "use no memo"; // opts out this component from being compiled by React Compiler
  const {
    status,
    data,
    error,
    //isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["customdata"],
    queryFn: (ctx) => fetchServerPage(initData, 10, ctx.pageParam),
    getNextPageParam: (lastGroup) => lastGroup.nextOffset,
    initialPageParam: 0,
  });

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => virtualItemHeightinPx,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer,
    virtualItems,
  ]);

  const isLoading = status === "pending";
  const isError = status === "error";

  return (
    <div>
      {isLoading ? (
        <div className="h-[50vh]">Loading...</div>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div className="text-3xl font-semibold fixed opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Countries
          </div>
          <section
            ref={parentRef}
            className="w-[80vw] h-[50vh] overflow-y-auto whitespace-pre-wrap break-words"
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const isLoaderRow = virtualRow.index > allRows.length - 1;
                const post = allRows[virtualRow.index];

                return (
                  <div
                    key={virtualRow.index}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {isLoaderRow
                      ? hasNextPage
                        ? "Loading more..."
                        : "Nothing more to load"
                      : post}
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
      {/* <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div> */}
    </div>
  );
}
