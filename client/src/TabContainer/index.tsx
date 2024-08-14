import React from "react";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabsContext,
} from "monday-ui-react-core";
import Fragrances from "../Fragrances/index.tsx";
import OrderForm from "../OrderForm/Form.jsx";

const TabContainer = () => {
  return (
    <Box padding={Box.paddings.XXXL}>
      <TabsContext>
        <TabList>
          <Tab>Order Form</Tab>
          <Tab>Fragrance Table</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="monday-storybook-tabs_bg-color">
            <OrderForm />
          </TabPanel>
          <TabPanel className="monday-storybook-tabs_bg-color">
            <Fragrances />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </Box>
  );
};

export default TabContainer;
