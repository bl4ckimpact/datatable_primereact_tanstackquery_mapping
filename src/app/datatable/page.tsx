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

const getPokemon = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10", {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json;
};

const Page = () => {
  const { data } = useQuery({
    queryKey: ["PokemonData"],
    queryFn: getPokemon,
  });

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />

      <div className="m-10rem p-10rem card">
        {data?.results?.map(({ kumpulanData }: any) => (
          <DataTable value={kumpulanData}>
            <Column field="name" header="name"></Column>
            <Column field="url" header="url"></Column>
          </DataTable>
        ))}
      </div>
    </>
  );
};

export default Page;
