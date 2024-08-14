import React, { useState, useEffect } from "react";
import {
  ADD_FRAGRANCE,
  GET_ALL_FRAGRANCES,
  UPDATE_FRAGRANCE,
} from "../../graphqlApi.ts";
import { Button, TextField } from "monday-ui-react-core";
import { useMutation } from "@apollo/client";
import { AddEditFragranceProps } from "./types.ts";

const AddEditFragrance = ({
  initialFragrance,
  onCompleted,
  closeModal,
}: AddEditFragranceProps) => {
  const [fragrance, setFragrance] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    image_url: "",
  });

  useEffect(() => {
    if (initialFragrance) {
      setFragrance(initialFragrance);
    } else {
      setFragrance({
        id: "",
        name: "",
        description: "",
        category: "",
        image_url: "",
      });
    }
  }, [initialFragrance]);

  const [addFragrance] = useMutation(ADD_FRAGRANCE, {
    refetchQueries: [{ query: GET_ALL_FRAGRANCES }],
    onCompleted,
  });

  const [updateFragrance] = useMutation(UPDATE_FRAGRANCE, {
    refetchQueries: [{ query: GET_ALL_FRAGRANCES }],
    onCompleted,
  });

  const handleChange = (value, e) => {
    const { name } = e.target;
    setFragrance({ ...fragrance, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialFragrance) {
        await updateFragrance({ variables: { ...fragrance } });
      } else {
        await addFragrance({ variables: { ...fragrance } });
      }
      setFragrance({
        id: "",
        name: "",
        description: "",
        category: "",
        image_url: "",
      });
      closeModal();
    } catch (error) {
      console.error("Error adding/updating fragrance:", error);
    }
  };

  return (
    <div className="AddFragrance">
      <form onSubmit={handleSubmit}>
        <TextField
          title="ID"
          type="text"
          id="id"
          name="id"
          disabled={initialFragrance}
          value={fragrance.id}
          onChange={handleChange}
          required
        />
        <TextField
          title="Name"
          size={TextField.sizes.MEDIUM}
          type="text"
          id="name"
          name="name"
          value={fragrance.name}
          onChange={handleChange}
          required
        />
        <TextField
          title="Description"
          id="description"
          name="description"
          value={fragrance.description}
          onChange={handleChange}
          required
        />
        <TextField
          title="category"
          size={TextField.sizes.MEDIUM}
          type="text"
          id="category"
          name="category"
          value={fragrance.category}
          onChange={handleChange}
          required
        />
        <TextField
          title="Image"
          size={TextField.sizes.MEDIUM}
          type="text"
          id="image_url"
          name="image_url"
          value={fragrance.image_url}
          onChange={handleChange}
          required
        />
        <Button type="submit">
          {initialFragrance ? "Edit" : "Add"} Fragrance
        </Button>
      </form>
    </div>
  );
};

export default AddEditFragrance;
