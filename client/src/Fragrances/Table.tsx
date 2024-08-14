import React from "react";
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
  Link,
} from "monday-ui-react-core";
import { FRAGRANCE_COLUMNS } from "./constants";
import { Fragrance, FragranceTableProps } from "./types";

const FragranceTable = ({
  deleteFragrance,
  selectedFragrance,
  setSelectedFragrance,
  setShow,
  fragrances,
}: FragranceTableProps) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteFragrance({ variables: { id } });
      if (selectedFragrance?.id === id) {
        setSelectedFragrance(undefined);
      }
    } catch (err) {
      console.error("Error deleting fragrance:", err);
    }
  };
  const handleEdit = (fragrance: Fragrance) => {
    setSelectedFragrance(fragrance);
    setShow(true);
  };
  return (
    <Table columns={FRAGRANCE_COLUMNS}>
      <TableHeader>
        <TableHeaderCell title="Id" />
        <TableHeaderCell title="Name" />
        <TableHeaderCell title="Description" />
        <TableHeaderCell title="Category" />
        <TableHeaderCell title="Image" />
        <TableHeaderCell title="Action" />
      </TableHeader>
      <TableBody>
        {fragrances.map((fragrance) => (
          <TableRow key={fragrance.id}>
            <TableCell>{fragrance.id}</TableCell>
            <TableCell>{fragrance.name}</TableCell>
            <TableCell>{fragrance.description}</TableCell>
            <TableCell>{fragrance.category}</TableCell>
            <TableCell>
              <Link href={fragrance.image_url} text="view" />
            </TableCell>
            <TableCell>
              <MenuButton>
                <Menu id="menu" size="medium">
                  <MenuItem
                    onClick={() => handleEdit(fragrance)}
                    title="Edit"
                  />
                  <MenuItem
                    onClick={() => handleDelete(fragrance.id)}
                    title="Delete"
                  />
                </Menu>
              </MenuButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FragranceTable;
