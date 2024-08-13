import React, { useEffect, useState } from "react";
import { getAllFragrances } from "./restApi.ts"; // or './api/graphqlApi' for GraphQL
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableRow,
  MenuButton,
  Menu,
  MenuItem,
} from "monday-ui-react-core";

// interface Fragrance {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   created_at: string;
//   updated_at: string;
//   image_url: string;
// }

const MyFragrances = () => {
  const [fragrances, setFragrances] = useState([]);

  useEffect(() => {
    const fetchFragrances = async () => {
      const data = await getAllFragrances();
      console.log("data", data);
      setFragrances(data);
    };

    fetchFragrances();
  }, []);

  return (
    <div className="Fragrance">
      <h1>Fragrances</h1>
      <Table
        columns={[
          {
            id: "Name",
            loadingStateType: "medium-text",
            title: "Name",
          },
          {
            id: "Description",
            loadingStateType: "long-text",
            title: "Description",
          },
          {
            id: "Image",
            loadingStateType: "medium-text",
            title: "Status",
          },
          {
            id: "Action",
            loadingStateType: "medium-text",
            title: "Action",
            width: 150,
          },
        ]}
      >
        <TableHeader>
          <TableHeaderCell title="Name" />
          <TableHeaderCell title="Description" />
          <TableHeaderCell title="Image" />
          <TableHeaderCell title="Action" />
        </TableHeader>
        <TableBody>
          {fragrances.map((fragrance) => (
            <TableRow key={fragrance.id}>
              <TableCell>{fragrance.name}</TableCell>
              <TableCell>{fragrance.description}</TableCell>
              <TableCell>
                <img src={fragrance.image_url} alt={fragrance.name} />
              </TableCell>
              <TableCell>
                <MenuButton
                  onMenuHide={function noRefCheck() {}}
                  onMenuShow={function noRefCheck() {}}
                >
                  <Menu id="menu" size="medium">
                    <MenuItem
                      icon={function noRefCheck() {}}
                      iconType="SVG"
                      onClick={function noRefCheck() {}}
                      title="Edit"
                    />
                    <MenuItem
                      icon={function noRefCheck() {}}
                      iconType="SVG"
                      onClick={function noRefCheck() {}}
                      title="Delete"
                    />
                  </Menu>
                </MenuButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyFragrances;
