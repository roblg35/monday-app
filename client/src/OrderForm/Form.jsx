import React, { useEffect, useState } from "react";

import { Button, Dropdown, Flex, Text, TextField } from "monday-ui-react-core";
import { useQuery } from "@apollo/client";
import { GET_ALL_FRAGRANCES } from "../graphqlApi.ts";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

const OrderForm = () => {
  const { loading, error, data } = useQuery(GET_ALL_FRAGRANCES);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    quantity: "",
    fragrance: [],
  });
  const [boardId, setBoardId] = useState();

  useEffect(() => {
    monday
      .api(`query { boards { id name } }`)
      .then((res) => {
        const boardId = res?.data?.boards[1]?.id;
        setBoardId(boardId);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching fragrances</p>;

  const fragranceOptions = data?.fragrances?.map((fragrance) => ({
    label: fragrance.name,
    value: fragrance.id,
  }));

  const handleInputChange = (value, e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropdownChange = (selectedOption) => {
    const values = selectedOption?.map((item) => item.label);
    setFormData({
      ...formData,
      fragrance: values || [],
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Create the item on the board
      const createItemResponse = await monday.api(`
        mutation {
          create_item(
            board_id: ${boardId},
            group_id: "topics",
            item_name: "${formData.firstName} ${formData.lastName}"
          ) {
            id
          }
        }
      `);
  
      // Extract the item ID from the response
      const itemId = createItemResponse?.data?.create_item?.id;
  
      if (itemId) {
        // Format the fragrance values into a comma-separated string
        const value = formData.fragrance.join(", ");
  
        // Update the item with the selected fragrances
        await monday.api(`
          mutation {
            change_simple_column_value(
              item_id: ${itemId},
              board_id: ${boardId},
              column_id: "multi_select5__1",
              value: "${value}",
              create_labels_if_missing: true
            ) {
              id
            }
          }
        `);
  
        // Clear the form data
        setFormData({
          firstName: "",
          lastName: "",
          quantity: "",
          fragrance: []
        });
      } else {
        console.error("Failed to create item: No item ID returned.");
      }
    } catch (err) {
      console.error("Error during submit:", err);
    }
  };
  return (
    <Flex style={{ padding: "0px 40px" }} direction="Column" align="Start">
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "12px 0px", minWidth: "350px" }}>
          <TextField
            title="First Name"
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            size={TextField.sizes.MEDIUM}
            required
          />
        </div>{" "}
        <div style={{ margin: "12px 0px" }}>
          <TextField
            title="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            size={TextField.sizes.MEDIUM}
            required
          />
        </div>{" "}
        <div style={{ margin: "12px 0px" }}>
          <TextField
            title="Quantity"
            id="quantity"
            type={TextField.types.NUMBER}
            name="quantity"
            validation={
              formData.quantity > 3 && {
                status: "error",
                text: "Max 3",
              }
            }
            value={formData.quantity}
            onChange={handleInputChange}
            size={TextField.sizes.MEDIUM}
            required
          />
        </div>
        <div style={{ margin: "24px 0px" }}>
          <Dropdown
            title="Fragrances"
            placeholder="Fragrances"
            defaultValue={[]}
            options={fragranceOptions}
            onChange={handleDropdownChange}
            multi
            required
            size={Dropdown.sizes.MEDIUM}
            className="dropdown-stories-styles_with-chips"
          />
          {formData.fragrance?.length > 3 && <Text>Max 3</Text>}
        </div>{" "}
        <div style={{ margin: "12px 0px" }}>
          <Button disabled={formData.fragrance?.length > 3} type="submit">
            Submit Order
          </Button>
        </div>
      </form>
    </Flex>
  );
};

export default OrderForm;
