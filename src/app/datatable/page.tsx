"use client";

import React, { useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

type poolData = {
  name: string;
  namapaket_konstruksi: string;
};

interface Price {
  name: string;
  symbol: string;
}

const getMarket = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10", {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json;
};

const Page = () => {
  //console.log(datapost);
  const { data, isError, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ["admpembangunantkn"],
    queryFn: getMarket,
  });

  const [post, setPosts] = useState([]);

  useEffect(() => {
    getMarket().then((data) => setPosts(data));
  }, []);

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />

      <div className="m-10rem p-10rem card">
        {/* {data.map((kumpulanData: any) => (
          <>{kumpulanData.id}</>
        ))} */}

        {data?.results?.map(({ kumpulanData }: any) => (
          <DataTable value={kumpulanData}>
            <Column field="name" header="name"></Column>
            <Column field="url" header="url"></Column>
          </DataTable>
        ))}

        {/* {data?.map((price: Price) => (
          <>{price.id}</>
        ))} */}
      </div>
    </>
  );
};

export default Page;
