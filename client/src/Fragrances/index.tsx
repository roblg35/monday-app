import React, { useState } from "react";
import { GET_ALL_FRAGRANCES, DELETE_FRAGRANCE } from "../graphqlApi.ts";
import { Heading } from "monday-ui-react-core/next";

import { Flex, Button } from "monday-ui-react-core";
import { useMutation, useQuery } from "@apollo/client";
import FragranceModal from "./Modal.tsx";
import FragranceTable from "./Table.tsx";
import { Fragrance } from "./types.ts";

const Fragrances = () => {
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance>();
  const [show, setShow] = useState(false);

  const { loading, error, data } = useQuery(GET_ALL_FRAGRANCES);

  const [deleteFragrance] = useMutation(DELETE_FRAGRANCE, {
    refetchQueries: [{ query: GET_ALL_FRAGRANCES }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Flex
      style={{ padding: "0px 40px" }}
      direction={Flex.directions.COLUMN}
      align={Flex.align.START}
    >
      <Heading>Fragrances</Heading>
      <Button style={{ margin: "24px 0px" }} onClick={() => setShow(true)}>
        Add Fragrence
      </Button>
      <FragranceTable
        deleteFragrance={deleteFragrance}
        selectedFragrance={selectedFragrance}
        setSelectedFragrance={setSelectedFragrance}
        setShow={setShow}
        fragrances={data.fragrances}
      />
      <FragranceModal
        selectedFragrance={selectedFragrance}
        setSelectedFragrance={setSelectedFragrance}
        show={show}
        setShow={setShow}
      />
    </Flex>
  );
};

export default Fragrances;
