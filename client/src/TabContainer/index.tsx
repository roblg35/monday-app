import React from "react";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabsContext,
} from "monday-ui-react-core";
import MyFragrances from "../Fragrances/index.tsx";
import FragrenceForm from "../OrderForm/Form.jsx";

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
            <FragrenceForm />
          </TabPanel>
          <TabPanel className="monday-storybook-tabs_bg-color">
            <MyFragrances />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </Box>
  );
};

export default TabContainer;
